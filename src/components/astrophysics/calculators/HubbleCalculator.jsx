import { useState } from 'react';
import { motion } from 'framer-motion';
import Plot from 'react-plotly.js';
import { CONSTANTS, calculations, convert, format } from '../../../utils/astrophysicsConstants';
import { Icon } from '../../icons';

const HubbleCalculator = () => {
    const [inputType, setInputType] = useState('distance'); // distance or velocity
    const [distance, setDistance] = useState(100); // Mpc
    const [velocity, setVelocity] = useState(7000); // km/s
    const [showCalculus, setShowCalculus] = useState(false);

    // Calculate the other parameter
    const calculatedVelocity = CONSTANTS.H0 * distance; // km/s
    const calculatedDistance = velocity / CONSTANTS.H0; // Mpc

    // Age of universe estimate: t = 1/H₀
    const H0_SI = (CONSTANTS.H0 * 1000) / CONSTANTS.Mpc; // Convert to SI units (1/s)
    const universeAge = 1 / H0_SI; // seconds
    const universeAgeYears = convert.secondsToYears(universeAge);

    // Generate Hubble diagram data
    const generateHubbleDiagram = () => {
        const distances = Array.from({ length: 20 }, (_, i) => i * 50); // 0 to 950 Mpc
        const velocities = distances.map(d => CONSTANTS.H0 * d);

        return { distances, velocities };
    };

    const { distances: plotDistances, velocities: plotVelocities } = generateHubbleDiagram();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h3 className="text-2xl font-heading font-bold text-gradient mb-2">
                    Hubble's Law Calculator
                </h3>
                <p className="text-textSecondary">
                    Calculate cosmic distances and velocities using the expanding universe
                </p>
            </div>

            {/* Input Type Selector */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-3">What do you want to calculate?</p>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setInputType('distance')}
                        className={`py-2 px-4 rounded-lg font-semibold transition-all ${inputType === 'distance'
                                ? 'bg-primary text-white'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                            }`}
                    >
                        Find Velocity<br />
                        <span className="text-xs opacity-75">(from distance)</span>
                    </button>
                    <button
                        onClick={() => setInputType('velocity')}
                        className={`py-2 px-4 rounded-lg font-semibold transition-all ${inputType === 'velocity'
                                ? 'bg-primary text-white'
                                : 'bg-surface/50 text-textSecondary hover:bg-surface'
                            }`}
                    >
                        Find Distance<br />
                        <span className="text-xs opacity-75">(from velocity)</span>
                    </button>
                </div>
            </div>

            {/* Input */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                {inputType === 'distance' ? (
                    <>
                        <label className="block text-lg font-semibold mb-3">
                            Distance (Megaparsecs)
                        </label>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary text-lg"
                            step="10"
                        />
                        <p className="text-sm text-textSecondary mt-2">
                            1 Mpc = 3.26 million light-years
                        </p>
                    </>
                ) : (
                    <>
                        <label className="block text-lg font-semibold mb-3">
                            Recession Velocity (km/s)
                        </label>
                        <input
                            type="number"
                            value={velocity}
                            onChange={(e) => setVelocity(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-background/50 border border-gray-600 rounded-lg text-textPrimary focus:outline-none focus:border-primary text-lg"
                            step="100"
                        />
                        <p className="text-sm text-textSecondary mt-2">
                            Positive = moving away (redshift)
                        </p>
                    </>
                )}
            </div>

            {/* Preset Examples */}
            <div className="bg-surface/50 rounded-xl p-4 border border-gray-700">
                <p className="text-sm font-semibold mb-2">Example Galaxies:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                        onClick={() => {
                            setInputType('distance');
                            setDistance(16);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Andromeda<br />
                        <span className="text-xs opacity-75">~16 Mpc</span>
                    </button>
                    <button
                        onClick={() => {
                            setInputType('distance');
                            setDistance(100);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Nearby Cluster<br />
                        <span className="text-xs opacity-75">~100 Mpc</span>
                    </button>
                    <button
                        onClick={() => {
                            setInputType('distance');
                            setDistance(500);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Distant Galaxy<br />
                        <span className="text-xs opacity-75">~500 Mpc</span>
                    </button>
                    <button
                        onClick={() => {
                            setInputType('distance');
                            setDistance(1000);
                        }}
                        className="px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm transition-colors"
                    >
                        Very Distant<br />
                        <span className="text-xs opacity-75">~1000 Mpc</span>
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className={`rounded-xl p-6 border ${inputType === 'distance' ? 'bg-surface/80 border-gray-700' : 'bg-accent/20 border-accent/30'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">
                        {inputType === 'distance' ? 'Input Distance' : 'Calculated Distance'}
                    </div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {inputType === 'distance' ? distance.toFixed(1) : calculatedDistance.toFixed(1)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        Megaparsecs (Mpc)<br />
                        {((inputType === 'distance' ? distance : calculatedDistance) * 3.26).toFixed(1)} million light-years
                    </div>
                </div>

                <div className={`rounded-xl p-6 border ${inputType === 'velocity' ? 'bg-surface/80 border-gray-700' : 'bg-accent/20 border-accent/30'
                    }`}>
                    <div className="text-sm text-textSecondary mb-1">
                        {inputType === 'velocity' ? 'Input Velocity' : 'Calculated Velocity'}
                    </div>
                    <div className="text-3xl font-bold text-textPrimary mb-2">
                        {inputType === 'velocity' ? velocity.toFixed(0) : calculatedVelocity.toFixed(0)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        km/s (recession velocity)<br />
                        {((inputType === 'velocity' ? velocity : calculatedVelocity) / CONSTANTS.c * 1000 * 100).toFixed(3)}% speed of light
                    </div>
                </div>
            </div>

            {/* Hubble Constant Display */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                <div className="text-center">
                    <div className="text-sm text-textSecondary mb-1">Hubble Constant (H₀)</div>
                    <div className="text-4xl font-bold text-primary mb-2">
                        {CONSTANTS.H0} km/s/Mpc
                    </div>
                    <div className="text-xs text-textSecondary">
                        Universe Age Estimate: ~{(universeAgeYears / 1e9).toFixed(1)} billion years
                    </div>
                </div>
            </div>

            {/* Hubble Diagram */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="target" size={20} color="#6B8DD6" />
                    Hubble Diagram
                </h4>
                <Plot
                    data={[
                        // Hubble's Law line
                        {
                            x: plotDistances,
                            y: plotVelocities,
                            type: 'scatter',
                            mode: 'lines',
                            line: { color: '#6B8DD6', width: 3 },
                            name: "Hubble's Law",
                        },
                        // Current point
                        {
                            x: [inputType === 'distance' ? distance : calculatedDistance],
                            y: [inputType === 'velocity' ? velocity : calculatedVelocity],
                            type: 'scatter',
                            mode: 'markers',
                            marker: { size: 15, color: '#F59E0B', symbol: 'star' },
                            name: 'Your Galaxy',
                        },
                    ]}
                    layout={{
                        title: '',
                        xaxis: {
                            title: 'Distance (Mpc)',
                            gridcolor: '#374151',
                            zerolinecolor: '#4B5563',
                        },
                        yaxis: {
                            title: 'Recession Velocity (km/s)',
                            gridcolor: '#374151',
                            zerolinecolor: '#4B5563',
                        },
                        plot_bgcolor: '#1F2937',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#F1F5F9', family: 'Inter' },
                        showlegend: true,
                        legend: {
                            x: 0,
                            y: 1,
                            bgcolor: 'rgba(31, 41, 55, 0.8)',
                            bordercolor: '#4B5563',
                            borderwidth: 1,
                        },
                        margin: { t: 20, b: 60, l: 60, r: 20 },
                    }}
                    config={{
                        displayModeBar: false,
                        responsive: true,
                    }}
                    style={{ width: '100%', height: '400px' }}
                />
                <p className="text-xs text-textSecondary mt-4 text-center">
                    The linear relationship shows the universe is expanding uniformly
                </p>
            </div>

            {/* Show Calculus Button */}
            <button
                onClick={() => setShowCalculus(!showCalculus)}
                className="w-full bg-accent/20 hover:bg-accent/30 text-accent font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <Icon name="book" size={20} color="#F59E0B" />
                {showCalculus ? 'Hide' : 'Show'} The Expanding Universe
            </button>

            {/* Calculus Explanation */}
            {showCalculus && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-accent/30"
                >
                    <h4 className="text-lg font-semibold mb-4 text-accent">Hubble's Law & Cosmic Expansion</h4>
                    <div className="space-y-4 text-sm text-textSecondary">
                        <div>
                            <p className="font-semibold text-textPrimary mb-2">1. Hubble's Law</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs">
                                v = H₀ × d
                            </div>
                            <p className="mt-2 text-xs">
                                Recession velocity is proportional to distance. This linear relationship proves the universe is expanding!
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">2. Your Calculation</p>
                            {inputType === 'distance' ? (
                                <div className="bg-background/50 p-3 rounded-lg text-xs">
                                    v = {CONSTANTS.H0} km/s/Mpc × {distance.toFixed(1)} Mpc = <span className="text-accent font-semibold">{calculatedVelocity.toFixed(0)} km/s</span>
                                </div>
                            ) : (
                                <div className="bg-background/50 p-3 rounded-lg text-xs">
                                    d = {velocity.toFixed(0)} km/s ÷ {CONSTANTS.H0} km/s/Mpc = <span className="text-accent font-semibold">{calculatedDistance.toFixed(1)} Mpc</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">3. Age of the Universe</p>
                            <div className="bg-background/50 p-3 rounded-lg font-mono text-xs mb-2">
                                t ≈ 1/H₀
                            </div>
                            <p className="text-xs">
                                If the expansion rate has been constant, the universe age is approximately:<br />
                                t = 1/H₀ ≈ <span className="text-primary font-semibold">{(universeAgeYears / 1e9).toFixed(1)} billion years</span>
                            </p>
                            <p className="text-xs mt-2 opacity-75">
                                (Actual age: ~13.8 billion years, accounting for changing expansion rate)
                            </p>
                        </div>

                        <div>
                            <p className="font-semibold text-textPrimary mb-2">4. Calculus Connection</p>
                            <div className="space-y-2 text-xs">
                                <p>The expansion can be described by the scale factor a(t):</p>
                                <div className="bg-background/50 p-2 rounded-lg font-mono">
                                    H(t) = (1/a) × da/dt
                                </div>
                                <p>The Hubble parameter is the derivative of the scale factor!</p>
                            </div>
                        </div>

                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                            <p className="text-primary font-semibold mb-2">💡 Discovery Story</p>
                            <p className="text-xs">
                                In 1929, Edwin Hubble discovered that galaxies are moving away from us, with farther galaxies moving faster.
                                This was the first evidence that the universe is expanding! Combined with Einstein's General Relativity,
                                this led to the Big Bang theory.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HubbleCalculator;
