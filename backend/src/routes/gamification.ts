import express from 'express';
import prisma from '../services/prisma';
import { authenticate } from '../middleware/auth';
import { getAllAchievements } from '../utils/achievementChecker';

const router = express.Router();

// GET /api/gamification/streak - Get streak status
router.get('/streak', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                streak: true,
                dailyGoal: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate next milestone
        const milestones = [7, 14, 30, 60, 100, 365];
        const nextMilestone = milestones.find(m => m > user.streak) || null;

        res.json({
            currentStreak: user.streak,
            dailyGoalComplete: user.dailyGoal,
            nextMilestone,
            daysUntilMilestone: nextMilestone ? nextMilestone - user.streak : null,
        });
    } catch (error) {
        console.error('Get streak error:', error);
        res.status(500).json({ error: 'Failed to fetch streak' });
    }
});

// GET /api/gamification/achievements - Get all achievements with unlock status
router.get('/achievements', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;
        const achievements = await getAllAchievements(userId);

        res.json({ achievements });
    } catch (error) {
        console.error('Get achievements error:', error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

// GET /api/gamification/notifications - Get recent notifications
router.get('/notifications', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;

        // Get recent achievements (last 7 days)
        const recentAchievements = await prisma.achievement.findMany({
            where: {
                userId,
                unlockedAt: {
                    gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
            },
            orderBy: {
                unlockedAt: 'desc',
            },
            take: 10,
        });

        const notifications = recentAchievements.map(achievement => ({
            type: 'achievement',
            title: 'Achievement Unlocked!',
            message: `You unlocked: ${achievement.name}`,
            icon: achievement.icon,
            timestamp: achievement.unlockedAt,
        }));

        res.json({ notifications });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

export default router;
