import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
    persist(
        (set) => ({
            // User State
            user: {
                name: 'Shyan',
                level: 8,
                xp: 450,
                streak: 7,
                totalXp: 2450,
            },

            // Progress State
            progress: {
                completedLessons: ['limits-intro', 'limits-quiz'],
                currentLesson: 'derivatives-slope',
                percentComplete: 45,
            },

            // Achievements
            achievements: ['calculus-rookie', 'quiz-master', 'streak-3days'],

            // Methods
            addXP: (amount) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        xp: state.user.xp + amount,
                        totalXp: state.user.totalXp + amount,
                    },
                })),

            incrementStreak: () =>
                set((state) => ({
                    user: {
                        ...state.user,
                        streak: state.user.streak + 1,
                    },
                })),

            completeLesson: (lessonId) =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        completedLessons: [...state.progress.completedLessons, lessonId],
                    },
                })),

            unlockAchievement: (achievementId) =>
                set((state) => ({
                    achievements: [...state.achievements, achievementId],
                })),

            // Update level when XP crosses threshold
            levelUp: () =>
                set((state) => ({
                    user: {
                        ...state.user,
                        level: state.user.level + 1,
                    },
                })),

            // Update current lesson
            setCurrentLesson: (lessonId) =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        currentLesson: lessonId,
                    },
                })),

            // Update progress percentage
            updateProgress: (percent) =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        percentComplete: percent,
                    },
                })),
        }),
        {
            name: 'calquest-storage', // localStorage key
        }
    )
)
