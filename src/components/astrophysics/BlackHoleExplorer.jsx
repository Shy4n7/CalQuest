import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { CONSTANTS, calculations, convert, format } from '../../utils/astrophysicsConstants';
import { Icon } from '../icons';

// Simple Accretion Disk with particles
function AccretionDisk({ innerRadius, outerRadius }) {
    const diskRef = useRef();
    const particlesRef = useRef();

    const particles = useMemo(() => {
        const positions = [];
        const colors = [];
        const particleCount = 300; // Optimized count

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = (Math.random() - 0.5) * 0.3;

            positions.push(x, y, z);

            // Color based on temperature (inner = hotter = bluer)
            const temp = 1 - (radius - innerRadius) / (outerRadius - innerRadius);
            colors.push(
                0.8 + temp * 0.2,  // R
                0.4 + temp * 0.3,  // G
                0.2 + temp * 0.6   // B
            );
        }

        return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
    }, [innerRadius, outerRadius]);

    useFrame(() => {
        if (diskRef.current) {
            diskRef.current.rotation.z += 0.002;
        }

        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const angle = Math.atan2(y, x);
                const radius = Math.sqrt(x * x + y * y);

                const angularVelocity = 0.008 / Math.sqrt(radius);
                const newAngle = angle + angularVelocity;

                positions[i] = Math.cos(newAngle) * radius;
                positions[i + 1] = Math.sin(newAngle) * radius;
            }

            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <group ref={diskRef}>
            <Ring args={[innerRadius, outerRadius, 64]}>
                <meshStandardMaterial
                    color="#F59E0B"
                    emissive="#EF4444"
                    emissiveIntensity={0.5}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.3}
                />
            </Ring>

            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.positions.length / 3}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particles.colors.length / 3}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    vertexColors
                    transparent
                    opacity={0.8}
                />
            </points>
        </group>
    );
}

// Event Horizon
function EventHorizon({ radius }) {
    const sphereRef = useRef();

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y += 0.001;
        }
    });

    return (
        <Sphere ref={sphereRef} args={[radius, 32, 32]}>
            <meshStandardMaterial
                color="#000000"
                emissive="#1F2937"
                emissiveIntensity={0.3}
                roughness={0.1}
                metalness={1}
            />
        </Sphere>
    );
}

// Photon Sphere
function PhotonSphere({ radius }) {
    return (
        <Sphere args={[radius, 32, 32]}>
            <meshBasicMaterial
                color="#6B8DD6"
                transparent
                opacity={0.15}
                wireframe
            />
        </Sphere>
    );
}

