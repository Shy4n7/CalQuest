import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../icons';
import { cardVariants, staggerContainerVariants } from '../../utils/animations';

const AstrophysicsHub = ({ onNavigate }) => {
    const features = [
        {
            id: 'cosmic-calculator',
            title: 'Cosmic Calculators',
            icon: 'derivative',
            color: '#F59E0B',
            description: 'Redshift, Parallax, Kepler, Hubble',
            status: 'available',
            category: 'tools',
        },
        {
            id: 'gravity-wells',
            title: 'Gravity Wells',
            icon: 'target',
            color: '#6B8DD6',
            description: '3D spacetime curvature visualization',
            status: 'available',
            category: 'visualizations',
        },
        {
            id: 'black-hole',
            title: 'Black Hole Explorer',
            icon: 'star',
            color: '#8B7EC8',
            description: 'Event horizons & gravitational lensing',
            status: 'available',
            category: 'visualizations',
        },
        {
            id: 'space-mission',
            title: 'Space Mission Simulator',
            icon: 'rocket',
            color: '#10B981',
            description: 'Plan orbital transfers & trajectories',
            status: 'coming-soon',
            category: 'simulations',
        },
        {
            id: 'challenges',
            title: 'Astrophysics Challenges',
            icon: 'trophy',
            color: '#EF4444',
            description: 'Daily problems & mission scenarios',
            status: 'coming-soon',
            category: 'challenges',
        },
        {
            id: 'solar-system-builder',
            title: 'Build Your Solar System',
            icon: 'integral',
            color: '#E8A87C',
            description: 'Create & test stable planetary systems',
            status: 'coming-soon',
            category: 'games',
        },
    ];

    const categories = [
        { id: 'all', name: 'All Features', icon: 'star' },
        { id: 'tools', name: 'Tools', icon: 'book' },
        { id: 'visualizations', name: 'Visualizations', icon: 'target' },
        { id: 'simulations', name: 'Simulations', icon: 'rocket' },
        { id: 'challenges', name: 'Challenges', icon: 'trophy' },
        { id: 'games', name: 'Games', icon: 'lightbulb' },
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredFeatures = activeCategory === 'all'
        ? features
        : features.filter(f => f.category === activeCategory);

    const handleFeatureClick = (featureId) => {
        if (featureId === 'cosmic-calculator') {
            onNavigate('cosmic-calculator');
        } else if (featureId === 'gravity-wells') {
            onNavigate('gravity-wells');
        } else if (featureId === 'black-hole') {
            onNavigate('black-hole');
        } else {
            // Coming soon features
            alert('Coming soon! This feature is under development.');
        }
    };

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
        >
            {/* Header */}
            <motion.div variants={cardVariants} className="text-center space-y-4">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors mb-4"
                >
                    <span>←</span>
                    <span>Back to Dashboard</span>
                </button>

                <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient">
                    Astrophysics Hub
                </h1>
                <p className="text-xl text-textSecondary max-w-3xl mx-auto">
                    Explore the universe through interactive tools, visualizations, and simulations.
                    Learn calculus by calculating real cosmic phenomena!
                </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div variants={cardVariants} className="bg-surface/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-700">
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${activeCategory === cat.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                                }`}
                        >
                            <Icon name={cat.icon} size={16} color={activeCategory === cat.id ? '#FFFFFF' : '#A8A4B8'} />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={cardVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFeatures.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative group ${feature.status === 'available' ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
                            }`}
                        onClick={() => feature.status === 'available' && handleFeatureClick(feature.id)}
                    >
                        <div className={`glass-effect rounded-2xl p-6 border-2 transition-all ${feature.status === 'available'
                            ? 'border-gray-700 hover:border-primary hover:shadow-xl hover:scale-105'
                            : 'border-gray-800'
                            }`}>
                            {/* Status Badge */}
                            {feature.status === 'coming-soon' && (
                                <div className="absolute top-4 right-4 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                                    Coming Soon
                                </div>
                            )}

                            {/* Icon */}
                            <div className="mb-4">
                                <Icon name={feature.icon} size={48} color={feature.color} />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-heading font-bold mb-2" style={{ color: feature.color }}>
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-textSecondary text-sm mb-4">
                                {feature.description}
                            </p>

                            {/* Action */}
                            {feature.status === 'available' && (
                                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                                    <span>Explore</span>
                                    <Icon name="arrow" size={16} color="#6B8DD6" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={cardVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-primary mb-1">15</div>
                    <div className="text-xs text-textSecondary">Total Features</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-success mb-1">
                        {features.filter(f => f.status === 'available').length}
                    </div>
                    <div className="text-xs text-textSecondary">Available Now</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">
                        {features.filter(f => f.status === 'coming-soon').length}
                    </div>
                    <div className="text-xs text-textSecondary">Coming Soon</div>
                </div>
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 text-center">
                    <div className="text-3xl font-bold text-secondary mb-1">∞</div>
                    <div className="text-xs text-textSecondary">Possibilities</div>
                </div>
            </motion.div>

            {/* Info Banner */}
            <motion.div variants={cardVariants} className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                    <Icon name="rocket" size={40} color="#10B981" className="flex-shrink-0" />
                    <div>
                        <h3 className="text-xl font-semibold text-textPrimary mb-2">
                            More Features In Development
                        </h3>
                        <p className="text-sm text-textSecondary">
                            We're actively developing new astrophysics tools, visualizations, and simulations.
                            Each feature teaches real calculus concepts through interactive cosmic phenomena.
                            Check back regularly for updates.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AstrophysicsHub;
