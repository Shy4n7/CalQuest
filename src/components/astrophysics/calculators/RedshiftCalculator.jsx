import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONSTANTS, calculations, convert, format } from '../../../utils/astrophysicsConstants';
import { Icon } from '../../icons';

const RedshiftCalculator = () => {
    const [observedWavelength, setObservedWavelength] = useState(656.3); // H-alpha line redshifted
    const [emittedWavelength, setEmittedWavelength] = useState(656.3); // H-alpha line at rest
    const [showCalculus, setShowCalculus] = useState(false);

    // Calculate redshift
    const z = calculations.redshift(observedWavelength, emittedWavelength);
    const velocity = calculations.velocityFromRedshift(z);
    const distance = calculations.hubbleDistance(velocity);

    // Determine if object is moving toward or away
    const isReceding = z > 0;
    const isApproaching = z < 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-heading font-bold text-gradient mb-2">
                    Redshift Calculator
                </h3>
                <p className="text-textSecondary">
                    Calculate cosmic redshift, velocity, and distance from wavelength measurements
                </p>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                    <label className="block text-sm font-semibold mb-2">
                        Observed Wavelength (nm)
                    </label>
                    <input
                        type="number"
                        value={observedWavelength}
                        onChange={(e) => setObservedWavelength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary"
                        step="0.1"
                    />
                    <p className="text-xs text-textSecondary mt-2">
                        Wavelength measured from Earth
                    </p>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                    <label className="block text-sm font-semibold mb-2">
                        Emitted Wavelength (nm)
                    </label>
                    <input
                        type="number"
                        value={emittedWavelength}
                        onChange={(e) => setEmittedWavelength(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary"
                        step="0.1"
                    />
                    <p className="text-xs text-textSecondary mt-2">
                        Rest wavelength (lab value)
                    </p>
                </div>
            </div>

            {/* Preset Examples */}
            <div className="bg-surface/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-2">Quick Presets:</p>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => {
                            setEmittedWavelength(656.3);
                            setObservedWavelength(656.3);
                        }}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        No Shift (z=0)
                    </button>
                    <button
                        onClick={() => {
                            setEmittedWavelength(656.3);
                            setObservedWavelength(659.8);
                        }}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Nearby Galaxy (z≈0.005)
                    </button>
                    <button
                        onClick={() => {
                            setEmittedWavelength(656.3);
                            setObservedWavelength(984.5);
                        }}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Distant Galaxy (z=0.5)
                    </button>
                    <button
                        onClick={() => {
                            setEmittedWavelength(656.3);
                            setObservedWavelength(1968.9);
                        }}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Very Distant (z=2)
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className={`rounded-xl p-6 border ${isReceding ? 'bg-error/10 border-error/30' : isApproaching ? 'bg-primary/10 border-primary/30' : 'bg-surface/80 border-gray-700'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">Redshift (z)</div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {z.toFixed(4)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        {isReceding ? 'Receding' : isApproaching ? 'Approaching' : 'No motion'}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Velocity</div>
                    <div className="text-3xl font-bold text-secondary mb-2">
                        {format.velocity(velocity)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        {convert.msToKms(velocity).toFixed(0)} km/s
                    </div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Distance</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        {format.distance(distance)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        {(convert.metersToLightYears(distance) / 1e6).toFixed(2)} Mly
                    </div>
                </div>
            </div>

            {/* Visual Representation */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="lightbulb" size={20} color="#E8A87C" />
                    Wavelength Shift Visualization
                </h4>
                <div className="space-y-4">
                    {/* Emitted wavelength */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-textSecondary">Emitted (Rest)</span>
                            <span className="text-primary font-mono">{emittedWavelength.toFixed(1)} nm</span>
                        </div>
                        <div className="h-8 rounded-lg" style={{
                            background: `linear-gradient(to right, hsl(${(700 - emittedWavelength) / 1.5}, 100%, 50%), hsl(${(700 - emittedWavelength) / 1.5}, 100%, 70%))`
                        }} />
                    </div>

                    {/* Observed wavelength */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-textSecondary">Observed</span>
                            <span className="text-error font-mono">{observedWavelength.toFixed(1)} nm</span>
                        </div>
                        <div className="h-8 rounded-lg" style={{
                            background: `linear-gradient(to right, hsl(${(700 - observedWavelength) / 1.5}, 100%, 50%), hsl(${(700 - observedWavelength) / 1.5}, 100%, 70%))`
                        }} />
                    </div>

                    {/* Shift indicator */}
                    {z !== 0 && (
                        <div className="flex items-center justify-center gap-2 text-sm">
                            {isReceding && (
                                <>
                                    <span className="text-textSecondary">Shifted toward</span>
                                    <span className="text-error font-semibold">RED (longer wavelength)</span>
                                    <span className="text-2xl">→</span>
                                </>
                            )}
                            {isApproaching && (
                                <>
                                    <span className="text-2xl">←</span>
                                    <span className="text-textSecondary">Shifted toward</span>
                                    <span className="text-primary font-semibold">BLUE (shorter wavelength)</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
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
                            <p className="font-semibold text-textPrimary mb-2">1. Redshift Formula</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                z = (λ_observed - λ_emitted) / λ_emitted
                            </div>
                            <p className="mt-2">
                                z = ({observedWavelength.toFixed(1)} - {emittedWavelength.toFixed(1)}) / {emittedWavelength.toFixed(1)} = <span className="text-primary font-semibold">{z.toFixed(4)}</span>
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">2. Velocity Calculation</p>
                            {z < 0.1 ? (
                                <>
                                    <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                        v = c × z (non-relativistic approximation)
                                    </div>
                                    <p className="mt-2">
                                        v = {CONSTANTS.c.toExponential(2)} m/s × {z.toFixed(4)} = <span className="text-secondary font-semibold">{format.velocity(velocity)}</span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                        v = c × [(1+z)² - 1] / [(1+z)² + 1] (relativistic)
                                    </div>
                                    <p className="mt-2">
                                        Using relativistic formula: <span className="text-secondary font-semibold">{format.velocity(velocity)}</span>
                                    </p>
                                </>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">3. Distance via Hubble's Law</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                d = v / H₀ (where H₀ ≈ 70 km/s/Mpc)
                            </div>
                            <p className="mt-2">
                                d = {convert.msToKms(velocity).toFixed(0)} km/s / 70 km/s/Mpc = <span className="text-accent font-semibold">{format.distance(distance)}</span>
                            </p>
                        </div>

                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                            <p className="text-primary font-semibold mb-2">Real-World Application</p>
                            <p className="text-xs">
                                Astronomers use redshift to measure distances to galaxies and determine the expansion rate of the universe.
                                The Doppler effect (same principle as sirens changing pitch) causes light to shift toward red as objects move away.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default RedshiftCalculator;
