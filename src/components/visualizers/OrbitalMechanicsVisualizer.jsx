import { useState } from 'react';
import Plot from 'react-plotly.js';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../../utils/animations';

const OrbitalMechanicsVisualizer = () => {
    const [orbitalRadius, setOrbitalRadius] = useState(7000); // km from Earth's center
    const [planetMass, setPlanetMass] = useState(5.972); // Earth masses (×10^24 kg)

    // Constants
    const G = 6.674e-11; // Gravitational constant (m³/kg·s²)
    const earthRadius = 6371; // km
    const earthMass = 5.972e24; // kg

    // Calculate orbital velocity: v = √(GM/r)
    const calculateOrbitalVelocity = (radius, mass) => {
        const r = radius * 1000; // Convert km to m
        const M = mass * 1e24; // Convert to kg
        const v = Math.sqrt((G * M) / r); // m/s
        return (v / 1000).toFixed(2); // Convert to km/s
    };

    // Calculate orbital period: T = 2π√(r³/GM)
    const calculateOrbitalPeriod = (radius, mass) => {
        const r = radius * 1000;
        const M = mass * 1e24;
        const T = 2 * Math.PI * Math.sqrt(Math.pow(r, 3) / (G * M));
        return (T / 60).toFixed(1); // Convert to minutes
    };

    const velocity = calculateOrbitalVelocity(orbitalRadius, planetMass);
    const period = calculateOrbitalPeriod(orbitalRadius, planetMass);
    const altitude = orbitalRadius - earthRadius;

    // Generate orbital path
    const theta = Array.from({ length: 100 }, (_, i) => (i / 100) * 2 * Math.PI);
    const xOrbit = theta.map(t => orbitalRadius * Math.cos(t));
    const yOrbit = theta.map(t => orbitalRadius * Math.sin(t));

    // Satellite position (at angle 45°)
    const satAngle = Math.PI / 4;
    const satX = orbitalRadius * Math.cos(satAngle);
    const satY = orbitalRadius * Math.sin(satAngle);

    // Velocity vector (tangent to orbit)
    const velocityScale = 1500; // Scale for visualization
    const vx = -Math.sin(satAngle) * velocityScale;
    const vy = Math.cos(satAngle) * velocityScale;

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
                    Orbital Mechanics Visualizer
                </h2>
                <p className="text-textSecondary">
                    Watch how orbital velocity changes with distance from the planet
                </p>
            </div>

            {/* Plotly Visualization */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <Plot
                    data={[
                        // Planet (Earth)
                        {
                            x: [0],
                            y: [0],
                            mode: 'markers',
                            marker: {
                                size: 40,
                                color: '#3B82F6',
                                line: { color: '#60A5FA', width: 2 },
                            },
                            name: 'Planet',
                            hovertemplate: 'Planet Center<extra></extra>',
                        },
                        // Planet surface
                        {
                            x: Array.from({ length: 100 }, (_, i) => earthRadius * Math.cos((i / 100) * 2 * Math.PI)),
                            y: Array.from({ length: 100 }, (_, i) => earthRadius * Math.sin((i / 100) * 2 * Math.PI)),
                            mode: 'lines',
                            line: { color: '#3B82F6', width: 2, dash: 'dot' },
                            name: 'Surface',
                            hovertemplate: 'Planet Surface<extra></extra>',
                        },
                        // Orbital path
                        {
                            x: xOrbit,
                            y: yOrbit,
                            mode: 'lines',
                            line: { color: '#10B981', width: 3 },
                            name: 'Orbit',
                            hovertemplate: 'Orbital Path<extra></extra>',
                        },
                        // Satellite
                        {
                            x: [satX],
                            y: [satY],
                            mode: 'markers',
                            marker: {
                                size: 15,
                                color: '#F59E0B',
                                symbol: 'diamond',
                            },
                            name: 'Satellite',
                            hovertemplate: `Velocity: ${velocity} km/s<extra></extra>`,
                        },
                        // Velocity vector
                        {
                            x: [satX, satX + vx],
                            y: [satY, satY + vy],
                            mode: 'lines+markers',
                            line: { color: '#EF4444', width: 3 },
                            marker: { size: 8, symbol: 'arrow', angleref: 'previous' },
                            name: 'Velocity',
                            hovertemplate: 'Velocity Vector<extra></extra>',
                        },
                    ]}
                    layout={{
                        title: '',
                        xaxis: {
                            title: 'Distance (km)',
                            range: [-orbitalRadius * 1.3, orbitalRadius * 1.3],
                            gridcolor: '#374151',
                            zerolinecolor: '#4B5563',
                        },
                        yaxis: {
                            title: 'Distance (km)',
                            range: [-orbitalRadius * 1.3, orbitalRadius * 1.3],
                            gridcolor: '#374151',
                            zerolinecolor: '#4B5563',
                            scaleanchor: 'x',
                        },
                        plot_bgcolor: '#1F2937',
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        font: { color: '#F1F5F9', family: 'Inter' },
                        showlegend: true,
                        legend: {
                            x: 1,
                            y: 1,
                            bgcolor: 'rgba(31, 41, 55, 0.8)',
                            bordercolor: '#4B5563',
                            borderwidth: 1,
                        },
                        hovermode: 'closest',
                        margin: { t: 20, b: 60, l: 60, r: 20 },
                    }}
                    config={{
                        displayModeBar: false,
                        responsive: true,
                    }}
                    style={{ width: '100%', height: '500px' }}
                />
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Orbital Radius Control */}
                <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Orbital Radius: {orbitalRadius.toLocaleString()} km
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        Altitude: {altitude.toLocaleString()} km above surface
                    </p>
                    <input
                        type="range"
                        min={earthRadius + 200}
                        max={50000}
                        step={100}
                        value={orbitalRadius}
                        onChange={(e) => setOrbitalRadius(Number(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>Low Orbit</span>
                        <span>High Orbit</span>
                    </div>
                </div>

                {/* Planet Mass Control */}
                <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Planet Mass: {planetMass.toFixed(2)} × 10²⁴ kg
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        {planetMass === 5.972 ? 'Earth' : planetMass > 5.972 ? 'Super-Earth' : 'Sub-Earth'}
                    </p>
                    <input
                        type="range"
                        min={1}
                        max={15}
                        step={0.1}
                        value={planetMass}
                        onChange={(e) => setPlanetMass(Number(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>Light Planet</span>
                        <span>Heavy Planet</span>
                    </div>
                </div>
            </div>

            {/* Results Display */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Orbital Velocity</div>
                    <div className="text-3xl font-bold text-primary">{velocity} km/s</div>
                    <div className="text-xs text-textSecondary mt-2">
                        {(velocity * 3600).toFixed(0)} km/h
                    </div>
                </div>
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Orbital Period</div>
                    <div className="text-3xl font-bold text-secondary">{period} min</div>
                    <div className="text-xs text-textSecondary mt-2">
                        {(period / 60).toFixed(2)} hours
                    </div>
                </div>
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Formula Used</div>
                    <div className="text-xl font-mono text-accent">v = √(GM/r)</div>
                    <div className="text-xs text-textSecondary mt-2">
                        Derivative of position
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
                        <strong className="text-primary">Derivatives in Action:</strong> The orbital velocity is found by taking the derivative of the position with respect to time.
                    </p>
                    <p>
                        <strong className="text-secondary">The Formula:</strong> v = √(GM/r) where G is the gravitational constant, M is the planet's mass, and r is the orbital radius.
                    </p>
                    <p>
                        <strong className="text-accent">Real Example:</strong> The ISS orbits at ~400 km altitude and travels at 7.66 km/s, completing one orbit every 90 minutes!
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default OrbitalMechanicsVisualizer;
