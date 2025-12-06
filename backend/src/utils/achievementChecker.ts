import prisma from '../services/prisma';
import { AchievementData } from '../types';

// Achievement definitions
const ACHIEVEMENTS: AchievementData[] = [
    {
        id: 'first_steps',
        name: 'First Steps',
        icon: '🎯',
        description: 'Complete your first lesson',
        requirement: async (userId: string) => {
            const count = await prisma.lessonProgress.count({
                where: { userId, completed: true },
            });
            return count >= 1;
        },
    },
    {
        id: 'streak_master',
        name: 'Streak Master',
        icon: '🔥',
        description: 'Maintain a 7-day streak',
        requirement: async (userId: string) => {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            return (user?.streak || 0) >= 7;
        },
    },
    {
        id: 'limit_legend',
        name: 'Limit Legend',
        icon: '🎓',
        description: 'Complete all Limits lessons',
        requirement: async (userId: string) => {
            const count = await prisma.lessonProgress.count({
                where: {
                    userId,
                    lessonId: { startsWith: 'limits_' },
                    completed: true,
                },
            });
            return count >= 6;
        },
    },
    {
        id: 'derivative_master',
        name: 'Derivative Master',
        icon: '⚡',
        description: 'Complete all Derivatives lessons',
        requirement: async (userId: string) => {
            const count = await prisma.lessonProgress.count({
                where: {
                    userId,
                    lessonId: { startsWith: 'derivatives_' },
                    completed: true,
                },
            });
            return count >= 6;
        },
    },
    {
        id: 'perfect_score',
        name: 'Perfect Score',
        icon: '⭐',
        description: 'Get 100% on any lesson',
        requirement: async (userId: string) => {
            const perfect = await prisma.lessonProgress.findFirst({
                where: {
                    userId,
                    score: 100,
                },
            });
            return perfect !== null;
        },
    },
    {
        id: 'level_10',
        name: 'Level 10',
        icon: '🏆',
        description: 'Reach level 10',
        requirement: async (userId: string) => {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            return (user?.level || 0) >= 10;
        },
    },
    {
        id: 'level_20',
        name: 'Level 20',
        icon: '👑',
        description: 'Reach level 20',
        requirement: async (userId: string) => {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            return (user?.level || 0) >= 20;
        },
    },
];

/**
 * Check and unlock new achievements for a user
 * @param userId - User ID
 * @param userData - Optional user data to avoid extra queries
 * @returns Array of newly unlocked achievements
 */
export const checkAchievements = async (userId: string, userData?: any): Promise<any[]> => {
    try {
        // Get existing achievements
        const existingAchievements = await prisma.achievement.findMany({
            where: { userId },
            select: { name: true },
        });

        const existingNames = new Set(existingAchievements.map(a => a.name));
        const newAchievements: any[] = [];

        // Check each achievement
        for (const achievement of ACHIEVEMENTS) {
            // Skip if already unlocked
            if (existingNames.has(achievement.name)) {
                continue;
            }

            // Check requirement
            const unlocked = await achievement.requirement(userId);

            if (unlocked) {
                // Create achievement
                const newAchievement = await prisma.achievement.create({
                    data: {
                        userId,
                        name: achievement.name,
                        icon: achievement.icon,
                    },
                });

                newAchievements.push({
                    ...newAchievement,
                    description: achievement.description,
                });
            }
        }

        return newAchievements;
    } catch (error) {
        console.error('Achievement check error:', error);
        return [];
    }
};

/**
 * Get all available achievements with unlock status
 */
export const getAllAchievements = async (userId?: string): Promise<any[]> => {
    const unlockedAchievements = userId
        ? await prisma.achievement.findMany({
            where: { userId },
            select: { name: true, unlockedAt: true },
        })
        : [];

    const unlockedMap = new Map(unlockedAchievements.map(a => [a.name, a.unlockedAt]));

    return ACHIEVEMENTS.map(achievement => ({
        id: achievement.id,
        name: achievement.name,
        icon: achievement.icon,
        description: achievement.description,
        unlocked: unlockedMap.has(achievement.name),
        unlockedAt: unlockedMap.get(achievement.name) || null,
    }));
};
