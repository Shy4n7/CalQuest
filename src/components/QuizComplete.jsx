import { motion } from 'framer-motion'
import { scaleUpVariants, confettiVariants } from '../utils/animations'
import { Icon } from './icons'

const QuizComplete = ({ results, onContinue }) => {
    const { score, total, accuracy } = results

    const getGrade = () => {
        if (accuracy >= 80) return { icon: 'star', color: '#7EC8A3', text: 'EXCELLENT!', textColor: 'text-success' }
        if (accuracy >= 60) return { icon: 'check', color: '#6B8DD6', text: 'GOOD JOB!', textColor: 'text-primary' }
        return { icon: 'target', color: '#E8A87C', text: 'KEEP PRACTICING!', textColor: 'text-accent' }
    }

    const grade = getGrade()

    // Generate confetti
    const confetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random(),
    }))

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
        >
            {/* Confetti Animation */}
            {accuracy >= 60 && (
                <div className="absolute inset-0 pointer-events-none">
                    {confetti.map((c) => (
                        <motion.div
                            key={c.id}
                            className="absolute w-3 h-3 bg-primary rounded-full"
                            style={{ left: `${c.x}%`, top: '-10px' }}
                            variants={confettiVariants}
                            initial="initial"
                            animate="exit"
                            transition={{ delay: c.delay, duration: c.duration }}
                        />
                    ))}
                </div>
            )}

            {/* Results Card */}
            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div
                    className="bg-surface/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-700 shadow-2xl text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                    {/* Icon */}
                    <motion.div
                        className="flex justify-center mb-6"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: 3,
                        }}
                    >
                        <Icon name={grade.icon} size={100} color={grade.color} />
                    </motion.div>

                    {/* Title */}
                    <h1 className={`text-5xl font-heading font-bold mb-4 ${grade.textColor}`}>
                        {grade.text}
                    </h1>

                    {/* Divider */}
                    <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full" />

                    {/* Results */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <div className="text-textSecondary mb-2">Quiz Results</div>
                            <div className="text-6xl font-bold text-gradient">
                                {score} / {total}
                            </div>
                        </div>

                        <div>
                            <div className="text-textSecondary mb-2">Accuracy</div>
                            <div className="text-5xl font-bold text-primary">
                                {accuracy.toFixed(0)}%
                            </div>
                            <div className="w-full bg-background rounded-full h-4 mt-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${accuracy}%` }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-background rounded-lg p-4">
                                <div className="text-textSecondary text-sm mb-1">XP Earned</div>
                                <div className="text-3xl font-bold text-accent">
                                    +{score * 20}
                                </div>
                            </div>
                            <div className="bg-background rounded-lg p-4">
                                <div className="text-textSecondary text-sm mb-1">Streak</div>
                                <div className="text-3xl font-bold text-accent flex items-center justify-center gap-2">
                                    <Icon name="flame" size={32} color="#E8A87C" />
                                    +1
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-lg text-textSecondary mb-8">
                        {accuracy >= 80
                            ? "Outstanding work! You've mastered this concept!"
                            : accuracy >= 60
                                ? 'Great effort! Keep practicing to improve even more.'
                                : "Don't give up! Review the material and try again."}
                    </p>

                    {/* Continue Button */}
                    <motion.button
                        className="px-12 py-4 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-xl shadow-lg"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onContinue}
                    >
                        Continue Learning →
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default QuizComplete
