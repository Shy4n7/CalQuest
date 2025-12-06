import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculations, convert, format } from '../../../utils/astrophysicsConstants';
import { Icon } from '../../icons';

const ParallaxCalculator = () => {
    const [parallaxArcsec, setParallaxArcsec] = useState(0.768); // Proxima Centauri
    const [showCalculus, setShowCalculus] = useState(false);

    // Calculate distance
    const distanceParsecs = calculations.parallaxDistance(parallaxArcsec);
    const distanceMeters = convert.parsecsToMeters(distanceParsecs);
    const distanceLightYears = convert.metersToLightYears(distanceMeters);
    const distanceAU = convert.metersToAU(distanceMeters);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-heading font-bold text-gradient mb-2">
                    Parallax Distance Calculator
                </h3>
                <p className="text-textSecondary">
                    Calculate stellar distances using the parallax method
                </p>
            </div>

            {/* Input */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <label className="block text-lg font-semibold mb-3">
                    Parallax Angle (arcseconds)
                </label>
                <input
                    type="number"
                    value={parallaxArcsec}
                    onChange={(e) => setParallaxArcsec(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary text-lg"
                    step="0.001"
                    min="0"
                />
                <p className="text-sm text-textSecondary mt-2">
                    Smaller angles = farther distances
                </p>
            </div>

            {/* Preset Examples */}
            <div className="bg-surface/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-2">Famous Stars:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                        onClick={() => setParallaxArcsec(0.768)}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Proxima Centauri<br />
                        <span className="text-xs opacity-75">0.768"</span>
                    </button>
                    <button
                        onClick={() => setParallaxArcsec(0.547)}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Alpha Centauri<br />
                        <span className="text-xs opacity-75">0.547"</span>
                    </button>
                    <button
                        onClick={() => setParallaxArcsec(0.380)}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Sirius<br />
                        <span className="text-xs opacity-75">0.380"</span>
                    </button>
                    <button
                        onClick={() => setParallaxArcsec(0.129)}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Vega<br />
                        <span className="text-xs opacity-75">0.129"</span>
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Distance</div>
                    <div className="text-3xl font-bold text-primary mb-2">
                        {distanceParsecs.toFixed(2)}
                    </div>
                    <div className="text-xs text-textSecondary">parsecs</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Distance</div>
                    <div className="text-3xl font-bold text-secondary mb-2">
                        {distanceLightYears.toFixed(2)}
                    </div>
                    <div className="text-xs text-textSecondary">light-years</div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Distance</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        {distanceAU.toLocaleString()}
                    </div>
                    <div className="text-xs text-textSecondary">AU</div>
                </div>
            </div>

            {/* Visual Diagram */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="target" size={20} color="#6B8DD6" />
                    Parallax Triangle Visualization
                </h4>
                <div className="relative h-64 bg-background/50 rounded-lg overflow-hidden">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                        {/* Background stars */}
                        <circle cx="200" cy="50" r="3" fill="#F59E0B" />
                        <text x="200" y="35" textAnchor="middle" fill="#F59E0B" fontSize="12">Target Star</text>

                        {/* Earth orbit */}
                        <ellipse cx="200" cy="150" rx="80" ry="20" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,4" />

                        {/* Earth positions */}
                        <circle cx="120" cy="150" r="5" fill="#3B82F6" />
                        <text x="120" y="175" textAnchor="middle" fill="#3B82F6" fontSize="10">Earth (Jan)</text>

                        <circle cx="280" cy="150" r="5" fill="#10B981" />
                        <text x="280" y="175" textAnchor="middle" fill="#10B981" fontSize="10">Earth (Jul)</text>

                        {/* Sight lines */}
                        <line x1="120" y1="150" x2="200" y2="50" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
                        <line x1="280" y1="150" x2="200" y2="50" stroke="#10B981" strokeWidth="1" opacity="0.5" />

                        {/* Parallax angle indicator */}
                        <path d="M 195 50 Q 200 60 205 50" fill="none" stroke="#EF4444" strokeWidth="2" />
                        <text x="200" y="80" textAnchor="middle" fill="#EF4444" fontSize="12">
                            p = {parallaxArcsec.toFixed(3)}"
                        </text>

                        {/* Distance label */}
                        <text x="200" y="100" textAnchor="middle" fill="#E8A87C" fontSize="14" fontWeight="bold">
                            d = {distanceParsecs.toFixed(2)} pc
                        </text>
                    </svg>
                </div>
                <p className="text-xs text-textSecondary mt-4 text-center">
                    The parallax angle is half the apparent shift in the star's position as Earth orbits the Sun
                </p>
            </div>

            {/* Show Calculus Button */}
            <button
                onClick={() => setShowCalculus(!showCalculus)}
                className="w-full bg-accent/20 hover:bg-accent/30 text-accent font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <Icon name="book" size={20} color="#F59E0B" />
                {showCalculus ? 'Hide' : 'Show'} Step-by-Step Calculus
            </button>

            {/* Calculus Explanation */}
            {showCalculus && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-accent/30"
                >
                    <h4 className="text-lg font-semibold mb-4 text-accent">The Mathematics</h4>
                    <div className="space-y-4 text-sm text-textSecondary">
                        <div>
                            <p className="font-semibold text-textPrimary mb-2">1. Basic Parallax Formula</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                d (parsecs) = 1 / p (arcseconds)
                            </div>
                            <p className="mt-2">
                                d = 1 / {parallaxArcsec.toFixed(3)} = <span className="text-primary font-semibold">{distanceParsecs.toFixed(2)} parsecs</span>
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">2. Trigonometric Derivation</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs mb-2">
                                tan(p) = (1 AU) / d
                            </div>
                            <p className="text-xs">
                                For small angles: tan(p) ≈ p (in radians)<br />
                                1 parsec is defined as the distance at which 1 AU subtends 1 arcsecond
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">3. Unit Conversions</p>
                            <div className="space-y-2">
                                <div className="bg-background/50 p-2 rounded-lg font-mono text-xs">
                                    1 parsec = 3.26 light-years = 206,265 AU
                                </div>
                                <p className="text-xs">
                                    • Parsecs: {distanceParsecs.toFixed(2)} pc<br />
                                    • Light-years: {distanceLightYears.toFixed(2)} ly<br />
                                    • AU: {distanceAU.toLocaleString()} AU
                                </p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                            <p className="text-primary font-semibold mb-2">💡 Historical Note</p>
                            <p className="text-xs">
                                Parallax was the first method to measure stellar distances. Friedrich Bessel measured the first stellar parallax
                                (61 Cygni) in 1838. Modern satellites like Gaia can measure parallaxes as small as 0.00002 arcseconds!
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ParallaxCalculator;
