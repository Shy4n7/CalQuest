import { motion } from 'framer-motion'
import { fadeInVariants, scaleUpVariants, staggerContainerVariants } from '../utils/animations'
import { Icon } from './icons'

const ConceptIntro = ({ concept, onNext }) => {
    const concepts = {
        derivatives: {
            title: 'DERIVATIVES',
            subtitle: 'How Fast Things Change',
            icon: 'derivative',
            iconColor: '#E8A87C',
            analogy: {
                icon: 'target',
                iconColor: '#6B8DD6',
                title: 'Think of it like THIS:',
                points: [
                    'Position changes with TIME → Derivative = Speed',
                    'Speed changes with TIME → 2nd Derivative = Acceleration',
                ],
            },
            description: 'Derivatives tell us the rate of change at any exact moment.',
        },
        integrals: {
            title: 'INTEGRALS',
            subtitle: 'Adding Up the Pieces',
            icon: 'integral',
            iconColor: '#8B7EC8',
            analogy: {
                icon: 'derivative',
                iconColor: '#E8A87C',
                title: 'Imagine filling a bucket:',
                points: [
                    'Water flows in at different rates',
                    'Integration adds up all the tiny amounts',
                    'Result: Total water in the bucket!',
                ],
            },
            description: 'Integrals find the total accumulation or area under a curve.',
        },
        limits: {
            title: 'LIMITS',
            subtitle: 'Getting Infinitely Close',
            icon: 'limit',
            iconColor: '#6B8DD6',
            analogy: {
                icon: 'target',
                iconColor: '#8B7EC8',
                title: 'Like approaching a target:',
                points: [
                    'You get closer and closer',
                    'But never quite touch it',
                    'The limit is where you\'re heading!',
                ],
            },
            description: 'Limits describe what value a function approaches.',
        },
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
        },
    }

    const data = concepts[concept] || concepts.derivatives

    return (
        <motion.div
            className="min-h-[600px] flex items-center justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Animated Background Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>

                {/* Main Content */}
                <motion.div
                    className="relative bg-surface/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700 shadow-2xl"
                    variants={scaleUpVariants}
                >
                    {/* Icon */}
                    <motion.div
                        className="flex justify-center mb-6"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <Icon name={data.icon} size={100} color={data.iconColor} />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-5xl md:text-6xl font-heading font-bold text-center mb-4"
                        variants={fadeInVariants}
                    >
                        <span className="text-gradient">{data.title}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-3xl text-center text-textSecondary mb-8"
                        variants={fadeInVariants}
                    >
                        "{data.subtitle}"
                    </motion.p>

                    {/* Analogy Section */}
                    <motion.div
                        className="bg-background/50 rounded-2xl p-8 mb-8"
                        variants={fadeInVariants}
                    >
                        <h2 className="text-2xl font-heading font-bold mb-4 flex items-center">
                            <span className="mr-3">
                                <Icon name={data.analogy.icon} size={40} color={data.analogy.iconColor} />
                            </span>
                            {data.analogy.title}
                        </h2>
                        <ul className="space-y-3">
                            {data.analogy.points.map((point, index) => (
                                <motion.li
                                    key={index}
                                    className="text-lg text-textPrimary flex items-start"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.2 }}
                                >
                                    <span className="text-primary mr-3">→</span>
                                    {point}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="text-xl text-center text-textSecondary mb-8"
                        variants={fadeInVariants}
                    >
                        {data.description}
                    </motion.p>

                    {/* Next Button */}
                    <motion.div className="flex justify-center" variants={fadeInVariants}>
                        <motion.button
                            className="px-12 py-4 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-xl shadow-lg"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                        >
                            Ready to See It in Action! →
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default ConceptIntro
