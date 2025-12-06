import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { leaderboardAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import { Icon } from './icons';
import { cardVariants, staggerContainerVariants } from '../utils/animations';

const Leaderboard = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('global');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthStore();

    useEffect(() => {
        fetchLeaderboard();
    }, [activeTab]);

    const fetchLeaderboard = async () => {
        setIsLoading(true);
        try {
            let data;
            if (activeTab === 'global') {
                data = await leaderboardAPI.getGlobal();
            } else if (activeTab === 'weekly') {
                data = await leaderboardAPI.getWeekly();
            } else {
                data = await leaderboardAPI.getFriends();
            }
            setLeaderboardData(data.leaderboard || []);
        } catch (error) {
            console.error('Failed to fetch leaderboard:', error);
            setLeaderboardData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getRankColor = (rank) => {
        if (rank === 1) return '#F59E0B'; // Gold
        if (rank === 2) return '#9CA3AF'; // Silver
        if (rank === 3) return '#CD7F32'; // Bronze
        return '#6B8DD6'; // Default
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="flex items-center justify-between">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors"
                >
                    <span>←</span>
                    <span>Back</span>
                </button>
                <h1 className="text-3xl font-heading font-bold flex items-center gap-2">
                    <Icon name="trophy" size={32} color="#F59E0B" />
                    Leaderboard
                </h1>
                <div className="w-16" /> {/* Spacer for centering */}
            </motion.div>

            {/* Tabs */}
            <motion.div variants={cardVariants} className="bg-surface/80 backdrop-blur-xl rounded-2xl p-2 border border-gray-700">
                <div className="grid grid-cols-3 gap-2">
                    {['global', 'weekly', 'friends'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 px-4 rounded-xl font-semibold transition-all ${activeTab === tab
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-textSecondary hover:bg-surface/50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Leaderboard List */}
            <motion.div variants={cardVariants} className="space-y-3">
                {isLoading ? (
                    <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-12 border border-gray-700 text-center">
                        <div className="animate-spin mx-auto mb-4">
                            <Icon name="loading" size={48} color="#6B8DD6" />
                        </div>
                        <p className="text-textSecondary">Loading leaderboard...</p>
                    </div>
                ) : leaderboardData.length === 0 ? (
                    <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-12 border border-gray-700 text-center">
                        <Icon name="trophy" size={64} color="#6B8DD6" className="mx-auto mb-4 opacity-30" />
                        <p className="text-textSecondary">No leaderboard data available yet.</p>
                        <p className="text-sm text-textSecondary mt-2">Complete lessons to appear on the leaderboard!</p>
                    </div>
                ) : (
                    leaderboardData.map((entry, index) => {
                        const rank = index + 1;
                        const isCurrentUser = user && entry.username === user.username;

                        return (
                            <motion.div
                                key={entry.userId || index}
                                className={`bg-surface/80 backdrop-blur-xl rounded-xl p-4 border ${isCurrentUser
                                        ? 'border-primary bg-primary/10 shadow-lg'
                                        : 'border-gray-700'
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center justify-between">
                                    {/* Rank and User Info */}
                                    <div className="flex items-center space-x-4 flex-1">
                                        {/* Rank */}
                                        <div
                                            className="text-2xl font-bold w-12 text-center"
                                            style={{ color: getRankColor(rank) }}
                                        >
                                            {getRankIcon(rank)}
                                        </div>

                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                            {entry.username?.charAt(0).toUpperCase() || '?'}
                                        </div>

                                        {/* Username and Level */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-textPrimary">
                                                    {entry.username || 'Anonymous'}
                                                </h3>
                                                {isCurrentUser && (
                                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                                                        You
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-textSecondary">
                                                Level {entry.level || 1} • {entry.streak || 0} day streak 🔥
                                            </p>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-accent">
                                            {entry.totalXp?.toLocaleString() || 0}
                                        </div>
                                        <div className="text-xs text-textSecondary">XP</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </motion.div>

            {/* User's Position (if not in top list) */}
            {user && !leaderboardData.some(entry => entry.username === user.username) && (
                <motion.div variants={cardVariants} className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border-2 border-primary">
                    <div className="text-center">
                        <p className="text-textSecondary mb-2">Your Position</p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="text-xl font-bold text-primary">
                                #{user.rank || '---'}
                            </div>
                            <div className="text-2xl font-bold text-accent">
                                {user.totalXp?.toLocaleString() || 0} XP
                            </div>
                        </div>
                        <p className="text-sm text-textSecondary mt-2">
                            Keep learning to climb the ranks!
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Leaderboard;