const BlackHoleExplorer = ({ onNavigate }) => {
    const [mass, setMass] = useState(10); // Solar masses
    const [showPhotonSphere, setShowPhotonSphere] = useState(true);
    const [showAccretionDisk, setShowAccretionDisk] = useState(true);
    const [showCalculus, setShowCalculus] = useState(false);

    // Calculate black hole properties
    const massKg = convert.solarMassToKg(mass);
    const schwarzschildRadius = calculations.schwarzschildRadius(massKg);
    const photonSphereRadius = 1.5 * schwarzschildRadius;
    const innerStableOrbit = 3 * schwarzschildRadius;

    // Calculate time dilation
    const timeDilationAt2Rs = calculations.timeDilation(massKg, 2 * schwarzschildRadius);
    const timeDilationAt10Rs = calculations.timeDilation(massKg, 10 * schwarzschildRadius);

    // Hawking temperature
    const hawkingTemp = (CONSTANTS.h * CONSTANTS.c ** 3) / (8 * Math.PI * CONSTANTS.G * massKg * CONSTANTS.k);

    const visualScale = 1;

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => onNavigate('astrophysics-hub')}
                    className="flex items-center space-x-2 text-textSecondary hover:text-textPrimary transition-colors"
                >
                    <span>←</span>
                    <span>Back to Hub</span>
                </button>
                <div className="text-center flex-1">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                        Black Hole Explorer
                    </h1>
                    <p className="text-textSecondary">
                        Event horizons, photon spheres, and extreme gravity
                    </p>
                </div>
                <div className="w-24" />
            </div>

            {/* 3D Canvas */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <div className="h-[600px] bg-black rounded-xl overflow-hidden relative">
                    <Canvas camera={{ position: [15, 10, 15], fov: 50 }}>
                        <ambientLight intensity={0.3} />
                        <pointLight position={[50, 50, 50]} intensity={1} color="#F59E0B" />
                        <pointLight position={[-50, -50, -50]} intensity={0.5} color="#6B8DD6" />

                        {/* Event Horizon */}
                        <EventHorizon radius={visualScale} />

                        {/* Photon Sphere */}
                        {showPhotonSphere && (
                            <PhotonSphere radius={visualScale * 1.5} />
                        )}

                        {/* Accretion Disk */}
                        {showAccretionDisk && (
                            <AccretionDisk
                                innerRadius={visualScale * 3}
                                outerRadius={visualScale * 8}
                            />
                        )}

                        {/* ISCO */}
                        <Sphere args={[visualScale * 3, 32, 32]}>
                            <meshBasicMaterial
                                color="#10B981"
                                transparent
                                opacity={0.05}
                                wireframe
                            />
                        </Sphere>

                        <OrbitControls
                            enableDamping
                            dampingFactor={0.05}
                            minDistance={2}
                            maxDistance={30}
                        />
                    </Canvas>

                    {/* Legend */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-sm space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-black border border-gray-600 rounded"></div>
                            <span>Event Horizon ({(schwarzschildRadius / 1000).toFixed(1)} km)</span>
                        </div>
                        {showPhotonSphere && (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-primary rounded"></div>
                                <span className="text-primary">Photon Sphere (1.5 R_s)</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-success rounded"></div>
                            <span className="text-success">ISCO (3 R_s)</span>
                        </div>
                        {showAccretionDisk && (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gradient-to-r from-accent to-error rounded"></div>
                                <span className="text-accent">Accretion Disk</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-textSecondary">
                    <p>Click and drag to rotate • Scroll to zoom • Right-click to pan</p>
                </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Black Hole Mass: {mass.toFixed(1)} M☉
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        {mass < 3 ? 'Below stellar limit' : mass < 20 ? 'Stellar mass' : mass < 100 ? 'Intermediate mass' : 'Supermassive'}
                    </p>
                    <input
                        type="range"
                        min={1}
                        max={1000}
                        step={0.5}
                        value={mass}
                        onChange={(e) => setMass(parseFloat(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>1 M☉</span>
                        <span>Sun: 1</span>
                        <span>1000 M☉</span>
                    </div>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Photon Sphere
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        Unstable orbit for light rays
                    </p>
                    <button
                        onClick={() => setShowPhotonSphere(!showPhotonSphere)}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${showPhotonSphere
                            ? 'bg-primary/20 text-primary border-2 border-primary'
                            : 'bg-surface/50 text-textSecondary border-2 border-gray-600 hover:border-gray-500'
                            }`}
                    >
                        {showPhotonSphere ? 'Hide' : 'Show'} Photon Sphere
                    </button>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Accretion Disk
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        Superheated matter spiraling in
                    </p>
                    <button
                        onClick={() => setShowAccretionDisk(!showAccretionDisk)}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${showAccretionDisk
                            ? 'bg-accent/20 text-accent border-2 border-accent'
                            : 'bg-surface/50 text-textSecondary border-2 border-gray-600 hover:border-gray-500'
                            }`}
                    >
                        {showAccretionDisk ? 'Hide' : 'Show'} Accretion Disk
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Schwarzschild Radius</div>
                    <div className="text-2xl font-bold text-primary mb-2">
                        {(schwarzschildRadius / 1000).toFixed(2)} km
                    </div>
                    <div className="text-xs text-textSecondary">Event horizon size</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Photon Sphere</div>
                    <div className="text-2xl font-bold text-secondary mb-2">
                        {(photonSphereRadius / 1000).toFixed(2)} km
                    </div>
                    <div className="text-xs text-textSecondary">1.5 × R_s</div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">ISCO</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        {(innerStableOrbit / 1000).toFixed(2)} km
                    </div>
                    <div className="text-xs text-textSecondary">Innermost stable orbit</div>
                </div>

                <div className="bg-gradient-to-br from-success/20 to-success/5 rounded-xl p-6 border border-success/30">
                    <div className="text-sm text-textSecondary mb-1">Hawking Temperature</div>
                    <div className="text-xl font-bold text-success mb-2">
                        {format.scientific(hawkingTemp)} K
                    </div>
                    <div className="text-xs text-textSecondary">Thermal radiation</div>
                </div>
            </div>

            {/* Time Dilation */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon name="derivative" size={24} color="#6B8DD6" />
                    Time Dilation Effects
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4">
                        <div className="text-sm text-textSecondary mb-2">At 2 R_s (close approach)</div>
                        <div className="text-3xl font-bold text-primary mb-1">
                            {timeDilationAt2Rs.toFixed(3)}×
                        </div>
                        <div className="text-xs text-textSecondary">
                            Time runs {(timeDilationAt2Rs * 100).toFixed(1)}% of normal rate
                        </div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                        <div className="text-sm text-textSecondary mb-2">At 10 R_s (safe distance)</div>
                        <div className="text-3xl font-bold text-secondary mb-1">
                            {timeDilationAt10Rs.toFixed(3)}×
                        </div>
                        <div className="text-xs text-textSecondary">
                            Time runs {(timeDilationAt10Rs * 100).toFixed(1)}% of normal rate
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlackHoleExplorer;
