import express from 'express';
import { getAllLessons, getLessonById } from '../utils/lessonGenerator';
import { authenticate, optionalAuth } from '../middleware/auth';
import prisma from '../services/prisma';
import { calculateLessonXP } from '../utils/xpCalculator';
import { checkAchievements } from '../utils/achievementChecker';
import { cacheDel } from '../services/redis';

const router = express.Router();

// GET /api/lessons - Get all lessons metadata
router.get('/', optionalAuth, async (req: any, res) => {
    try {
        const lessons = getAllLessons();
        const userId = req.userId;

        // If user is authenticated, include progress
        if (userId) {
            const progress = await prisma.lessonProgress.findMany({
                where: { userId },
                select: {
                    lessonId: true,
                    completed: true,
                    score: true,
                    bestScore: true,
                },
            });

            const progressMap = new Map(progress.map(p => [p.lessonId, p]));

            const lessonsWithProgress = lessons.map(lesson => ({
                id: lesson.id,
                title: lesson.title,
                module: lesson.module,
                level: lesson.level,
                xpReward: lesson.xpReward,
                completed: progressMap.get(lesson.id)?.completed || false,
                score: progressMap.get(lesson.id)?.score || null,
                bestScore: progressMap.get(lesson.id)?.bestScore || null,
            }));

            return res.json({ lessons: lessonsWithProgress });
        }

        // Return basic lesson info for unauthenticated users
        const basicLessons = lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            module: lesson.module,
            level: lesson.level,
            xpReward: lesson.xpReward,
        }));

        res.json({ lessons: basicLessons });
    } catch (error) {
        console.error('Get lessons error:', error);
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
});

// GET /api/lessons/:id - Get single lesson with full content
router.get('/:id', optionalAuth, async (req: any, res) => {
    try {
        const { id } = req.params;
        const lesson = getLessonById(id);

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // If user is authenticated, include their progress
        if (req.userId) {
            const progress = await prisma.lessonProgress.findUnique({
                where: {
                    userId_lessonId: {
                        userId: req.userId,
                        lessonId: id,
                    },
                },
            });

            return res.json({
                lesson,
                progress: progress || null,
            });
        }

        res.json({ lesson });
    } catch (error) {
        console.error('Get lesson error:', error);
        res.status(500).json({ error: 'Failed to fetch lesson' });
    }
});

// POST /api/lessons/:id/submit - Submit lesson answers and get grade
router.post('/:id/submit', authenticate, async (req: any, res) => {
    try {
        const { id } = req.params;
        const { answers, timeTaken } = req.body;
        const userId = req.userId;

        const lesson = getLessonById(id);

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        // Grade the answers
        let correctCount = 0;
        const results = lesson.exercises.map((exercise, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === exercise.correct;
            if (isCorrect) correctCount++;

            return {
                exerciseId: exercise.id,
                correct: isCorrect,
                userAnswer,
                correctAnswer: exercise.correct,
                explanation: exercise.explanation,
            };
        });

        const score = Math.round((correctCount / lesson.exercises.length) * 100);
        const completed = score >= 60; // 60% to pass

        // Check if first attempt
        const existingProgress = await prisma.lessonProgress.findUnique({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId: id,
                },
            },
        });

        const isFirstAttempt = !existingProgress;

        // Calculate XP
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const xpEarned = calculateLessonXP(score, isFirstAttempt, user?.streak || 0);

        // Update user XP and level
        const newXP = (user?.xp || 0) + xpEarned;
        const newLevel = Math.floor(Math.sqrt(newXP / 100));

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: newXP,
                level: newLevel,
            },
        });

        // Save lesson progress
        const lessonProgress = await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId,
                    lessonId: id,
                },
            },
            update: {
                score,
                completed,
                attempts: existingProgress ? existingProgress.attempts + 1 : 1,
                bestScore: existingProgress
                    ? Math.max(existingProgress.bestScore || 0, score)
                    : score,
                completedAt: completed ? new Date() : existingProgress?.completedAt,
            },
            create: {
                userId,
                lessonId: id,
                score,
                completed,
                attempts: 1,
                bestScore: score,
                completedAt: completed ? new Date() : null,
            },
        });

        // Update module progress
        const module = id.split('_')[0];
        const progress = user?.progress as any;
        const completedLessons = await prisma.lessonProgress.count({
            where: {
                userId,
                lessonId: { startsWith: module },
                completed: true,
            },
        });

        progress[module] = Math.round((completedLessons / 6) * 100);

        await prisma.user.update({
            where: { id: userId },
            data: { progress },
        });

        // Check for achievements
        const newAchievements = await checkAchievements(userId, updatedUser);

        // Clear cache
        if (user) {
            await cacheDel(`user:profile:${user.username}`);
        }

        res.json({
            score,
            completed,
            xpEarned,
            results,
            lessonProgress,
            newAchievements,
            user: {
                xp: updatedUser.xp,
                level: updatedUser.level,
            },
        });
    } catch (error) {
        console.error('Submit lesson error:', error);
        res.status(500).json({ error: 'Failed to submit lesson' });
    }
});

// GET /api/lessons/:id/hint - Get progressive hints
router.get('/:id/hint', authenticate, async (req: any, res) => {
    try {
        const { id } = req.params;
        const { exerciseIndex = 0 } = req.query;

        const lesson = getLessonById(id);

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        const exercise = lesson.exercises[Number(exerciseIndex)];

        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }

        res.json({
            hint: exercise.hint || 'Try thinking about the concept step by step!',
        });
    } catch (error) {
        console.error('Get hint error:', error);
        res.status(500).json({ error: 'Failed to get hint' });
    }
});

export default router;
