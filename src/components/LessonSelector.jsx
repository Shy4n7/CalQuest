import { motion } from 'framer-motion'
import { cardVariants, staggerContainerVariants } from '../utils/animations'
import { Icon } from './icons'

const LessonSelector = ({ onNavigate, onStartLesson }) => {
    const modules = [
        {
            id: 'limits',
            chapter: 'Chapter 1: FOUNDATIONS',
            icon: 'limit',
            iconColor: '#6B8DD6',
            title: 'LIMITS',
            description: 'Understanding approach & convergence',
            lessons: 3,
            quizzes: 4,
            time: '45 mins',
            status: 'completed',
            progress: 100,
        },
        {
            id: 'derivatives',
            chapter: 'Chapter 2: RATE OF CHANGE',
            icon: 'derivative',
            iconColor: '#E8A87C',
            title: 'DERIVATIVES',
            description: 'Slopes, velocity, acceleration',
            lessons: 5,
            quizzes: 6,
            time: '90 mins',
            status: 'in-progress',
            progress: 45,
        },
        {
            id: 'integrals',
            chapter: 'Chapter 3: ACCUMULATION',
            icon: 'integral',
            iconColor: '#8B7EC8',
            title: 'INTEGRALS',
            description: 'Area, volume, total accumulation',
            lessons: 5,
            quizzes: 5,
            time: '80 mins',
            status: 'locked',
            unlockLevel: 12,
        },
        {
            id: 'astrophysics',
            chapter: 'Chapter 4: REAL-WORLD APPLICATIONS',
            icon: 'star',
            iconColor: '#F59E0B',
            title: 'ASTROPHYSICS',
            description: 'Orbital mechanics, escape velocity, gravity',
            lessons: 4,
            quizzes: 4,
            time: '75 mins',
            status: 'available',
            progress: 0,
        },
    ]

    const getStatusBadge = (module) => {
        if (module.status === 'completed') {
            return (
                <span className="flex items-center space-x-1 text-success">
                    <Icon name="check" size={16} color="#7EC8A3" />
                    <span className="font-semibold">100%</span>
                </span>
            )
        } else if (module.status === 'in-progress') {
            return (
                <span className="flex items-center space-x-2 text-primary">
                    <span className="font-semibold">IN PROGRESS</span>
                </span>
            )
        } else {
            return (
                <span className="flex items-center space-x-1 text-textSecondary">
                    <Icon name="lock" size={16} color="#A8A4B8" />
                    <span className="font-semibold">LOCKED</span>
                </span>
            )
        }
    }

    const getActionButton = (module) => {
        if (module.status === 'completed') {
            return (
                <motion.button
                    className="w-full bg-success/20 text-success border border-success rounded-lg py-3 font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onStartLesson(module.id)}
                >
                    REVIEW
                </motion.button>
            )
        } else if (module.status === 'in-progress') {
            return (
                <motion.button
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg py-3 font-semibold shadow-lg"
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(107, 141, 214, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onStartLesson(module.id)}
                >
                    CONTINUE
                </motion.button>
            )
        } else {
            return (
                <div className="w-full glass-effect text-textSecondary rounded-lg py-3 font-semibold text-center border border-textPrimary/20">
                    Unlock at Level {module.unlockLevel}
                </div>
            )
        }
    }

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
                <h1 className="text-3xl font-heading font-bold">Lessons</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-textSecondary">Progress:</span>
                    <span className="text-primary font-bold">45%</span>
                </div>
            </motion.div>

            {/* Module Cards */}
            <div className="space-y-8">
                {modules.map((module, index) => (
                    <motion.div
                        key={module.id}
                        variants={cardVariants}
                        className="space-y-2"
                    >
                        {/* Chapter Label */}
                        {(index === 0 || modules[index - 1].chapter !== module.chapter) && (
                            <h2 className="text-lg font-semibold text-textSecondary">
                                {module.chapter}
                            </h2>
                        )}

                        {/* Module Card */}
                        <motion.div
                            className={`glass-effect rounded-xl p-6 border-2 ${module.status === 'in-progress'
                                ? 'border-primary glow'
                                : module.status === 'completed'
                                    ? 'border-success/30'
                                    : 'border-textPrimary/10'
                                }`}
                            whileHover={module.status !== 'locked' ? { y: -4 } : {}}
                        >
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Icon name={module.icon} size={48} color={module.iconColor} />
                                        <div>
                                            <h3 className="text-2xl font-heading font-bold">
                                                {module.title}
                                            </h3>
                                            <p className="text-textSecondary">{module.description}</p>
                                        </div>
                                    </div>
                                    {getStatusBadge(module)}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center space-x-6 text-sm text-textSecondary">
                                    <span>• {module.lessons} lessons</span>
                                    <span>• {module.quizzes} quizzes</span>
                                    <span>• Time: {module.time}</span>
                                </div>

                                {/* Progress Bar (for in-progress modules) */}
                                {module.status === 'in-progress' && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-textSecondary">Progress</span>
                                            <span className="text-primary font-semibold">
                                                {module.progress}% complete
                                            </span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${module.progress}%` }}
                                                transition={{ duration: 1, ease: 'easeOut' }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Action Button */}
                                {getActionButton(module)}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default LessonSelector
