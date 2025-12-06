import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONSTANTS, calculations, convert, format } from '../../../utils/astrophysicsConstants';
import { Icon } from '../../icons';

const KeplerSolver = () => {
    const [inputMode, setInputMode] = useState('period-axis'); // period-axis, period-mass, axis-mass
    const [period, setPeriod] = useState(365.25); // Earth's orbital period in days
    const [semiMajorAxis, setSemiMajorAxis] = useState(1); // in AU
    const [centralMass, setCentralMass] = useState(1); // in solar masses
    const [showCalculus, setShowCalculus] = useState(false);

    // Convert inputs to SI units
    const periodSeconds = convert.daysToSeconds(period);
    const axisMeters = convert.AUtoMeters(semiMajorAxis);
    const massKg = convert.solarMassToKg(centralMass);

    // Calculate the third parameter based on input mode
    let calculatedPeriod, calculatedAxis, calculatedMass;

    if (inputMode === 'period-axis') {
        // Calculate mass from period and semi-major axis
        calculatedMass = (4 * Math.PI ** 2 * axisMeters ** 3) / (CONSTANTS.G * periodSeconds ** 2);
    } else if (inputMode === 'period-mass') {
        // Calculate semi-major axis from period and mass
        calculatedAxis = calculations.keplerSemiMajorAxisFromPeriod(massKg, periodSeconds);
    } else {
        // Calculate period from semi-major axis and mass
        calculatedPeriod = calculations.keplerPeriodFromSemiMajorAxis(massKg, axisMeters);
    }

    // Calculate orbital velocity and energy
    const orbitalVelocity = calculations.orbitalVelocity(massKg, axisMeters);
    const orbitalEnergy = -CONSTANTS.G * massKg / (2 * axisMeters); // Specific orbital energy

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-heading font-bold text-gradient mb-2">
                    Kepler's Laws Solver
                </h3>
                <p className="text-textSecondary">
                    Solve for orbital parameters using Kepler's Third Law
                </p>
            </div>

            {/* Input Mode Selector */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-3">What do you know?</p>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => setInputMode('period-axis')}
                        className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${inputMode === 'period-axis'
                                ? 'bg-primary text-white'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                            }`}
                    >
                        Period + Axis<br />
                        <span className="text-xs opacity-75">Find Mass</span>
                    </button>
                    <button
                        onClick={() => setInputMode('period-mass')}
                        className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${inputMode === 'period-mass'
                                ? 'bg-primary text-white'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                            }`}
                    >
                        Period + Mass<br />
                        <span className="text-xs opacity-75">Find Axis</span>
                    </button>
                    <button
                        onClick={() => setInputMode('axis-mass')}
                        className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${inputMode === 'axis-mass'
                                ? 'bg-primary text-white'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                            }`}
                    >
                        Axis + Mass<br />
                        <span className="text-xs opacity-75">Find Period</span>
                    </button>
                </div>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
                {/* Period Input */}
                {(inputMode === 'period-axis' || inputMode === 'period-mass') && (
                    <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                        <label className="block text-sm font-semibold mb-2">
                            Orbital Period (days)
                        </label>
                        <input
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary"
                            step="0.1"
                        />
                    </div>
                )}

                {/* Semi-major Axis Input */}
                {(inputMode === 'period-axis' || inputMode === 'axis-mass') && (
                    <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                        <label className="block text-sm font-semibold mb-2">
                            Semi-major Axis (AU)
                        </label>
                        <input
                            type="number"
                            value={semiMajorAxis}
                            onChange={(e) => setSemiMajorAxis(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary"
                            step="0.1"
                        />
                    </div>
                )}

                {/* Central Mass Input */}
                {(inputMode === 'period-mass' || inputMode === 'axis-mass') && (
                    <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                        <label className="block text-sm font-semibold mb-2">
                            Central Mass (solar masses)
                        </label>
                        <input
                            type="number"
                            value={centralMass}
                            onChange={(e) => setCentralMass(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-2 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary"
                            step="0.1"
                        />
                    </div>
                )}
            </div>

            {/* Preset Examples */}
            <div className="bg-surface/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-2">Solar System Examples:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                        onClick={() => {
                            setPeriod(365.25);
                            setSemiMajorAxis(1);
                            setCentralMass(1);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Earth
                    </button>
                    <button
                        onClick={() => {
                            setPeriod(687);
                            setSemiMajorAxis(1.52);
                            setCentralMass(1);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Mars
                    </button>
                    <button
                        onClick={() => {
                            setPeriod(4333);
                            setSemiMajorAxis(5.2);
                            setCentralMass(1);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Jupiter
                    </button>
                    <button
                        onClick={() => {
                            setPeriod(90560);
                            setSemiMajorAxis(30.07);
                            setCentralMass(1);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Neptune
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className={`rounded-xl p-6 border ${inputMode === 'period-axis' ? 'bg-accent/20 border-accent/30' : 'bg-surface/80 border-gray-700'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">
                        {inputMode === 'period-axis' ? 'Calculated Mass' : 'Central Mass'}
                    </div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {inputMode === 'period-axis'
                            ? convert.kgToSolarMass(calculatedMass).toFixed(2)
                            : centralMass.toFixed(2)
                        }
                    </div>
                    <div className="text-xs text-textSecondary">solar masses (M☉)</div>
                </div>

                <div className={`rounded-xl p-6 border ${inputMode === 'period-mass' ? 'bg-accent/20 border-accent/30' : 'bg-surface/80 border-gray-700'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">
                        {inputMode === 'period-mass' ? 'Calculated Axis' : 'Semi-major Axis'}
                    </div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {inputMode === 'period-mass'
                            ? convert.metersToAU(calculatedAxis).toFixed(2)
                            : semiMajorAxis.toFixed(2)
                        }
                    </div>
                    <div className="text-xs text-textSecondary">AU</div>
                </div>

                <div className={`rounded-xl p-6 border ${inputMode === 'axis-mass' ? 'bg-accent/20 border-accent/30' : 'bg-surface/80 border-gray-700'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">
                        {inputMode === 'axis-mass' ? 'Calculated Period' : 'Orbital Period'}
                    </div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {inputMode === 'axis-mass'
                            ? convert.secondsToDays(calculatedPeriod).toFixed(1)
                            : period.toFixed(1)
                        }
                    </div>
                    <div className="text-xs text-textSecondary">days</div>
                </div>
            </div>

            {/* Additional Orbital Properties */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Orbital Velocity</div>
                    <div className="text-2xl font-bold text-secondary mb-2">
                        {format.velocity(orbitalVelocity)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        {convert.msToKms(orbitalVelocity).toFixed(2)} km/s
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Specific Orbital Energy</div>
                    <div className="text-2xl font-bold text-primary mb-2">
                        {format.scientific(orbitalEnergy)}
                    </div>
                    <div className="text-xs text-textSecondary">J/kg (negative = bound orbit)</div>
                </div>
            </div>

            {/* Show Calculus Button */}
            <button
                onClick={() => setShowCalculus(!showCalculus)}
                className="w-full bg-accent/20 hover:bg-accent/30 text-accent font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <Icon name="book" size={20} color="#F59E0B" />
                {showCalculus ? 'Hide' : 'Show'} Kepler's Third Law Derivation
            </button>

            {/* Calculus Explanation */}
            {showCalculus && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-accent/30"
                >
                    <h4 className="text-lg font-semibold mb-4 text-accent">Kepler's Third Law Derivation</h4>
                    <div className="space-y-4 text-sm text-textSecondary">
                        <div>
                            <p className="font-semibold text-textPrimary mb-2">1. Kepler's Third Law</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                T² = (4π²/GM) × a³
                            </div>
                            <p className="mt-2 text-xs">
                                The square of the orbital period is proportional to the cube of the semi-major axis
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">2. Derivation from Newton's Laws</p>
                            <div className="space-y-2 text-xs">
                                <p>For circular orbits, gravitational force = centripetal force:</p>
                                <div className="bg-background/50 p-2 rounded-lg font-mono">
                                    GMm/r² = mv²/r
                                </div>
                                <p>Orbital velocity v = 2πr/T, so:</p>
                                <div className="bg-background/50 p-2 rounded-lg font-mono">
                                    GM/r = 4π²r²/T²
                                </div>
                                <p>Rearranging:</p>
                                <div className="bg-background/50 p-2 rounded-lg font-mono">
                                    T² = (4π²/GM) × r³
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">3. Your Calculation</p>
                            <div className="bg-background/50 p-3 rounded-lg text-xs space-y-1">
                                <p>Period: {period.toFixed(1)} days = {format.scientific(periodSeconds)} seconds</p>
                                <p>Semi-major axis: {semiMajorAxis.toFixed(2)} AU = {format.scientific(axisMeters)} meters</p>
                                <p>Central mass: {centralMass.toFixed(2)} M☉ = {format.scientific(massKg)} kg</p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                            <p className="text-primary font-semibold mb-2">💡 Historical Context</p>
                            <p className="text-xs">
                                Johannes Kepler discovered this law empirically in 1619 by analyzing Tycho Brahe's observations.
                                Newton later derived it from his law of universal gravitation using calculus, proving that Kepler's
                                laws are consequences of inverse-square gravity!
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default KeplerSolver;
