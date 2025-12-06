import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../icons';

const GravityWells2D = ({ onNavigate }) => {
    const canvasRef = useRef(null);
    const [mass, setMass] = useState(5.972); // Earth masses
    const [particles, setParticles] = useState([]);
    const [isAnimating, setIsAnimating] = useState(true);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    // Physics constants
    const G = 6.674e-11;
    const SCALE = 50;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth * 2;
        const height = canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const centerX = width / 4;
        const centerY = height / 4;

        // Draw gravity well visualization
        const drawGravityWell = () => {
            ctx.clearRect(0, 0, width / 2, height / 2);

            // Draw gradient background
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
            gradient.addColorStop(0, 'rgba(107, 141, 214, 0.3)');
            gradient.addColorStop(0.5, 'rgba(107, 141, 214, 0.1)');
            gradient.addColorStop(1, 'rgba(107, 141, 214, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width / 2, height / 2);

            // Draw concentric circles representing gravity field
            const maxRadius = 200;
            const numCircles = 10;
            for (let i = 1; i <= numCircles; i++) {
                const radius = (maxRadius / numCircles) * i;
                const opacity = 1 - (i / numCircles) * 0.7;

                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(107, 141, 214, ${opacity * 0.3})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw field strength indicators
                if (i % 2 === 0) {
                    const strength = mass / (radius / SCALE) ** 2;
                    ctx.fillStyle = `rgba(232, 168, 124, ${opacity * 0.5})`;
                    ctx.font = '10px Inter';
                    ctx.fillText(`${strength.toFixed(1)}`, centerX + radius + 5, centerY);
                }
            }

            // Draw central mass
            const massRadius = Math.max(10, Math.min(30, mass * 2));
            const massGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, massRadius);
            massGradient.addColorStop(0, '#6B8DD6');
            massGradient.addColorStop(0.7, '#4A6FA5');
            massGradient.addColorStop(1, '#2A4F85');

            ctx.beginPath();
            ctx.arc(centerX, centerY, massRadius, 0, Math.PI * 2);
            ctx.fillStyle = massGradient;
            ctx.fill();
            ctx.strokeStyle = '#8BA8E0';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw particles
            particlesRef.current.forEach((particle, index) => {
                // Calculate gravitational force
                const dx = centerX - particle.x;
                const dy = centerY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > massRadius) {
                    const force = (G * mass * 1e24) / (distance / SCALE) ** 2;
                    const angle = Math.atan2(dy, dx);

                    particle.vx += Math.cos(angle) * force * 0.0001;
                    particle.vy += Math.sin(angle) * force * 0.0001;

                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Add to trail
                    particle.trail.push({ x: particle.x, y: particle.y });
                    if (particle.trail.length > 50) particle.trail.shift();

                    // Draw trail
                    if (particle.trail.length > 1) {
                        ctx.beginPath();
                        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
                        for (let i = 1; i < particle.trail.length; i++) {
                            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                        }
                        ctx.strokeStyle = `rgba(${particle.color}, 0.5)`;
                        ctx.lineWidth = 3;
                        ctx.stroke();
                    }

                    // Draw particle glow
                    const glowGradient = ctx.createRadialGradient(
                        particle.x, particle.y, 0,
                        particle.x, particle.y, 12
                    );
                    glowGradient.addColorStop(0, `rgba(${particle.color}, 1)`);
                    glowGradient.addColorStop(0.5, `rgba(${particle.color}, 0.6)`);
                    glowGradient.addColorStop(1, `rgba(${particle.color}, 0)`);

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, 12, 0, Math.PI * 2);
                    ctx.fillStyle = glowGradient;
                    ctx.fill();

                    // Draw particle core
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
                    ctx.fillStyle = `rgb(${particle.color})`;
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else {
                    // Particle absorbed
                    particlesRef.current.splice(index, 1);
                }
            });
        };

        const animate = () => {
            if (isAnimating) {
                drawGravityWell();
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mass, isAnimating]);

    const addParticle = () => {
        if (particlesRef.current.length >= 8) {
            alert('Maximum 8 particles for performance');
            return;
        }

        const canvas = canvasRef.current;
        const centerX = canvas.width / 4;
        const centerY = canvas.height / 4;

        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 50;

        const colors = [
            '239, 68, 68',   // red
            '34, 197, 94',   // green
            '59, 130, 246',  // blue
            '168, 85, 247',  // purple
            '236, 72, 153',  // pink
            '251, 146, 60',  // orange
        ];

        const newParticle = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            vx: -Math.sin(angle) * (2 + Math.random()),
            vy: Math.cos(angle) * (2 + Math.random()),
            color: colors[Math.floor(Math.random() * colors.length)],
            trail: []
        };

        particlesRef.current.push(newParticle);
        setParticles([...particlesRef.current]);
    };

    const clearParticles = () => {
        particlesRef.current = [];
        setParticles([]);
    };

    const schwarzschildRadius = (2 * G * mass * 1e24) / (3e8 ** 2);
    const escapeVelocity = Math.sqrt((2 * G * mass * 1e24) / 6.371e6);

    return (
        <motion.div
            className="max-w-7xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Fixed Back Button */}
            <button
                onClick={() => onNavigate('astrophysics-hub')}
                className="fixed top-20 left-4 z-50 bg-surface/90 backdrop-blur-sm p-3 rounded-lg border border-gray-700 hover:bg-surface transition-all hover:scale-110"
                title="Back to Astrophysics Hub"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-textPrimary">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-2">
                    Gravity Wells Visualization
                </h1>
                <p className="text-textSecondary">
                    Interactive 2D gravity field simulation
                </p>
            </div>

            {/* Canvas */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-[600px] bg-background/50 rounded-xl"
                    />

                    {/* Particle Count */}
                    {particles.length > 0 && (
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700 text-sm">
                            <div className="text-textSecondary">
                                Particles: <span className="text-primary font-semibold">{particles.length}/8</span>
                            </div>
                        </div>
                    )}

                    {/* Controls Overlay */}
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
                        >
                            {isAnimating ? '⏸ Pause' : '▶ Play'}
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-textSecondary">
                    <p>Add particles to see orbital motion • Adjust mass to change gravity field strength</p>
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
                        {schwarzschildRadius.toExponential(2)}
                    </div>
                    <div className="text-xs text-textSecondary">meters (event horizon)</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Escape Velocity</div>
                    <div className="text-2xl font-bold text-secondary mb-2">
                        {(escapeVelocity / 1000).toFixed(2)} km/s
                    </div>
                    <div className="text-xs text-textSecondary">
                        {escapeVelocity.toFixed(0)} m/s
                    </div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Field Strength</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        {(mass * 10).toFixed(1)}
                    </div>
                    <div className="text-xs text-textSecondary">relative units</div>
                </div>
            </div>
        </motion.div>
    );
};

export default GravityWells2D;
