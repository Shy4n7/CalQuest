import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Login
            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await authAPI.login(email, password);
                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({
                        error: error.response?.data?.error || 'Login failed',
                        isLoading: false,
                    });
                    return { success: false, error: error.response?.data?.error };
                }
            },

            // Register
            register: async (email, username, password) => {
                set({ isLoading: true, error: null });
                try {
                    const data = await authAPI.register(email, username, password);
                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({
                        error: error.response?.data?.error || 'Registration failed',
                        isLoading: false,
                    });
                    return { success: false, error: error.response?.data?.error };
                }
            },

            // Logout
            logout: async () => {
                try {
                    await authAPI.logout();
                } catch (error) {
                    console.error('Logout error:', error);
                }
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            // Check auth status
            checkAuth: async () => {
                set({ isLoading: true });
                try {
                    const data = await authAPI.getCurrentUser();
                    set({
                        user: data.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                }
            },

            // Update user data
            updateUser: (userData) => {
                set((state) => ({
                    user: { ...state.user, ...userData },
                }));
            },

            // Clear error
            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;
