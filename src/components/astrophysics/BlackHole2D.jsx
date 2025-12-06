import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../icons';

const BlackHole2D = ({ onNavigate }) => {
    const canvasRef = useRef(null);
    const [mass, setMass] = useState(10); // Solar masses
    const [accretionRate, setAccretionRate] = useState(0.5);
    const [isAnimating, setIsAnimating] = useState(true);
    const animationRef = useRef(null);
    const rotationRef = useRef(0);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth * 2;
        const height = canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);

        const centerX = width / 4;
        const centerY = height / 4;

        // Generate accretion disk particles
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < 200; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = 40 + Math.random() * 120;
                particlesRef.current.push({
                    angle,
                    radius,
                    speed: 0.02 / (radius / 40),
                    size: Math.random() * 2 + 1,
                    brightness: Math.random()
                });
            }
        }

        const drawBlackHole = () => {
            ctx.clearRect(0, 0, width / 2, height / 2);

            // Draw space background with stars
            ctx.fillStyle = '#0a0a1a';
            ctx.fillRect(0, 0, width / 2, height / 2);

            // Draw distant stars
            for (let i = 0; i < 50; i++) {
                const x = (i * 137) % (width / 2);
                const y = (i * 211) % (height / 2);
                const brightness = Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5;
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.5})`;
                ctx.fillRect(x, y, 1, 1);
            }

            // Draw gravitational lensing effect
            const lensGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
            lensGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            lensGradient.addColorStop(0.3, 'rgba(107, 141, 214, 0.1)');
            lensGradient.addColorStop(0.6, 'rgba(107, 141, 214, 0.2)');
            lensGradient.addColorStop(1, 'rgba(107, 141, 214, 0)');
            ctx.fillStyle = lensGradient;
            ctx.fillRect(0, 0, width / 2, height / 2);

            // Draw accretion disk
            particlesRef.current.forEach(particle => {
                if (isAnimating) {
                    particle.angle += particle.speed * accretionRate;
                    particle.radius -= 0.05 * accretionRate;

                    if (particle.radius < 30) {
                        particle.radius = 40 + Math.random() * 120;
                        particle.angle = Math.random() * Math.PI * 2;
                    }
                }

                const x = centerX + Math.cos(particle.angle) * particle.radius;
                const y = centerY + Math.sin(particle.angle) * particle.radius * 0.3; // Flatten for disk effect

                // Color based on radius - outer is constant orange, inner gets hotter
                const normalizedRadius = (particle.radius - 30) / 130;
                let r, g, b;

                if (normalizedRadius > 0.65) {
                    // Outer disk - constant orange
                    r = 255;
                    g = 140;
                    b = 50;
                } else if (normalizedRadius > 0.35) {
                    // Middle - orange to yellow gradient
                    const t = (normalizedRadius - 0.35) / 0.3;
                    r = 255;
                    g = Math.floor(140 + (200 - 140) * (1 - t));
                    b = Math.floor(50 + (100 - 50) * (1 - t));
                } else {
                    // Inner - yellow to white (hottest)
                    const t = normalizedRadius / 0.35;
                    r = 255;
                    g = Math.floor(200 + (255 - 200) * (1 - t));
                    b = Math.floor(100 + (255 - 100) * (1 - t));
                }

                const alpha = particle.brightness * (0.5 + normalizedRadius * 0.5);

                // Draw particle with glow
                const glowSize = particle.size * (1.5 + normalizedRadius * 1.5);
                const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
                particleGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                particleGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`);
                particleGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.beginPath();
                ctx.arc(x, y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = particleGradient;
                ctx.fill();

                // Bright core for inner particles
                if (normalizedRadius < 0.4) {
                    ctx.beginPath();
                    ctx.arc(x, y, particle.size * 0.7, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
                    ctx.fill();
                }
            });

            // Draw event horizon (black hole shadow)
            const eventHorizonRadius = mass * 2;
            const shadowGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, eventHorizonRadius
            );
            shadowGradient.addColorStop(0, '#000000');
            shadowGradient.addColorStop(0.8, '#000000');
            shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(centerX, centerY, eventHorizonRadius, 0, Math.PI * 2);
            ctx.fillStyle = shadowGradient;
            ctx.fill();

            // Draw photon sphere
            const photonSphereRadius = eventHorizonRadius * 1.5;
            ctx.beginPath();
            ctx.arc(centerX, centerY, photonSphereRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(107, 141, 214, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw Hawking radiation particles
            if (isAnimating) {
                rotationRef.current += 0.01;
                for (let i = 0; i < 8; i++) {
                    const angle = rotationRef.current + (i * Math.PI * 2) / 8;
                    const radius = eventHorizonRadius + 5 + Math.sin(rotationRef.current * 2 + i) * 3;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;

                    ctx.beginPath();
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(232, 168, 124, ${0.6 + Math.sin(rotationRef.current * 3 + i) * 0.4})`;
                    ctx.fill();
                }
            }

            // Draw info labels
            ctx.fillStyle = 'rgba(107, 141, 214, 0.8)';
            ctx.font = '12px Inter';
            ctx.fillText('Event Horizon', centerX + eventHorizonRadius + 10, centerY);
            ctx.fillText('Photon Sphere', centerX + photonSphereRadius + 10, centerY + 20);
            ctx.fillText('Accretion Disk', centerX + 80, centerY - 60);
        };

        const animate = () => {
            if (isAnimating || animationRef.current === null) {
                drawBlackHole();
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mass, accretionRate, isAnimating]);

    const schwarzschildRadius = (2 * 6.674e-11 * mass * 1.989e30) / (3e8 ** 2);
    const eventHorizonCircumference = 2 * Math.PI * schwarzschildRadius;

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
                    Black Hole Explorer
                </h1>
                <p className="text-textSecondary">
                    Interactive 2D black hole visualization
                </p>
            </div>

            {/* Canvas */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700">
                <div className="relative">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-[600px] bg-black rounded-xl"
                    />

                    {/* Controls Overlay */}
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                        <button
                            onClick={() => setIsAnimating(!isAnimating)}
                            className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
                        >
                            {isAnimating ? '⏸ Pause' : '▶ Play'}
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700 text-xs space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-black rounded-full border border-primary"></div>
                            <span className="text-textSecondary">Event Horizon</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-1 border-t-2 border-dashed border-primary"></div>
                            <span className="text-textSecondary">Photon Sphere</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
                            <span className="text-textSecondary">Accretion Disk</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                            <span className="text-textSecondary">Hawking Radiation</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-textSecondary">
                    <p>Adjust mass and accretion rate to see different black hole behaviors</p>
                </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Black Hole Mass: {mass.toFixed(1)} M☉
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        {mass < 5 ? 'Stellar black hole' : mass < 50 ? 'Intermediate mass' : mass < 1000 ? 'Supermassive' : 'Ultra-massive'}
                    </p>
                    <input
                        type="range"
                        min={3}
                        max={100}
                        step={0.5}
                        value={mass}
                        onChange={(e) => setMass(parseFloat(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>3 M☉</span>
                        <span>Sun: 1 M☉</span>
                        <span>100 M☉</span>
                    </div>
                </div>

                <div className="bg-surface/80 backdrop-blur-xl rounded-xl p-6 border border-gray-700">
                    <label className="block text-lg font-semibold mb-3">
                        Accretion Rate: {(accretionRate * 100).toFixed(0)}%
                    </label>
                    <p className="text-sm text-textSecondary mb-3">
                        {accretionRate < 0.3 ? 'Dormant' : accretionRate < 0.7 ? 'Active' : 'Quasar-like'}
                    </p>
                    <input
                        type="range"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={accretionRate}
                        onChange={(e) => setAccretionRate(parseFloat(e.target.value))}
                        className="w-full slider"
                    />
                    <div className="flex justify-between text-xs text-textSecondary mt-2">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 border border-primary/30">
                    <div className="text-sm text-textSecondary mb-1">Schwarzschild Radius</div>
                    <div className="text-2xl font-bold text-primary mb-2">
                        {(schwarzschildRadius / 1000).toFixed(2)} km
                    </div>
                    <div className="text-xs text-textSecondary">{schwarzschildRadius.toExponential(2)} m</div>
                </div>

                <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-6 border border-secondary/30">
                    <div className="text-sm text-textSecondary mb-1">Event Horizon</div>
                    <div className="text-2xl font-bold text-secondary mb-2">
                        {(eventHorizonCircumference / 1000).toFixed(2)} km
                    </div>
                    <div className="text-xs text-textSecondary">circumference</div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6 border border-accent/30">
                    <div className="text-sm text-textSecondary mb-1">Luminosity</div>
                    <div className="text-2xl font-bold text-accent mb-2">
                        {(mass * accretionRate * 100).toFixed(1)}
                    </div>
                    <div className="text-xs text-textSecondary">relative units</div>
                </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                    <Icon name="lightbulb" size={32} color="#E8A87C" className="flex-shrink-0" />
                    <div>
                        <h3 className="text-lg font-semibold text-textPrimary mb-2">
                            💡 Black Hole Physics
                        </h3>
                        <p className="text-sm text-textSecondary">
                            The event horizon marks the point of no return. The accretion disk forms from matter
                            spiraling into the black hole, heating up and emitting intense radiation. The photon
                            sphere is where light can orbit the black hole. Hawking radiation represents quantum
                            effects at the event horizon.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlackHole2D;
