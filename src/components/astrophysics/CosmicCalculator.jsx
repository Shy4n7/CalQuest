import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../icons';
import { cardVariants, staggerContainerVariants } from '../../utils/animations';
import RedshiftCalculator from './calculators/RedshiftCalculator';
import ParallaxCalculator from './calculators/ParallaxCalculator';
import KeplerSolver from './calculators/KeplerSolver';
import HubbleCalculator from './calculators/HubbleCalculator';

const CosmicCalculator = ({ onNavigate }) => {
    const [activeCalculator, setActiveCalculator] = useState('redshift');

    const calculators = [
        {
            id: 'redshift',
            name: 'Redshift',
            icon: 'derivative',
            color: '#EF4444',
            description: 'Doppler shift & cosmic expansion',
            component: RedshiftCalculator,
        },
        {
            id: 'parallax',
            name: 'Parallax',
            icon: 'target',
            color: '#6B8DD6',
            description: 'Stellar distance measurement',
            component: ParallaxCalculator,
        },
        {
            id: 'kepler',
            name: "Kepler's Laws",
            icon: 'integral',
            color: '#8B7EC8',
            description: 'Orbital mechanics solver',
            component: KeplerSolver,
        },
        {
            id: 'hubble',
            name: "Hubble's Law",
            icon: 'star',
            color: '#10B981',
            description: 'Universe expansion calculator',
            component: HubbleCalculator,
        },
    ];

    const ActiveComponent = calculators.find(c => c.id === activeCalculator)?.component;

    return (
        <motion.div
            className="max-w-6xl mx-auto space-y-6"
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
                <div className="text-center flex-1">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                        Cosmic Calculator Playground
                    </h1>
                    <p className="text-textSecondary">
                        Real astrophysics calculations with step-by-step calculus
                    </p>
                </div>
                <div className="w-16" /> {/* Spacer */}
            </motion.div>

            {/* Calculator Tabs */}
            <motion.div variants={cardVariants} className="bg-surface/80 backdrop-blur-xl rounded-2xl p-3 border border-gray-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {calculators.map((calc) => (
                        <button
                            key={calc.id}
                            onClick={() => setActiveCalculator(calc.id)}
                            className={`p-4 rounded-xl transition-all ${activeCalculator === calc.id
                                ? 'bg-gradient-to-br from-primary/30 to-secondary/20 border-2 border-primary shadow-lg scale-105'
                                : 'bg-surface/50 border-2 border-gray-700 hover:border-gray-600 hover:bg-surface/70'
                                }`}
                        >
                            <div className="flex flex-col items-center text-center space-y-2">
                                <Icon name={calc.icon} size={32} color={calc.color} />
                                <div>
                                    <div className="font-semibold text-textPrimary">{calc.name}</div>
                                    <div className="text-xs text-textSecondary mt-1">{calc.description}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Calculator Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCalculator}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-700"
                >
                    {ActiveComponent && <ActiveComponent />}
                </motion.div>
            </AnimatePresence>

            {/* Info Footer */}
            <motion.div variants={cardVariants} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                    <Icon name="lightbulb" size={32} color="#E8A87C" className="flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold text-textPrimary mb-2">
                            💡 Learning Tip
                        </h3>
                        <p className="text-sm text-textSecondary">
                            Each calculator shows the step-by-step calculus behind real astrophysics measurements.
                            Try the preset examples to see how astronomers calculate cosmic distances, velocities, and orbital properties.
                            Click "Show Calculus" to understand the mathematical derivations!
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={cardVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">4</div>
                    <div className="text-xs text-textSecondary">Calculators</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">∞</div>
                    <div className="text-xs text-textSecondary">Calculations</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">100%</div>
                    <div className="text-xs text-textSecondary">Real Physics</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-success mb-1">✓</div>
                    <div className="text-xs text-textSecondary">Step-by-Step</div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CosmicCalculator;
