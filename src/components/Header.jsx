import { motion } from 'framer-motion';
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { slideInTopVariants } from '../utils/animations';
import { Icon } from './icons';
import AuthModal from './AuthModal';

const Header = ({ onNavigate }) => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <>
            <motion.header
                className="glass-effect border-b border-textPrimary/10 sticky top-0 z-50"
                initial="hidden"
                animate="visible"
                variants={slideInTopVariants}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo - Clickable to return to dashboard */}
                        <button
                            onClick={() => onNavigate && onNavigate('dashboard')}
                            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                        >
                            <Icon name="logo" size={36} color="#6B8DD6" />
                            <div className="text-2xl font-heading font-bold text-gradient">
                                CalQuest
                            </div>
                        </button>

                        {/* Stats or Login */}
                        {isAuthenticated && user ? (
                            <div className="flex items-center space-x-4 md:space-x-6">
                                {/* Streak */}
                                <motion.div
                                    className="flex items-center space-x-2 bg-surfaceLight/50 px-3 md:px-4 py-2 rounded-lg backdrop-blur-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon name="flame" size={24} color="#E8A87C" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-textSecondary">Streak</span>
                                        <span className="text-base md:text-lg font-bold text-accent">
                                            {user.streak || 0}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* XP */}
                                <motion.div
                                    className="flex items-center space-x-2 bg-surfaceLight/50 px-3 md:px-4 py-2 rounded-lg backdrop-blur-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon name="star" size={24} color="#6B8DD6" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-textSecondary">XP</span>
                                        <span className="text-base md:text-lg font-bold text-primary">
                                            {user.xp || 0}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Level */}
                                <motion.div
                                    className="flex items-center space-x-2 bg-surfaceLight/50 px-3 md:px-4 py-2 rounded-lg backdrop-blur-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon name="trophy" size={24} color="#8B7EC8" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-textSecondary">Level</span>
                                        <span className="text-base md:text-lg font-bold text-secondary">
                                            {user.level || 1}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Leaderboard Button */}
                                {onNavigate && (
                                    <motion.button
                                        onClick={() => onNavigate('leaderboard')}
                                        className="flex items-center space-x-1 bg-accent/20 hover:bg-accent/30 text-accent px-3 md:px-4 py-2 rounded-lg transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon name="trophy" size={20} color="#F59E0B" />
                                        <span className="hidden md:inline font-semibold">Leaderboard</span>
                                    </motion.button>
                                )}

                                {/* User Menu */}
                                <motion.button
                                    onClick={logout}
                                    className="text-textSecondary hover:text-primary transition-colors text-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <motion.button
                                onClick={() => setShowAuthModal(true)}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.header>

            {/* Auth Modal */}
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </>
    );
};

export default Header;
