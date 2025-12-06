import { useState } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../../utils/animations';

const EscapeVelocityVisualizer = () => {
    const [selectedPlanet, setSelectedPlanet] = useState('earth');
    const [launchVelocity, setLaunchVelocity] = useState(11.2); // km/s

    // Planet data
    const planets = {
        earth: {
            name: 'Earth',
            mass: 5.972e24, // kg
            radius: 6371, // km
            color: '#3B82F6',
            escapeVelocity: 11.2, // km/s
        },
        moon: {
            name: 'Moon',
            mass: 7.342e22,
            radius: 1737,
            color: '#9CA3AF',
            escapeVelocity: 2.4,
        },
        mars: {
            name: 'Mars',
            mass: 6.417e23,
            radius: 3390,
            color: '#EF4444',
            escapeVelocity: 5.0,
        },
        jupiter: {
            name: 'Jupiter',
            mass: 1.898e27,
            radius: 69911,
            color: '#F59E0B',
            escapeVelocity: 59.5,
        },
    };

    const planet = planets[selectedPlanet];
    const G = 6.674e-11; // Gravitational constant

    // Calculate escape velocity: v_esc = √(2GM/r)
    const calculateEscapeVelocity = (mass, radius) => {
        const r = radius * 1000; // Convert to meters
        const v = Math.sqrt((2 * G * mass) / r);
        return (v / 1000).toFixed(2); // Convert to km/s
    };

    const escapeVel = parseFloat(calculateEscapeVelocity(planet.mass, planet.radius));
    const willEscape = launchVelocity >= escapeVel;

    // Calculate maximum height for sub-escape velocity
    const calculateMaxHeight = (v0, mass, radius) => {
        if (v0 >= escapeVel) return Infinity;
        const v = v0 * 1000; // m/s
        const r = radius * 1000; // m
        // Energy conservation: (1/2)mv² - GMm/r = -GMm/r_max
        // Solving for r_max: r_max = 1 / (2GM/v²r - 1/r)
        const rMax = 1 / ((2 * G * mass) / (v * v * r) - 1 / r);
        return ((rMax - r) / 1000).toFixed(0); // Convert to km
    };

    const maxHeight = calculateMaxHeight(launchVelocity, planet.mass, planet.radius);

    // Generate trajectory
    const generateTrajectory = () => {
        const points = 100;
        const maxTime = willEscape ? 50 : 30;
        const time = Array.from({ length: points }, (_, i) => (i / points) * maxTime);

        const heights = time.map(t => {
            const v0 = launchVelocity * 1000; // m/s
            const r0 = planet.radius * 1000; // m
            const g0 = (G * planet.mass) / (r0 * r0); // Surface gravity

            // Simplified trajectory (assuming constant g for visualization)
            let h = v0 * t - 0.5 * g0 * t * t;

            if (!willEscape && h < 0) h = 0;
            if (!willEscape && h > parseFloat(maxHeight) * 1000) h = parseFloat(maxHeight) * 1000;

            return h / 1000; // Convert to km
        });

        return { time, heights };
    };

    const trajectory = generateTrajectory();

    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
        >
            {/* Title */}
            <div className="text-center">
                <h2 className="text-3xl font-heading font-bold text-gradient mb-2">
                    Escape Velocity Calculator
                </h2>
                <p className="text-textSecondary">
                    Calculate the minimum speed needed to escape a planet's gravitational pull
                </p>
            </div>

            {/* Planet Selector */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <label className="block text-lg font-semibold mb-4">Select Planet</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(planets).map(([key, p]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setSelectedPlanet(key);
                                setLaunchVelocity(p.escapeVelocity);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedPlanet === key
                                    ? 'border-primary bg-primary/20 scale-105'
                                    : 'border-gray-600 bg-surface/50 hover:border-gray-500'
                                }`}
                        >
                            <div className="text-2xl mb-2">{key === 'earth' ? '🌍' : key === 'moon' ? '🌙' : key === 'mars' ? '🔴' : '🪐'}</div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-xs text-textSecondary mt-1">
                                {p.escapeVelocity} km/s
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Trajectory Visualization */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <Plot
                    data={[
                        {
                            x: trajectory.time,
                            y: trajectory.heights,
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: willEscape ? '#10B981' : '#EF4444',
                                width: 3,
                            },
                            fill: 'tozeroy',
                            fillcolor: willEscape ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            name: 'Rocket Trajectory',
                        },
                        // Escape threshold line
                        !willEscape && maxHeight !== 'Infinity' ? {
                            x: [0, Math.max(...trajectory.time)],
                            y: [parseFloat(maxHeight), parseFloat(maxHeight)],
                            type: 'scatter',
                            mode: 'lines',
                            line: {
                                color: '#F59E0B',
                                width: 2,
                                dash: 'dash',
                            },
                            name: 'Maximum Height',
                        } : {},
                    ]}
                    layout={{
                        title: willEscape ? '🚀 Rocket Escapes!' : '⬇️ Rocket Falls Back',
                        xaxis: {
                            title: 'Time (seconds)',
                            gridcolor: '#374151',
                            zerolinecolor: '#4B5563',
                        },
                        yaxis: {
                            title: 'Height Above Surface (km)',
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
                        margin: { t: 60, b: 60, l: 60, r: 20 },
                    }}
                    config={{
                        displayModeBar: false,
                        responsive: true,
                    }}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>

            {/* Launch Velocity Control */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <label className="block text-lg font-semibold mb-3">
                    Launch Velocity: {launchVelocity.toFixed(1)} km/s
                </label>
                <p className="text-sm text-textSecondary mb-3">
                    {willEscape ? '✅ Sufficient to escape!' : '❌ Too slow - will fall back'}
                </p>
                <input
                    type="range"
                    min={0}
                    max={planet.escapeVelocity * 2}
                    step={0.1}
                    value={launchVelocity}
                    onChange={(e) => setLaunchVelocity(Number(e.target.value))}
                    className="w-full slider"
                />
                <div className="flex justify-between text-xs text-textSecondary mt-2">
                    <span>0 km/s</span>
                    <span className="text-accent">Escape: {escapeVel} km/s</span>
                    <span>{(planet.escapeVelocity * 2).toFixed(1)} km/s</span>
                </div>
            </div>

            {/* Results Display */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Escape Velocity</div>
                    <div className="text-3xl font-bold text-primary">{escapeVel} km/s</div>
                    <div className="text-xs text-textSecondary mt-2">
                        {(escapeVel * 3600).toFixed(0)} km/h
                    </div>
                </div>
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Launch Velocity</div>
                    <div className="text-3xl font-bold text-secondary">{launchVelocity.toFixed(1)} km/s</div>
                    <div className="text-xs text-textSecondary mt-2">
                        {willEscape ? 'Will escape' : 'Will return'}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">
                        {willEscape ? 'Status' : 'Max Height'}
                    </div>
                    <div className="text-3xl font-bold text-accent">
                        {willEscape ? '∞' : `${maxHeight} km`}
                    </div>
                    <div className="text-xs text-textSecondary mt-2">
                        {willEscape ? 'Escapes to infinity' : 'Then falls back'}
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-heading font-bold mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    How It Works
                </h3>
                <div className="space-y-2 text-textSecondary">
                    <p>
                        <strong className="text-primary">Integration in Action:</strong> We integrate the gravitational force over distance to find the total work needed to escape.
                    </p>
                    <p>
                        <strong className="text-secondary">The Formula:</strong> v_escape = √(2GM/r) where G is the gravitational constant, M is the planet's mass, and r is the radius.
                    </p>
                    <p>
                        <strong className="text-accent">Energy Conservation:</strong> At escape velocity, kinetic energy exactly equals the gravitational potential energy needed to reach infinity!
                    </p>
                    <p className="text-xs mt-4 pt-4 border-t border-gray-700">
                        <strong>Fun Fact:</strong> The escape velocity from the Sun's surface is 618 km/s, and from a black hole's event horizon, it exceeds the speed of light!
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default EscapeVelocityVisualizer;
