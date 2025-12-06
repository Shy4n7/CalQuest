import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import useAuthStore from '../store/authStore';
import { userAPI, gamificationAPI } from '../services/api';
import {
    cardVariants,
    staggerContainerVariants,
    buttonVariants,
    progressBarVariants,
} from '../utils/animations'
import { Icon } from './icons'

const Dashboard = ({ onNavigate, onStartLesson }) => {
    const { user, progress, achievements } = useUserStore();
    const { user: authUser } = useAuthStore();
    const [hasCheckedIn, setHasCheckedIn] = useState(false);

    // Daily check-in on mount
    useEffect(() => {
        const performDailyCheckin = async () => {
            if (authUser && !hasCheckedIn) {
                try {
                    await userAPI.dailyCheckin();
                    setHasCheckedIn(true);
                } catch (error) {
                    console.error('Daily check-in failed:', error);
                }
            }
        };
        performDailyCheckin();
    }, [authUser, hasCheckedIn]);

    const achievementData = {
        'calculus-rookie': { icon: 'derivative', color: '#6B8DD6', name: 'Calculus Rookie' },
        'quiz-master': { icon: 'quiz', color: '#8B7EC8', name: 'Quiz Master' },
        'streak-3days': { icon: 'flame', color: '#E8A87C', name: '3-Day Streak' },
    }

    // Safety checks - provide defaults if data is missing
    const safeUser = user || { name: 'Student', level: 1 };
    const safeProgress = progress || { percentComplete: 0 };
    const safeAchievements = achievements || [];

    return (
        <motion.div
            className="max-w-6xl mx-auto space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            {/* Welcome Section */}
            <motion.div variants={cardVariants} className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
                    Welcome back, {safeUser.name}!
                </h1>
                <p className="text-xl text-textSecondary">
                    Great streak! Keep up the momentum!
                </p>
            </motion.div>

            {/* Mascot Area */}
            <motion.div
                variants={cardVariants}
                className="glass-effect rounded-2xl p-8 text-center glow"
            >
                <div className="mb-4 flex justify-center">
                    <Icon name="lightbulb" size={80} color="#E8A87C" className="float-animation" />
                </div>
                <p className="text-lg text-textPrimary">
                    "You're doing amazing! Let's master calculus today!"
                </p>
            </motion.div>

            {/* Progress Section */}
            <motion.div variants={cardVariants} className="space-y-4">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                    <Icon name="target" size={28} color="#6B8DD6" />
                    Your Progress
                </h2>
                <div className="glass-effect rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-textSecondary">Overall Progress</span>
                        <span className="text-primary font-bold">
                            {safeProgress.percentComplete}%
                        </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-4 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                            initial="initial"
                            animate="animate"
                            custom={safeProgress.percentComplete}
                            variants={progressBarVariants}
                        />
                    </div>
                    <p className="text-textSecondary text-sm">
                        Level {safeUser.level} / 30
                    </p>
                </div>
            </motion.div>

            {/* Action Cards */}
            <motion.div
                variants={cardVariants}
                className="grid md:grid-cols-2 gap-6"
            >
                {/* Continue Lesson */}
                <motion.button
                    className="bg-gradient-to-br from-secondary to-primary rounded-xl p-8 text-left card-hover shadow-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onStartLesson('derivatives')}
                >
                    <div className="mb-4">
                        <Icon name="book" size={48} color="#E8E6F0" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">
                        CONTINUE LESSON
                    </h3>
                    <p className="text-white/90">Derivatives</p>
                    <p className="text-sm text-white/70 mt-2">Lesson 3 of 5</p>
                </motion.button>

                {/* New Lesson */}
                <motion.button
                    className="bg-gradient-to-br from-surfaceLight to-surface rounded-xl p-8 text-left card-hover opacity-75 border border-textPrimary/20"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <div className="mb-4">
                        <Icon name="lock" size={48} color="#A8A4B8" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">NEW LESSON</h3>
                    <p className="text-white/90">Power Rule</p>
                    <p className="text-sm text-white/70 mt-2">Unlocks at Level 9</p>
                </motion.button>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={cardVariants} className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                        <Icon name="trophy" size={28} color="#E8A87C" />
                        Achievements Unlocked
                    </h2>
                    <button className="text-primary hover:text-secondary transition-colors flex items-center gap-1">
                        View All <Icon name="arrow" size={16} color="currentColor" />
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {safeAchievements.map((achievement) => {
                        const data = achievementData[achievement]
                        if (!data) return null; // Skip if achievement data not found
                        return (
                            <motion.div
                                key={achievement}
                                className="glass-effect rounded-lg p-4 text-center card-hover"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="mb-2 flex justify-center">
                                    <Icon name={data.icon} size={40} color={data.color} />
                                </div>
                                <p className="text-sm text-textPrimary">{data.name}</p>
                            </motion.div>
                        )
                    })}
                    <motion.div
                        className="glass-effect rounded-lg p-4 text-center border-2 border-dashed border-textSecondary/30"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="mb-2 flex justify-center opacity-30">
                            <Icon name="lock" size={40} color="#A8A4B8" />
                        </div>
                        <p className="text-sm text-textSecondary">Locked</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Quick Access */}
            <motion.div variants={cardVariants} className="grid md:grid-cols-2 gap-4">
                <motion.button
                    className="glass-effect rounded-xl p-6 text-center card-hover"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onNavigate('lessons')}
                >
                    <span className="text-lg font-semibold flex items-center justify-center gap-2">
                        <Icon name="lightbulb" size={24} color="#E8A87C" />
                        View All Lessons
                        <Icon name="arrow" size={20} color="currentColor" />
                    </span>
                </motion.button>

                <motion.button
                    className="glass-effect rounded-xl p-6 text-center card-hover bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onNavigate('astrophysics-hub')}
                >
                    <span className="text-lg font-semibold flex items-center justify-center gap-2">
                        <Icon name="star" size={24} color="#F59E0B" />
                        Astrophysics Hub
                        <Icon name="arrow" size={20} color="currentColor" />
                    </span>
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default Dashboard
