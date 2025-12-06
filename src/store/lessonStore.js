import { create } from 'zustand';
import { lessonsAPI, userAPI } from '../services/api';

const useLessonStore = create((set, get) => ({
    lessons: [],
    currentLesson: null,
    userProgress: {},
    isLoading: false,
    error: null,

    // Fetch all lessons
    fetchLessons: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await lessonsAPI.getAllLessons();
            set({
                lessons: data.lessons,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.error || 'Failed to fetch lessons',
                isLoading: false,
            });
        }
    },

    // Fetch single lesson
    fetchLesson: async (lessonId) => {
        set({ isLoading: true, error: null });
        try {
            const data = await lessonsAPI.getLesson(lessonId);
            set({
                currentLesson: data.lesson,
                userProgress: data.progress || {},
                isLoading: false,
            });
            return data.lesson;
        } catch (error) {
            set({
                error: error.response?.data?.error || 'Failed to fetch lesson',
                isLoading: false,
            });
            return null;
        }
    },

    // Submit lesson answers
    submitLesson: async (lessonId, answers, timeTaken) => {
        set({ isLoading: true, error: null });
        try {
            const data = await lessonsAPI.submitLesson(lessonId, answers, timeTaken);

            // Update user progress locally
            set((state) => ({
                userProgress: {
                    ...state.userProgress,
                    [lessonId]: data.lessonProgress,
                },
                isLoading: false,
            }));

            return {
                success: true,
                ...data,
            };
        } catch (error) {
            set({
                error: error.response?.data?.error || 'Failed to submit lesson',
                isLoading: false,
            });
            return {
                success: false,
                error: error.response?.data?.error,
            };
        }
    },

    // Get hint
    getHint: async (lessonId, exerciseIndex) => {
        try {
            const data = await lessonsAPI.getHint(lessonId, exerciseIndex);
            return data.hint;
        } catch (error) {
            console.error('Failed to get hint:', error);
            return 'Try thinking about the concept step by step!';
        }
    },

    // Clear current lesson
    clearCurrentLesson: () => {
        set({ currentLesson: null, userProgress: {} });
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useLessonStore;
