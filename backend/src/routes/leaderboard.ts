import express from 'express';
import prisma from '../services/prisma';
import { cacheGet, cacheSet } from '../services/redis';
import { optionalAuth, authenticate } from '../middleware/auth';

const router = express.Router();

// GET /api/leaderboard/global - Top 100 users by XP
router.get('/global', optionalAuth, async (req: any, res) => {
    try {
        // Try cache first
        const cacheKey = 'leaderboard:global';
        const cached = await cacheGet(cacheKey);

        if (cached) {
            return res.json({ leaderboard: cached });
        }

        // Fetch from database
        const topUsers = await prisma.user.findMany({
            take: 100,
            orderBy: {
                xp: 'desc',
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                xp: true,
                level: true,
                streak: true,
            },
        });

        const leaderboard = topUsers.map((user, index) => ({
            rank: index + 1,
            username: user.username,
            avatar: user.avatar,
            xp: user.xp,
            level: user.level,
            streak: user.streak,
            isCurrentUser: req.userId === user.id,
        }));

        // Cache for 5 minutes
        await cacheSet(cacheKey, leaderboard, 300);

        res.json({ leaderboard });
    } catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});

// GET /api/leaderboard/weekly - Weekly leaderboard (resets every Monday)
router.get('/weekly', optionalAuth, async (req: any, res) => {
    try {
        // Calculate start of current week (Monday)
        const now = new Date();
        const dayOfWeek = now.getDay();
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Monday start
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - diff);
        weekStart.setHours(0, 0, 0, 0);

        // Try cache first
        const cacheKey = `leaderboard:weekly:${weekStart.getTime()}`;
        const cached = await cacheGet(cacheKey);

        if (cached) {
            const leaderboard = cached.map((user: any) => ({
                ...user,
                isCurrentUser: req.userId === user.userId,
            }));
            return res.json({ leaderboard, weekStart });
        }

        // Get users who completed lessons this week
        const weeklyProgress = await prisma.lessonProgress.findMany({
            where: {
                completedAt: {
                    gte: weekStart,
                },
                completed: true,
            },
            select: {
                userId: true,
                score: true,
            },
        });

        // Calculate weekly XP per user
        const userXPMap = new Map<string, number>();

        weeklyProgress.forEach(progress => {
            const currentXP = userXPMap.get(progress.userId) || 0;
            userXPMap.set(progress.userId, currentXP + (progress.score || 0));
        });

        // Get user details
        const userIds = Array.from(userXPMap.keys());
        const users = await prisma.user.findMany({
            where: {
                id: { in: userIds },
            },
            select: {
                id: true,
                username: true,
                avatar: true,
                level: true,
            },
        });

        // Combine and sort
        const leaderboardData = users
            .map(user => ({
                userId: user.id,
                username: user.username,
                avatar: user.avatar,
                level: user.level,
                weeklyXP: userXPMap.get(user.id) || 0,
            }))
            .sort((a, b) => b.weeklyXP - a.weeklyXP)
            .slice(0, 100)
            .map((user, index) => ({
                rank: index + 1,
                ...user,
            }));

        // Cache for 5 minutes
        await cacheSet(cacheKey, leaderboardData, 300);

        const leaderboard = leaderboardData.map(user => ({
            ...user,
            isCurrentUser: req.userId === user.userId,
        }));

        res.json({ leaderboard, weekStart });
    } catch (error) {
        console.error('Get weekly leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch weekly leaderboard' });
    }
});

// GET /api/leaderboard/friends - Friends leaderboard (placeholder for future)
router.get('/friends', authenticate, async (req: any, res) => {
    try {
        // For now, return empty array (friends feature not implemented)
        res.json({
            leaderboard: [],
            message: 'Friends feature coming soon!',
        });
    } catch (error) {
        console.error('Get friends leaderboard error:', error);
        res.status(500).json({ error: 'Failed to fetch friends leaderboard' });
    }
});

export default router;
