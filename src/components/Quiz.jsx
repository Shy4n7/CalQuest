import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/userStore';
import useLessonStore from '../store/lessonStore';
import useAuthStore from '../store/authStore';
import { cardVariants, scaleUpVariants, xpCounterVariants } from '../utils/animations'
import { Icon } from './icons'

const Quiz = ({ questions, onComplete, moduleId }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [startTime] = useState(Date.now());
    const { addXP } = useUserStore();
    const { submitLesson } = useLessonStore();
    const { isAuthenticated } = useAuthStore();

    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    const handleAnswer = (answerIndex) => {
        if (isAnswered) return

        setSelectedAnswer(answerIndex)
        const correct = answerIndex === question.correctAnswer

        if (correct) {
            setIsCorrect(true)
            setIsAnswered(true)
            const xpEarned = attempts === 0 ? 20 : 10
            setScore(score + 1)
            addXP(xpEarned)
        } else {
            setAttempts(attempts + 1)
            if (attempts >= 1) {
                setIsAnswered(true)
                setIsCorrect(false)
            } else {
                setShowHint(true)
            }
        }
    }

    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(false);
            setAttempts(0);
            setShowHint(false);
        } else {
            // Quiz complete - submit to backend
            const timeTaken = Math.floor((Date.now() - startTime) / 1000); // seconds
            const results = {
                score,
                total: questions.length,
                accuracy: (score / questions.length) * 100,
                timeTaken,
            };

            // Submit to backend if authenticated
            if (isAuthenticated && moduleId) {
                try {
                    const answers = questions.map((q, idx) => ({
                        questionId: q.id,
                        answer: idx === currentQuestion ? selectedAnswer : null,
                        correct: idx < currentQuestion ? true : isCorrect,
                    }));

                    const response = await submitLesson(moduleId, answers, timeTaken);
                    if (response.success) {
                        // Update results with backend data
                        results.xpGained = response.xpGained;
                        results.achievements = response.newAchievements;
                    }
                } catch (error) {
                    console.error('Failed to submit quiz:', error);
                }
            }

            onComplete(results);
        }
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold">
                    Quiz: Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="flex items-center space-x-2">
                    <span className="text-textSecondary">Score:</span>
                    <motion.span
                        className="text-2xl font-bold text-success"
                        variants={xpCounterVariants}
                        animate={isCorrect ? 'increment' : 'initial'}
                    >
                        {score} / {questions.length}
                    </motion.span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface rounded-full h-3 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    className="bg-surface rounded-2xl p-8 border border-gray-700"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Question */}
                    <div className="mb-6">
                        <div className="text-sm text-textSecondary mb-2 flex items-center gap-2">
                            <Icon name={question.type === 'multiple-choice' ? 'quiz' : 'book'} size={16} color="#A8A4B8" />
                            {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Fill in the Blank'}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-textPrimary">
                            {question.question}
                        </h3>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index
                            const isCorrectAnswer = index === question.correctAnswer
                            const showCorrect = isAnswered && isCorrectAnswer
                            const showWrong = isAnswered && isSelected && !isCorrect

                            return (
                                <motion.button
                                    key={index}
                                    className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${showCorrect
                                        ? 'bg-success/20 border-2 border-success text-success'
                                        : showWrong
                                            ? 'bg-error/20 border-2 border-error text-error'
                                            : isSelected
                                                ? 'bg-primary/20 border-2 border-primary'
                                                : 'bg-background border-2 border-gray-700 hover:border-primary/50'
                                        }`}
                                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                    onClick={() => handleAnswer(index)}
                                    disabled={isAnswered}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        {showCorrect && <Icon name="check" size={24} color="#7EC8A3" />}
                                        {showWrong && <span className="text-2xl text-error">✗</span>}
                                    </div>
                                </motion.button>
                            )
                        })}
                    </div>

                    {/* Feedback */}
                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-success/20 border border-success' : 'bg-error/20 border border-error'
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    {isCorrect ? (
                                        <Icon name="check" size={32} color="#7EC8A3" />
                                    ) : (
                                        <span className="text-3xl text-error">✗</span>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg mb-1">
                                            {isCorrect ? 'CORRECT! +' + (attempts === 0 ? '20' : '10') + ' XP' : 'NOT QUITE!'}
                                        </h4>
                                        <p className="text-sm mb-2">
                                            <span className="font-semibold">Explanation:</span> {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {showHint && !isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-lg mb-4 bg-accent/20 border border-accent"
                            >
                                <div className="flex items-start space-x-3">
                                    <Icon name="lightbulb" size={28} color="#E8A87C" />
                                    <div>
                                        <h4 className="font-bold mb-1">Hint:</h4>
                                        <p className="text-sm">{question.hint}</p>
                                        <p className="text-xs text-textSecondary mt-2">
                                            Attempts: {attempts}/2 - Try again!
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Next Button */}
                    {isAnswered && (
                        <motion.button
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg text-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNext}
                        >
                            {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Complete Quiz'}
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Current XP Display */}
            <div className="text-center text-textSecondary">
                <p className="text-sm">
                    Session XP: <span className="text-primary font-bold">{score * 20}</span>
                </p>
            </div>
        </motion.div>
    )
}

export default Quiz
