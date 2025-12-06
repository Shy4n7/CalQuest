// Astrophysics Applications - Lesson Content
// Connecting calculus to real-world space physics

export const astrophysicsContent = {
    'orbital-mechanics': {
        title: 'ORBITAL MECHANICS',
        subtitle: 'How Planets Stay in Orbit',
        icon: 'rocket',
        iconColor: '#F59E0B',
        analogy: {
            icon: 'target',
            iconColor: '#3B82F6',
            title: 'Think of a ball on a string:',
            points: [
                'Spin it around your head - it stays in circular motion',
                'The faster you spin, the more tension in the string',
                'Planets orbit the same way, but gravity is the "string"!',
            ],
        },
        description: 'Using derivatives to understand orbital velocity and how planets move through space.',
        realWorld: {
            title: 'Real-World Application',
            example: 'The International Space Station orbits Earth at 7.66 km/s (27,600 km/h)!',
            formula: 'v = √(GM/r)',
            explanation: 'Derivative of position gives us velocity. For circular orbits, we use calculus to find the perfect speed needed to stay in orbit.',
        },
    },
    'escape-velocity': {
        title: 'ESCAPE VELOCITY',
        subtitle: 'Breaking Free from Gravity',
        icon: 'rocket',
        iconColor: '#EF4444',
        analogy: {
            icon: 'target',
            iconColor: '#10B981',
            title: 'Like throwing a ball upward:',
            points: [
                'Throw it gently - it comes back down',
                'Throw it REALLY hard - it might never come back!',
                'Escape velocity is the minimum speed to never return',
            ],
        },
        description: 'Using integration to calculate the energy needed to escape a planet\'s gravitational pull.',
        realWorld: {
            title: 'Real-World Application',
            example: 'To leave Earth, rockets must reach 11.2 km/s (40,320 km/h)!',
            formula: 'v_escape = √(2GM/r)',
            explanation: 'We integrate the gravitational force over distance to find total work needed. This gives us the escape velocity formula.',
        },
    },
    'gravitational-acceleration': {
        title: 'GRAVITATIONAL ACCELERATION',
        subtitle: 'How Gravity Changes with Distance',
        icon: 'target',
        iconColor: '#8B7EC8',
        analogy: {
            icon: 'derivative',
            iconColor: '#E8A87C',
            title: 'Like a magnet getting weaker:',
            points: [
                'Close to a magnet - strong pull',
                'Far from magnet - weak pull',
                'Gravity works the same way with distance!',
            ],
        },
        description: 'Using derivatives to find how gravitational acceleration changes as you move away from a planet.',
        realWorld: {
            title: 'Real-World Application',
            example: 'On Earth\'s surface: 9.8 m/s². At ISS altitude (400km): 8.7 m/s²',
            formula: 'g(r) = GM/r²',
            explanation: 'Taking the derivative of gravitational potential energy gives us the force, and dividing by mass gives acceleration.',
        },
    },
    'light-spectra': {
        title: 'LIGHT SPECTRA INTEGRATION',
        subtitle: 'Measuring Starlight',
        icon: 'integral',
        iconColor: '#3B82F6',
        analogy: {
            icon: 'integral',
            iconColor: '#F59E0B',
            title: 'Like counting all colors in a rainbow:',
            points: [
                'Stars emit light at many different wavelengths',
                'Each wavelength has different intensity',
                'We add up all the light to get total brightness!',
            ],
        },
        description: 'Using integration to calculate total energy from a star across all wavelengths.',
        realWorld: {
            title: 'Real-World Application',
            example: 'Astronomers integrate light spectra to measure star temperatures and compositions!',
            formula: '∫ I(λ) dλ',
            explanation: 'Integration sums up intensity across all wavelengths to find total luminosity. This tells us about the star\'s properties.',
        },
    },
};

// Helper function to get astrophysics concept data
export const getAstrophysicsConcept = (conceptId) => {
    return astrophysicsContent[conceptId] || astrophysicsContent['orbital-mechanics'];
};

// List of all astrophysics modules
export const astrophysicsModules = [
    {
        id: 'orbital-mechanics',
        name: 'Orbital Mechanics',
        icon: '🛰️',
        description: 'How planets and satellites stay in orbit',
        difficulty: 'Advanced',
    },
    {
        id: 'escape-velocity',
        name: 'Escape Velocity',
        icon: '🚀',
        description: 'Breaking free from gravitational pull',
        difficulty: 'Advanced',
    },
    {
        id: 'gravitational-acceleration',
        name: 'Gravitational Acceleration',
        icon: '🌍',
        description: 'How gravity changes with distance',
        difficulty: 'Advanced',
    },
    {
        id: 'light-spectra',
        name: 'Light Spectra',
        icon: '🌈',
        description: 'Measuring starlight with integration',
        difficulty: 'Advanced',
    },
];
