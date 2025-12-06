import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Auth API
export const authAPI = {
    register: async (email, username, password) => {
        const response = await api.post('/auth/register', { email, username, password });
        return response.data;
    },

    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

// User API
export const userAPI = {
    getProfile: async (username) => {
        const response = await api.get(`/user/profile/${username}`);
        return response.data;
    },

    dailyCheckin: async () => {
        const response = await api.post('/user/daily-checkin');
        return response.data;
    },

    updateProgress: async (lessonId, score, completed) => {
        const response = await api.put('/user/update-progress', {
            lessonId,
            score,
            completed,
        });
        return response.data;
    },

    getAchievements: async () => {
        const response = await api.get('/user/achievements');
        return response.data;
    },
};

// Lessons API
export const lessonsAPI = {
    getAllLessons: async () => {
        const response = await api.get('/lessons');
        return response.data;
    },

    getLesson: async (lessonId) => {
        const response = await api.get(`/lessons/${lessonId}`);
        return response.data;
    },

    submitLesson: async (lessonId, answers, timeTaken) => {
        const response = await api.post(`/lessons/${lessonId}/submit`, {
            answers,
            timeTaken,
        });
        return response.data;
    },

    getHint: async (lessonId, exerciseIndex) => {
        const response = await api.get(`/lessons/${lessonId}/hint`, {
            params: { exerciseIndex },
        });
        return response.data;
    },
};

// Leaderboard API
export const leaderboardAPI = {
    getGlobal: async () => {
        const response = await api.get('/leaderboard/global');
        return response.data;
    },

    getWeekly: async () => {
        const response = await api.get('/leaderboard/weekly');
        return response.data;
    },

    getFriends: async () => {
        const response = await api.get('/leaderboard/friends');
        return response.data;
    },
};

// Gamification API
export const gamificationAPI = {
    getStreakStatus: async () => {
        const response = await api.get('/gamification/streak');
        return response.data;
    },

    getAchievements: async () => {
        const response = await api.get('/gamification/achievements');
        return response.data;
    },

    getNotifications: async () => {
        const response = await api.get('/gamification/notifications');
        return response.data;
    },
};

export default api;
