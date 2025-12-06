import express from 'express';
import prisma from '../services/prisma';
import { authenticate } from '../middleware/auth';
import { cacheGet, cacheSet, cacheDel } from '../services/redis';
import { calculateLevel, calculateXPForNextLevel } from '../utils/xpCalculator';
import { checkAchievements } from '../utils/achievementChecker';

const router = express.Router();

// GET /api/user/profile/:username - Get user profile
router.get('/profile/:username', async (req, res) => {
    try {
        const { username } = req.params;

        // Try cache first
        const cacheKey = `user:profile:${username}`;
        const cached = await cacheGet(cacheKey);
        if (cached) {
            return res.json({ user: cached });
        }

        // Fetch from database
        const user = await prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                username: true,
                avatar: true,
                streak: true,
                xp: true,
                level: true,
                progress: true,
                createdAt: true,
                achievements: {
                    select: {
                        name: true,
                        icon: true,
                        unlockedAt: true,
                    },
                    orderBy: {
                        unlockedAt: 'desc',
                    },
                },
                lessons: {
                    where: { completed: true },
                    select: {
                        lessonId: true,
                        score: true,
                        completedAt: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Cache for 5 minutes
        await cacheSet(cacheKey, user, 300);

        res.json({ user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// POST /api/user/daily-checkin - Daily check-in for streak
router.post('/daily-checkin', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if already checked in today
        if (user.dailyGoal) {
            return res.status(400).json({ error: 'Already checked in today' });
        }

        // Increment streak and add XP
        const streakBonus = 10;
        const newXP = user.xp + streakBonus;
        const newLevel = calculateLevel(newXP);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                streak: user.streak + 1,
                xp: newXP,
                level: newLevel,
                dailyGoal: true,
            },
            select: {
                id: true,
                username: true,
                streak: true,
                xp: true,
                level: true,
                dailyGoal: true,
            },
        });

        // Check for achievements
        const newAchievements = await checkAchievements(userId, updatedUser);

        // Clear cache
        await cacheDel(`user:profile:${user.username}`);

        res.json({
            message: 'Daily check-in successful',
            user: updatedUser,
            xpEarned: streakBonus,
            newAchievements,
        });
    } catch (error) {
        console.error('Daily check-in error:', error);
        res.status(500).json({ error: 'Check-in failed' });
    }
});

// PUT /api/user/update-progress - Update lesson progress
router.put('/update-progress', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;
        const { lessonId, score, completed } = req.body;

        if (!lessonId) {
            return res.status(400).json({ error: 'Lesson ID is required' });
        }

        // Find or create lesson progress
        const existingProgress = await prisma.lessonProgress.findUnique({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
        });

        const lessonProgress = await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId,
                },
            },
            update: {
                score,
                completed,
                attempts: existingProgress ? existingProgress.attempts + 1 : 1,
                bestScore: existingProgress
                    ? Math.max(existingProgress.bestScore || 0, score || 0)
                    : score,
                completedAt: completed ? new Date() : existingProgress?.completedAt,
            },
            create: {
                userId,
                lessonId,
                score,
                completed,
                attempts: 1,
                bestScore: score,
                completedAt: completed ? new Date() : null,
            },
        });

        // Update user progress JSON
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            const progress = user.progress as any;
            const module = lessonId.split('_')[0]; // e.g., "limits_1" -> "limits"

            // Calculate module completion percentage
            const completedLessons = await prisma.lessonProgress.count({
                where: {
                    userId,
                    lessonId: {
                        startsWith: module,
                    },
                    completed: true,
                },
            });

            const totalLessons = 6; // Each module has 6 lessons
            const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

            progress[module] = completionPercentage;

            await prisma.user.update({
                where: { id: userId },
                data: { progress },
            });

            // Clear cache
            await cacheDel(`user:profile:${user.username}`);
        }

        res.json({
            message: 'Progress updated',
            lessonProgress,
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// GET /api/user/achievements - Get user achievements
router.get('/achievements', authenticate, async (req: any, res) => {
    try {
        const userId = req.userId;

        const achievements = await prisma.achievement.findMany({
            where: { userId },
            orderBy: {
                unlockedAt: 'desc',
            },
        });

        res.json({ achievements });
    } catch (error) {
        console.error('Get achievements error:', error);
        res.status(500).json({ error: 'Failed to fetch achievements' });
    }
});

export default router;
