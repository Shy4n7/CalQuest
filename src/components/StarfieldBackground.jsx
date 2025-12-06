import { useEffect, useRef } from 'react'
import './StarfieldBackground.css'

const StarfieldBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let stars = []

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create stars with varying properties for organic feel
        const createStars = () => {
            stars = []
            const starCount = Math.floor((canvas.width * canvas.height) / 3000) // Density based on screen size

            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5, // Varying sizes
                    opacity: Math.random() * 0.5 + 0.3, // Base opacity
                    twinkleSpeed: Math.random() * 0.02 + 0.005, // Different twinkle rates
                    twinklePhase: Math.random() * Math.PI * 2, // Random starting phase
                    driftX: (Math.random() - 0.5) * 0.1, // Gentle horizontal drift
                    driftY: (Math.random() - 0.5) * 0.1, // Gentle vertical drift
                })
            }
        }
        createStars()

        // Animation loop
        const animate = () => {
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, '#0a0e27') // Deep blue-black
            gradient.addColorStop(0.5, '#1a1535') // Purple-blue
            gradient.addColorStop(1, '#0f0a1e') // Deep purple-black

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw and update stars
            stars.forEach(star => {
                // Update twinkle
                star.twinklePhase += star.twinkleSpeed
                const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7 // Oscillate between 0.4 and 1.0

                // Update position (gentle drift)
                star.x += star.driftX
                star.y += star.driftY

                // Wrap around edges
                if (star.x < 0) star.x = canvas.width
                if (star.x > canvas.width) star.x = 0
                if (star.y < 0) star.y = canvas.height
                if (star.y > canvas.height) star.y = 0

                // Draw star with glow effect
                const finalOpacity = star.opacity * twinkle

                // Outer glow
                ctx.beginPath()
                const glowGradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.size * 3
                )
                glowGradient.addColorStop(0, `rgba(200, 220, 255, ${finalOpacity * 0.8})`)
                glowGradient.addColorStop(0.5, `rgba(150, 180, 255, ${finalOpacity * 0.3})`)
                glowGradient.addColorStop(1, 'rgba(150, 180, 255, 0)')
                ctx.fillStyle = glowGradient
                ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
                ctx.fill()

                // Core star
                ctx.beginPath()
                ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="starfield-canvas"
            aria-hidden="true"
        />
    )
}

export default StarfieldBackground
