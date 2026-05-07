import { Lesson } from '../types';

// All 30 lessons for CalQuest
const LESSONS: Lesson[] = [
    // ===== LIMITS MODULE (6 lessons) =====
    {
        id: 'limits_1',
        title: 'Getting Super Close (Without Touching!)',
        module: 'limits',
        level: 1,
        explanation: "Imagine chasing a butterfly but never quite catching it! That's what a limit is - getting closer and closer to something without actually reaching it. In math, we write this as: lim(x→2) means 'as x gets super close to 2'.",
        visualization: {
            type: 'zoom_numberline',
            params: { target: 2, zoomLevels: 5 },
        },
        exercises: [
            {
                id: 'limits_1_q1',
                question: 'If you keep getting closer to 5, what number are you approaching?',
                type: 'multiple_choice',
                options: ['4', '5', '6', 'Infinity'],
                correct: 1,
                explanation: "You're approaching 5! Even though you might not touch it, you're getting closer and closer to 5.",
                hint: 'Think about what number you are moving towards.',
            },
            {
                id: 'limits_1_q2',
                question: 'What does lim(x→3) mean in simple words?',
                type: 'multiple_choice',
                options: [
                    'x equals 3',
                    'x is getting close to 3',
                    'x is far from 3',
                    'x is greater than 3',
                ],
                correct: 1,
                explanation: 'lim(x→3) means "as x gets closer and closer to 3".',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'limits_2',
        title: 'The Zoom-In Game',
        module: 'limits',
        level: 2,
        explanation: "Let's play a game! Imagine you have a super-powered magnifying glass. You can zoom in on a number line to see what's happening really, really close to a point. This is how mathematicians think about limits!",
        visualization: {
            type: 'interactive_zoom',
            params: { function: 'x^2', point: 2 },
        },
        exercises: [
            {
                id: 'limits_2_q1',
                question: 'If f(x) = x + 1, what is lim(x→2) f(x)?',
                type: 'multiple_choice',
                options: ['1', '2', '3', '4'],
                correct: 2,
                explanation: 'As x approaches 2, x + 1 approaches 2 + 1 = 3!',
                hint: 'Substitute x = 2 into the function.',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'limits_3',
        title: 'Left Side, Right Side',
        module: 'limits',
        level: 3,
        explanation: "You can approach a number from two directions - like walking to a door from the left or right! We call these 'one-sided limits'. Sometimes they're the same, sometimes they're different!",
        visualization: {
            type: 'one_sided_limits',
            params: { function: 'abs(x)', point: 0 },
        },
        exercises: [
            {
                id: 'limits_3_q1',
                question: 'If you approach 5 from the left (4.9, 4.99, 4.999...), where are you heading?',
                type: 'multiple_choice',
                options: ['4', '5', '6', 'Nowhere'],
                correct: 1,
                explanation: "You're heading to 5, just from the left side!",
            },
        ],
        xpReward: 25,
    },
    {
        id: 'limits_4',
        title: 'When Limits Don\'t Exist',
        module: 'limits',
        level: 4,
        explanation: "Sometimes limits are like trying to meet a friend who keeps changing their mind about where to meet. If the left and right sides don't agree, the limit doesn't exist!",
        visualization: {
            type: 'discontinuous_function',
            params: { function: 'step', point: 0 },
        },
        exercises: [
            {
                id: 'limits_4_q1',
                question: 'If approaching from left gives 2 and from right gives 5, does the limit exist?',
                type: 'multiple_choice',
                options: ['Yes, it\'s 2', 'Yes, it\'s 5', 'No, they disagree', 'Yes, it\'s 3.5'],
                correct: 2,
                explanation: 'The limit does not exist because the two sides disagree!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'limits_5',
        title: 'Infinity and Beyond!',
        module: 'limits',
        level: 5,
        explanation: "What happens when you keep going forever? That's where infinity comes in! We can talk about what happens as x gets bigger and bigger (or smaller and smaller).",
        visualization: {
            type: 'infinite_limits',
            params: { function: '1/x', range: [0.1, 100] },
        },
        exercises: [
            {
                id: 'limits_5_q1',
                question: 'As x gets bigger and bigger, what happens to 1/x?',
                type: 'multiple_choice',
                options: ['Gets bigger', 'Gets smaller', 'Stays the same', 'Becomes negative'],
                correct: 1,
                explanation: '1/x gets smaller and smaller, approaching 0!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'limits_6',
        title: 'Limits Master Challenge',
        module: 'limits',
        level: 6,
        explanation: "Time to put it all together! You're now a limits expert. Let's solve some real calculus problems!",
        visualization: {
            type: 'comprehensive_limits',
            params: { multiple: true },
        },
        exercises: [
            {
                id: 'limits_6_q1',
                question: 'What is lim(x→0) (sin(x)/x)?',
                type: 'multiple_choice',
                options: ['0', '1', 'Infinity', 'Does not exist'],
                correct: 1,
                explanation: 'This is a famous limit! lim(x→0) (sin(x)/x) = 1',
            },
        ],
        xpReward: 25,
    },

    // ===== DERIVATIVES MODULE (6 lessons) =====
    {
        id: 'derivatives_1',
        title: 'Speed is a Derivative!',
        module: 'derivatives',
        level: 1,
        explanation: "Imagine you're in a car. Your speedometer shows how fast your position is changing - that's a derivative! If position changes with time, the derivative is speed!",
        visualization: {
            type: 'position_speed',
            params: { animation: true },
        },
        exercises: [
            {
                id: 'derivatives_1_q1',
                question: 'If your position is changing 60 miles per hour, what is your speed?',
                type: 'multiple_choice',
                options: ['30 mph', '60 mph', '120 mph', '0 mph'],
                correct: 1,
                explanation: 'Speed is the rate of change of position, so 60 mph!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'derivatives_2',
        title: 'The Slope of a Curve',
        module: 'derivatives',
        level: 2,
        explanation: "A derivative is like finding the slope of a hill at exactly one point. It tells you how steep the curve is right there!",
        visualization: {
            type: 'tangent_line',
            params: { function: 'x^2', interactive: true },
        },
        exercises: [
            {
                id: 'derivatives_2_q1',
                question: 'What does the derivative tell you about a curve?',
                type: 'multiple_choice',
                options: ['Its color', 'Its steepness', 'Its length', 'Its width'],
                correct: 1,
                explanation: 'The derivative tells you how steep the curve is!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'derivatives_3',
        title: 'The Power Rule Magic',
        module: 'derivatives',
        level: 3,
        explanation: "Here's a magic trick! For x^n, the derivative is n·x^(n-1). So x² becomes 2x, x³ becomes 3x². It's like bringing the power down and reducing it by 1!",
        visualization: {
            type: 'power_rule_demo',
            params: { examples: ['x^2', 'x^3', 'x^4'] },
        },
        exercises: [
            {
                id: 'derivatives_3_q1',
                question: 'What is the derivative of x³?',
                type: 'multiple_choice',
                options: ['x²', '3x²', '3x', 'x³'],
                correct: 1,
                explanation: 'Using the power rule: bring down 3, reduce power by 1 → 3x²!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'derivatives_4',
        title: 'Acceleration is a Second Derivative!',
        module: 'derivatives',
        level: 4,
        explanation: "If speed is how fast position changes, acceleration is how fast speed changes! That's a derivative of a derivative - we call it the second derivative!",
        visualization: {
            type: 'acceleration_demo',
            params: { car_animation: true },
        },
        exercises: [
            {
                id: 'derivatives_4_q1',
                question: 'If position → speed is the first derivative, what is speed → acceleration?',
                type: 'multiple_choice',
                options: ['First derivative', 'Second derivative', 'Third derivative', 'Not a derivative'],
                correct: 1,
                explanation: 'Acceleration is the second derivative of position!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'derivatives_5',
        title: 'Chain Rule: Derivatives Inside Derivatives',
        module: 'derivatives',
        level: 5,
        explanation: "Sometimes functions are nested like Russian dolls. The chain rule helps us take derivatives of these nested functions!",
        visualization: {
            type: 'chain_rule',
            params: { example: '(x^2 + 1)^3' },
        },
        exercises: [
            {
                id: 'derivatives_5_q1',
                question: 'For f(g(x)), the chain rule says to multiply derivatives of...',
                type: 'multiple_choice',
                options: ['f and g', 'f only', 'g only', 'Neither'],
                correct: 0,
                explanation: 'Chain rule: f\'(g(x)) · g\'(x) - multiply both derivatives!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'derivatives_6',
        title: 'Derivatives Master Challenge',
        module: 'derivatives',
        level: 6,
        explanation: "You're now a derivatives expert! Let's solve some challenging problems!",
        visualization: {
            type: 'comprehensive_derivatives',
            params: { multiple: true },
        },
        exercises: [
            {
                id: 'derivatives_6_q1',
                question: 'What is d/dx(x⁴ + 2x² + 1)?',
                type: 'multiple_choice',
                options: ['4x³ + 4x', '4x³ + 2x', 'x³ + 2x', '4x³ + 4x + 1'],
                correct: 0,
                explanation: 'Using power rule on each term: 4x³ + 4x!',
            },
        ],
        xpReward: 25,
    },

    // ===== POWER RULE MODULE (6 lessons) =====
    {
        id: 'power_1',
        title: 'The Pattern Detective',
        module: 'powerRule',
        level: 1,
        explanation: "Let's discover a pattern! Watch what happens when we take derivatives of x, x², x³... There's a beautiful pattern hiding here!",
        visualization: {
            type: 'pattern_discovery',
            params: { powers: [1, 2, 3, 4, 5] },
        },
        exercises: [
            {
                id: 'power_1_q1',
                question: 'If d/dx(x²) = 2x, what pattern do you see?',
                type: 'multiple_choice',
                options: [
                    'Power becomes coefficient',
                    'Power stays same',
                    'Power doubles',
                    'No pattern',
                ],
                correct: 0,
                explanation: 'The power (2) comes down to become the coefficient!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'power_2',
        title: 'Bring It Down, Subtract One',
        module: 'powerRule',
        level: 2,
        explanation: "The power rule has two steps: (1) Bring the power down as a multiplier, (2) Subtract 1 from the power. That's it!",
        visualization: {
            type: 'power_rule_steps',
            params: { animated: true },
        },
        exercises: [
            {
                id: 'power_2_q1',
                question: 'What is d/dx(x⁵)?',
                type: 'multiple_choice',
                options: ['5x⁴', 'x⁴', '5x⁵', 'x⁵'],
                correct: 0,
                explanation: 'Bring down 5, subtract 1 from power: 5x⁴!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'power_3',
        title: 'Constants Disappear!',
        module: 'powerRule',
        level: 3,
        explanation: "Here's a fun fact: the derivative of any constant (like 5 or 100) is always 0! Constants don't change, so their rate of change is zero!",
        visualization: {
            type: 'constant_derivative',
            params: { examples: [5, 10, 100] },
        },
        exercises: [
            {
                id: 'power_3_q1',
                question: 'What is d/dx(42)?',
                type: 'multiple_choice',
                options: ['42', '1', '0', '41'],
                correct: 2,
                explanation: 'The derivative of any constant is 0!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'power_4',
        title: 'Negative Powers',
        module: 'powerRule',
        level: 4,
        explanation: "The power rule works for negative powers too! Remember: 1/x² is the same as x⁻². The rule still applies!",
        visualization: {
            type: 'negative_powers',
            params: { examples: ['x^-1', 'x^-2'] },
        },
        exercises: [
            {
                id: 'power_4_q1',
                question: 'What is d/dx(x⁻²)?',
                type: 'multiple_choice',
                options: ['-2x⁻³', '2x⁻³', '-2x⁻¹', 'x⁻²'],
                correct: 0,
                explanation: 'Bring down -2, subtract 1: -2x⁻³!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'power_5',
        title: 'Fractional Powers',
        module: 'powerRule',
        level: 5,
        explanation: "Even fractional powers follow the rule! √x is x^(1/2), and the power rule still works perfectly!",
        visualization: {
            type: 'fractional_powers',
            params: { examples: ['x^(1/2)', 'x^(1/3)'] },
        },
        exercises: [
            {
                id: 'power_5_q1',
                question: 'What is d/dx(√x)?',
                type: 'multiple_choice',
                options: ['1/(2√x)', '√x', '2√x', '1/√x'],
                correct: 0,
                explanation: 'x^(1/2) → (1/2)x^(-1/2) = 1/(2√x)!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'power_6',
        title: 'Power Rule Master Challenge',
        module: 'powerRule',
        level: 6,
        explanation: "You've mastered the power rule! Let's tackle some complex problems!",
        visualization: {
            type: 'comprehensive_power_rule',
            params: { multiple: true },
        },
        exercises: [
            {
                id: 'power_6_q1',
                question: 'What is d/dx(3x⁴ - 2x² + 7)?',
                type: 'multiple_choice',
                options: ['12x³ - 4x', '12x³ - 2x', '3x³ - 2x', '12x³ - 4x + 7'],
                correct: 0,
                explanation: 'Apply power rule to each term: 12x³ - 4x (constant disappears)!',
            },
        ],
        xpReward: 25,
    },

    // ===== INTEGRALS MODULE (6 lessons) =====
    {
        id: 'integrals_1',
        title: 'Area Under the Curve',
        module: 'integrals',
        level: 1,
        explanation: "Integration is like finding the area under a curve! Imagine coloring in the space between a curve and the x-axis - that's what integration calculates!",
        visualization: {
            type: 'area_under_curve',
            params: { function: 'x', range: [0, 4] },
        },
        exercises: [
            {
                id: 'integrals_1_q1',
                question: 'What does an integral calculate?',
                type: 'multiple_choice',
                options: ['Slope', 'Area', 'Speed', 'Distance from origin'],
                correct: 1,
                explanation: 'Integrals calculate the area under a curve!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'integrals_2',
        title: 'Rectangles to the Rescue',
        module: 'integrals',
        level: 2,
        explanation: "We can approximate area using rectangles! The more rectangles we use, the more accurate our answer. With infinite rectangles, we get the exact area!",
        visualization: {
            type: 'riemann_sum',
            params: { function: 'x^2', rectangles: [5, 10, 50, 100] },
        },
        exercises: [
            {
                id: 'integrals_2_q1',
                question: 'More rectangles means...',
                type: 'multiple_choice',
                options: [
                    'Less accurate',
                    'More accurate',
                    'Same accuracy',
                    'No change',
                ],
                correct: 1,
                explanation: 'More rectangles = better approximation!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'integrals_3',
        title: 'The Reverse of Derivatives',
        module: 'integrals',
        level: 3,
        explanation: "Integration is the opposite of differentiation! If the derivative of x² is 2x, then the integral of 2x is x²! They undo each other!",
        visualization: {
            type: 'derivative_integral_relationship',
            params: { examples: ['x^2', 'x^3'] },
        },
        exercises: [
            {
                id: 'integrals_3_q1',
                question: 'If d/dx(x³) = 3x², what is ∫3x² dx?',
                type: 'multiple_choice',
                options: ['x²', 'x³', '3x³', 'x⁴'],
                correct: 1,
                explanation: 'Integration reverses differentiation: ∫3x² dx = x³ (+ C)!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'integrals_4',
        title: 'The Mysterious +C',
        module: 'integrals',
        level: 4,
        explanation: "When we integrate, we always add '+ C' (a constant). Why? Because the derivative of any constant is 0, so we could have started with any constant!",
        visualization: {
            type: 'constant_of_integration',
            params: { show_family: true },
        },
        exercises: [
            {
                id: 'integrals_4_q1',
                question: 'Why do we add + C when integrating?',
                type: 'multiple_choice',
                options: [
                    'To make it harder',
                    'Because constants disappear when differentiating',
                    'It looks cool',
                    'No reason',
                ],
                correct: 1,
                explanation: 'We add + C because any constant becomes 0 when differentiated!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'integrals_5',
        title: 'Definite vs Indefinite',
        module: 'integrals',
        level: 5,
        explanation: "Indefinite integrals give us a function (+ C). Definite integrals give us a number - the exact area between two points!",
        visualization: {
            type: 'definite_vs_indefinite',
            params: { function: 'x^2', bounds: [0, 2] },
        },
        exercises: [
            {
                id: 'integrals_5_q1',
                question: 'What does ∫₀² x dx equal?',
                type: 'multiple_choice',
                options: ['x²/2', '2', '4', '1'],
                correct: 1,
                explanation: '[x²/2] from 0 to 2 = 4/2 - 0 = 2!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'integrals_6',
        title: 'Integrals Master Challenge',
        module: 'integrals',
        level: 6,
        explanation: "You're an integration expert! Let's solve some real calculus problems!",
        visualization: {
            type: 'comprehensive_integrals',
            params: { multiple: true },
        },
        exercises: [
            {
                id: 'integrals_6_q1',
                question: 'What is ∫(3x² + 2x) dx?',
                type: 'multiple_choice',
                options: ['x³ + x² + C', '6x + 2 + C', '3x³ + 2x² + C', 'x³ + x + C'],
                correct: 0,
                explanation: 'Integrate each term: x³ + x² + C!',
            },
        ],
        xpReward: 25,
    },

    // ===== ASTROPHYSICS MODULE (6 lessons) =====
    {
        id: 'astro_1',
        title: 'Rocket Science is Calculus!',
        module: 'astrophysics',
        level: 1,
        explanation: "Did you know rockets use calculus? To calculate how fast a rocket needs to go to escape Earth's gravity, we use derivatives and integrals!",
        visualization: {
            type: 'rocket_launch',
            params: { animation: true },
        },
        exercises: [
            {
                id: 'astro_1_q1',
                question: 'What branch of math do rockets use for calculations?',
                type: 'multiple_choice',
                options: ['Algebra', 'Calculus', 'Geometry', 'Arithmetic'],
                correct: 1,
                explanation: 'Rockets use calculus to calculate velocity, acceleration, and trajectories!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'astro_2',
        title: 'Orbital Velocity',
        module: 'astrophysics',
        level: 2,
        explanation: "To orbit Earth, you need to go exactly the right speed - not too fast, not too slow. We use derivatives to find this perfect speed!",
        visualization: {
            type: 'orbital_mechanics',
            params: { planet: 'Earth', show_velocity: true },
        },
        exercises: [
            {
                id: 'astro_2_q1',
                question: 'Orbital velocity is found using...',
                type: 'multiple_choice',
                options: ['Addition', 'Derivatives', 'Subtraction', 'Guessing'],
                correct: 1,
                explanation: 'We use derivatives to find the rate of change needed for orbit!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'astro_3',
        title: 'Escape Velocity',
        module: 'astrophysics',
        level: 3,
        explanation: "To leave Earth completely, you need to reach escape velocity - about 11 km/s! This is calculated using integrals of gravitational force!",
        visualization: {
            type: 'escape_velocity',
            params: { planet: 'Earth', show_calculation: true },
        },
        exercises: [
            {
                id: 'astro_3_q1',
                question: 'Earth\'s escape velocity is approximately...',
                type: 'multiple_choice',
                options: ['1 km/s', '11 km/s', '100 km/s', '1000 km/s'],
                correct: 1,
                explanation: 'Escape velocity from Earth is about 11 km/s!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'astro_4',
        title: 'Gravity Changes with Distance',
        module: 'astrophysics',
        level: 4,
        explanation: "Gravity gets weaker as you go higher! The rate at which it changes is a derivative. We use this to calculate rocket fuel needs!",
        visualization: {
            type: 'gravity_gradient',
            params: { show_derivative: true },
        },
        exercises: [
            {
                id: 'astro_4_q1',
                question: 'As you go higher, gravity...',
                type: 'multiple_choice',
                options: ['Gets stronger', 'Gets weaker', 'Stays same', 'Disappears instantly'],
                correct: 1,
                explanation: 'Gravity decreases with distance from Earth!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'astro_5',
        title: 'Planetary Motion',
        module: 'astrophysics',
        level: 5,
        explanation: "Planets move in elliptical orbits. To understand their speed at different points, we use derivatives of their position!",
        visualization: {
            type: 'planetary_orbit',
            params: { planet: 'Mars', show_velocity_vectors: true },
        },
        exercises: [
            {
                id: 'astro_5_q1',
                question: 'Planets move faster when they are...',
                type: 'multiple_choice',
                options: [
                    'Farther from Sun',
                    'Closer to Sun',
                    'Same speed always',
                    'Not moving',
                ],
                correct: 1,
                explanation: 'Planets move faster when closer to the Sun (Kepler\'s laws)!',
            },
        ],
        xpReward: 25,
    },
    {
        id: 'astro_6',
        title: 'Astrophysics Master Challenge',
        module: 'astrophysics',
        level: 6,
        explanation: "Congratulations! You've learned how calculus powers space exploration! You're ready for the final challenge!",
        visualization: {
            type: 'comprehensive_astrophysics',
            params: { multiple: true },
        },
        exercises: [
            {
                id: 'astro_6_q1',
                question: 'What do we use to calculate changing gravitational force?',
                type: 'multiple_choice',
                options: ['Algebra', 'Derivatives', 'Multiplication', 'Division'],
                correct: 1,
                explanation: 'Derivatives help us calculate how gravity changes with distance!',
            },
        ],
        xpReward: 25,
    },
];

/**
 * Get lesson by ID
 */
export const getLessonById = (lessonId: string): Lesson | undefined => {
    return LESSONS.find(lesson => lesson.id === lessonId);
};

/**
 * Get all lessons
 */
export const getAllLessons = (): Lesson[] => {
    return LESSONS;
};
