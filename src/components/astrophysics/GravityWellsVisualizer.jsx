import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { CONSTANTS, calculations, format } from '../../utils/astrophysicsConstants';
import { Icon } from '../icons';

// Optimized Gravity Well Mesh
function GravityWellMesh({ mass, gridSize = 30 }) {
    const meshRef = useRef();

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(20, 20, gridSize, gridSize);
        const positions = geo.attributes.position.array;
        const colors = [];

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const r = Math.sqrt(x * x + y * y);

            if (r > 0.1) {
                const depth = -(mass * 1.5) / (r + 0.3);
                positions[i + 2] = depth * 0.3;
            } else {
                positions[i + 2] = -mass * 2;
            }

            const depthNormalized = Math.abs(positions[i + 2]) / (mass * 2);
            colors.push(
                0.4 + depthNormalized * 0.3,
                0.5 + depthNormalized * 0.3,
                0.8 + depthNormalized * 0.2
            );
        }

        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geo.computeVertexNormals();
        return geo;
    }, [mass, gridSize]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.z += 0.0005;
        }
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]}>
            <meshStandardMaterial
                vertexColors
                wireframe={true}
                transparent={true}
                opacity={0.9}
            />
        </mesh>
    );
}

// Test Particle with trail
function TestParticle({ initialPosition, initialVelocity, mass, color }) {
    const particleRef = useRef();
    const [pos, setPos] = useState(initialPosition);
    const [vel, setVel] = useState(initialVelocity);
    const [trail, setTrail] = useState([]);

    useFrame((state, delta) => {
        if (!particleRef.current) return;

        const r = Math.sqrt(pos[0] ** 2 + pos[1] ** 2 + pos[2] ** 2);
        if (r < 0.3) return;

        const G_scaled = CONSTANTS.G * 1e26;
        const a = -(G_scaled * mass) / (r ** 2);
        const ax = (a * pos[0]) / r;
        const ay = (a * pos[1]) / r;
        const az = (a * pos[2]) / r;

        const dt = delta * 0.5;
        const newVel = [
            vel[0] + ax * dt,
            vel[1] + ay * dt,
            vel[2] + az * dt,
        ];

        const newPos = [
            pos[0] + newVel[0] * dt,
            pos[1] + newVel[1] * dt,
            pos[2] + newVel[2] * dt,
        ];

        setVel(newVel);
        setPos(newPos);

        setTrail(prev => {
            const newTrail = [...prev, newPos];
            return newTrail.slice(-40);
        });

        particleRef.current.position.set(newPos[0], newPos[1], newPos[2]);
    });

    const trailGeometry = useMemo(() => {
        if (trail.length < 2) return null;
        const points = trail.map(p => new THREE.Vector3(p[0], p[1], p[2]));
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [trail]);

    return (
        <group>
            <mesh ref={particleRef} position={initialPosition}>
                <sphereGeometry args={[0.2, 12, 12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>

            {trailGeometry && (
                <line geometry={trailGeometry}>
                    <lineBasicMaterial color={color} transparent opacity={0.6} />
                </line>
            )}
        </group>
    );
}

const GravityWellsVisualizer = ({ onNavigate }) => {
    const [mass, setMass] = useState(5.972);
    const [particles, setParticles] = useState([]);

    const massKg = mass * 1e24;
    const schwarzschildRadius = calculations.schwarzschildRadius(massKg);
    const escapeVelocityAtSurface = calculations.escapeVelocity(massKg, 6.371e6);

    const addParticle = () => {
        if (particles.length >= 8) {
            alert('Maximum 8 particles for performance');
            return;
        }
        const angle = Math.random() * Math.PI * 2;
        const radius = 4 + Math.random() * 2;
        const newParticle = {
            id: Date.now(),
            position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
            velocity: [
                -Math.sin(angle) * (0.8 + Math.random() * 0.4),
                Math.random() * 0.3,
                Math.cos(angle) * (0.8 + Math.random() * 0.4)
            ],
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };
        setParticles(prev => [...prev, newParticle]);
    };

    const clearParticles = () => {
        setParticles([]);
    };

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
                        Gravity Wells Visualization
                    </h1>
                    <p className="text-textSecondary">
                        3D spacetime curvature and gravitational effects
                    </p>
                </div>
                <div className="w-24" />
            </div>

            {/* 3D Canvas */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <div className="h-[600px] bg-background/50 rounded-xl overflow-hidden relative">
                    <Canvas camera={{ position: [12, 12, 12], fov: 50 }}>
                        <ambientLight intensity={0.4} />
                        <pointLight position={[15, 15, 15]} intensity={1.5} />
                        <pointLight position={[-15, -15, -15]} intensity={0.7} />

                        <GravityWellMesh mass={mass} />

                        {/* Central Mass */}
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[0.5, 24, 24]} />
                            <meshStandardMaterial
                                color="#3B82F6"
                                emissive="#3B82F6"
                                emissiveIntensity={0.4}
                                metalness={0.8}
                                roughness={0.2}
                            />
                        </mesh>

                        {/* Test Particles */}
                        {particles.map((particle) => (
                            <TestParticle
                                key={particle.id}
                                initialPosition={particle.position}
                                initialVelocity={particle.velocity}
                                mass={massKg}
                                color={particle.color}
                            />
                        ))}

                        <Grid args={[20, 20]} cellColor="#4B5563" sectionColor="#6B7280" position={[0, -mass * 1.2, 0]} />

                        <OrbitControls
                            enableDamping
                            dampingFactor={0.05}
                            minDistance={5}
                            maxDistance={35}
                        />
                    </Canvas>

                    {/* Particle Count */}
                    {particles.length > 0 && (
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700 text-sm">
                            <div className="text-textSecondary">Particles: <span className="text-primary font-semibold">{particles.length}/8</span></div>
                        </div>
                    )}
                </div>

                <div className="mt-4 text-center text-sm text-textSecondary">
                    <p>Click and drag to rotate • Scroll to zoom • Right-click to pan</p>
                </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Central Mass: {mass.toFixed(2)} × 10²⁴ kg
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        {mass < 2 ? 'Small planet' : mass < 10 ? 'Earth-like' : mass < 100 ? 'Super-Earth' : 'Gas giant'}
                    </p>
                    <input
                        type="range"
                        min={0.5}
                        max={200}
                        step={0.1}
                        value={mass}
                        onChange={(e) => setMass(parseFloat(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>0.5</span>
                        <span>Earth: 5.97</span>
                        <span>200</span>
                    </div>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Test Particles
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        Add particles to see orbital motion
                    </p>
                    <button
                        onClick={addParticle}
                        className="w-full py-3 rounded-lg font-semibold transition-all bg-primary/20 text-primary border-2 border-primary hover:bg-primary/30"
                    >
                        Add Random Particle
                    </button>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Reset
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        Clear all test particles
                    </p>
                    <button
                        onClick={clearParticles}
                        disabled={particles.length === 0}
                        className={`w-full py-3 rounded-lg font-semibold transition-all ${particles.length > 0
                            ? 'bg-error/20 text-error border-2 border-error hover:bg-error/30'
                            : 'bg-surface/50 text-textSecondary border-2 border-gray-600 opacity-50 cursor-not-allowed'
                            }`}
                    >
                        Clear All Particles
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Schwarzschild Radius</div>
                    <div className="text-2xl font-bold text-primary mb-2">
                        {format.scientific(schwarzschildRadius)}
                    </div>
                    <div className="text-xs text-textSecondary">meters (event horizon)</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Escape Velocity</div>
                    <div className="text-2xl font-bold text-secondary mb-2">
                        {format.velocity(escapeVelocityAtSurface)}
                    </div>
                    <div className="text-xs text-textSecondary">
                        {(escapeVelocityAtSurface / 1000).toFixed(2)} km/s
                    </div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Curvature Depth</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        -{(mass * 1.2).toFixed(1)}
                    </div>
                    <div className="text-xs text-textSecondary">relative units</div>
                </div>
            </div>
        </motion.div>
    );
};

export default GravityWellsVisualizer;
