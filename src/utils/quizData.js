import { astrophysicsQuizData } from './astrophysicsQuizData';

export const quizData = {
    derivatives: [
        {
            id: 'deriv-1',
            type: 'multiple-choice',
            question: 'What is the derivative of f(x) = 5x²?',
            options: ['10x', '5x', '10x²', '5'],
            correctAnswer: 0,
            explanation: 'Using the power rule: bring the exponent down (2) and multiply by the coefficient (5), then reduce the exponent by 1. So 5 × 2 × x^(2-1) = 10x',
            hint: 'Remember the power rule: d/dx(xⁿ) = n·x^(n-1)',
        },
        {
            id: 'deriv-2',
            type: 'multiple-choice',
            question: 'If position is x(t) = 3t², what is the velocity at t = 2?',
            options: ['6', '12', '3', '9'],
            correctAnswer: 1,
            explanation: 'Velocity is the derivative of position. d/dx(3t²) = 6t. At t=2: v = 6(2) = 12',
            hint: 'Velocity = derivative of position. Find dx/dt first, then substitute t=2',
        },
        {
            id: 'deriv-3',
            type: 'multiple-choice',
            question: 'What does a derivative represent?',
            options: [
                'The area under a curve',
                'The rate of change at a point',
                'The total distance traveled',
                'The average value',
            ],
            correctAnswer: 1,
            explanation: 'A derivative measures how fast something is changing at any exact moment - the instantaneous rate of change.',
            hint: 'Think about the slope of the tangent line',
        },
        {
            id: 'deriv-4',
            type: 'multiple-choice',
            question: 'What is the derivative of f(x) = x³ - 2x?',
            options: ['3x² - 2', 'x² - 2', '3x² - 2x', '3x³ - 2'],
            correctAnswer: 0,
            explanation: 'Apply power rule to each term: d/dx(x³) = 3x², and d/dx(2x) = 2. So the answer is 3x² - 2',
            hint: 'Apply the power rule to each term separately',
        },
        {
            id: 'deriv-5',
            type: 'multiple-choice',
            question: 'If f\'(x) = 0 at a point, what does this mean?',
            options: [
                'The function has a maximum or minimum',
                'The function is zero',
                'The function is undefined',
                'The function is negative',
            ],
            correctAnswer: 0,
            explanation: 'When the derivative equals zero, the slope is zero (horizontal tangent line). This often indicates a maximum or minimum point.',
            hint: 'What does a horizontal tangent line mean?',
        },
    ],
    integrals: [
        {
            id: 'int-1',
            type: 'multiple-choice',
            question: 'What does an integral represent?',
            options: [
                'The slope at a point',
                'The area under a curve',
                'The rate of change',
                'The maximum value',
            ],
            correctAnswer: 1,
            explanation: 'An integral calculates the total accumulation, which geometrically represents the area under a curve.',
            hint: 'Think about adding up tiny rectangles',
        },
        {
            id: 'int-2',
            type: 'multiple-choice',
            question: 'What is ∫2x dx?',
            options: ['x²', 'x² + C', '2x²', '2x² + C'],
            correctAnswer: 1,
            explanation: 'Integration is the reverse of differentiation. Since d/dx(x²) = 2x, we have ∫2x dx = x² + C (don\'t forget the constant!)',
            hint: 'Integration is the reverse of differentiation. What function has derivative 2x?',
        },
        {
            id: 'int-3',
            type: 'multiple-choice',
            question: 'If velocity is v(t) = 6t, what is the displacement from t=0 to t=2?',
            options: ['6', '12', '18', '24'],
            correctAnswer: 1,
            explanation: 'Displacement = ∫v(t)dt from 0 to 2. ∫6t dt = 3t². Evaluating: 3(2²) - 3(0²) = 12',
            hint: 'Displacement is the integral of velocity',
        },
    ],
    limits: [
        {
            id: 'lim-1',
            type: 'multiple-choice',
            question: 'What is lim(x→3) (x + 2)?',
            options: ['3', '5', '2', 'undefined'],
            correctAnswer: 1,
            explanation: 'For continuous functions, the limit as x approaches a value is just the function value at that point. f(3) = 3 + 2 = 5',
            hint: 'For simple continuous functions, just substitute the value',
        },
        {
            id: 'lim-2',
            type: 'multiple-choice',
            question: 'What is lim(x→0) (sin(x)/x)?',
            options: ['0', '1', '∞', 'undefined'],
            correctAnswer: 1,
            explanation: 'This is a famous limit! As x approaches 0, sin(x)/x approaches 1. This is a fundamental limit in calculus.',
            hint: 'This is a special limit you should memorize',
        },
    ],
    // Astrophysics modules
    'orbital-mechanics': astrophysicsQuizData['orbital-mechanics'],
    'escape-velocity': astrophysicsQuizData['escape-velocity'],
    'gravitational-acceleration': astrophysicsQuizData['gravitational-acceleration'],
    'light-spectra': astrophysicsQuizData['light-spectra'],
}

export const getQuizByModule = (moduleId) => {
    return quizData[moduleId] || []
}

export const getRandomQuestions = (moduleId, count = 5) => {
    const questions = quizData[moduleId] || []
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, questions.length))
}
