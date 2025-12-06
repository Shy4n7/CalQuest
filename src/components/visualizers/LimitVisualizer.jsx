import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Plot from 'react-plotly.js'
import { cardVariants } from '../../utils/animations'
import { Icon } from '../icons'

const LimitVisualizer = () => {
    const [zoomLevel, setZoomLevel] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    // Function with a limit
    const f = (x) => (x * x - 4) / (x - 2) // Limit as x→2 is 4
    const targetX = 2
    const limitValue = 4

    // Zoom levels
    const zoomLevels = [
        { range: [-10, 10], label: 'Wide View' },
        { range: [-1, 5], label: 'Zooming In...' },
        { range: [1, 3], label: 'Getting Closer...' },
        { range: [1.5, 2.5], label: 'Almost There...' },
        { range: [1.9, 2.1], label: 'Very Close!' },
    ]

    const currentZoom = zoomLevels[zoomLevel]

    // Generate points (avoiding x = 2)
    const generatePoints = (range) => {
        const points = []
        const [start, end] = range
        const step = (end - start) / 100
        for (let x = start; x <= end; x += step) {
            if (Math.abs(x - targetX) > 0.01) {
                points.push({ x, y: f(x) })
            }
        }
        return points
    }

    const points = generatePoints(currentZoom.range)
    const xValues = points.map(p => p.x)
    const yValues = points.map(p => p.y)

    const handleZoom = () => {
        if (zoomLevel < zoomLevels.length - 1) {
            setIsAnimating(true)
            setTimeout(() => {
                setZoomLevel(zoomLevel + 1)
                setIsAnimating(false)
            }, 500)
        }
    }

    const handleReset = () => {
        setZoomLevel(0)
    }

    const distance = Math.pow(10, -(zoomLevel + 1))

    return (
        <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading font-bold text-gradient flex items-center gap-3">
                    <Icon name="limit" size={36} color="#6B8DD6" />
                    Limit Visualizer
                </h2>
                <motion.button
                    className="px-4 py-2 bg-surface rounded-lg text-textSecondary hover:text-textPrimary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                >
                    ↻ Reset
                </motion.button>
            </div>

            {/* Function Info */}
            <div className="bg-surface rounded-lg p-4 border border-gray-700">
                <div className="text-center">
                    <div className="text-textSecondary mb-2">Exploring the limit:</div>
                    <div className="text-2xl font-mono text-primary">
                        lim<sub className="text-sm">x→2</sub> (x² - 4)/(x - 2) = ?
                    </div>
                </div>
            </div>

            {/* Graph */}
            <div className="bg-surface rounded-xl p-6 border border-gray-700">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={zoomLevel}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Plot
                            data={[
                                {
                                    x: xValues,
                                    y: yValues,
                                    type: 'scatter',
                                    mode: 'lines',
                                    name: 'f(x)',
                                    line: { color: '#3B82F6', width: 3 },
                                },
                                {
                                    x: [targetX],
                                    y: [limitValue],
                                    type: 'scatter',
                                    mode: 'markers',
                                    name: 'Limit Point',
                                    marker: {
                                        color: '#F59E0B',
                                        size: 15,
                                        symbol: 'circle-open',
                                        line: { width: 3 }
                                    },
                                },
                            ]}
                            layout={{
                                autosize: true,
                                paper_bgcolor: '#1E293B',
                                plot_bgcolor: '#0F172A',
                                font: { color: '#F1F5F9', family: 'Inter' },
                                xaxis: {
                                    title: 'x',
                                    gridcolor: '#334155',
                                    zerolinecolor: '#475569',
                                    range: currentZoom.range,
                                },
                                yaxis: {
                                    title: 'y',
                                    gridcolor: '#334155',
                                    zerolinecolor: '#475569',
                                },
                                showlegend: true,
                                legend: {
                                    x: 0.02,
                                    y: 0.98,
                                    bgcolor: 'rgba(30, 41, 59, 0.8)',
                                },
                                margin: { l: 60, r: 40, t: 40, b: 60 },
                                annotations: [
                                    {
                                        x: targetX,
                                        y: limitValue,
                                        text: `Approaching (${targetX}, ${limitValue})`,
                                        showarrow: true,
                                        arrowhead: 2,
                                        arrowcolor: '#F59E0B',
                                        font: { color: '#F59E0B', size: 12 },
                                        bgcolor: 'rgba(30, 41, 59, 0.9)',
                                        bordercolor: '#F59E0B',
                                        borderwidth: 1,
                                        borderpad: 4,
                                    },
                                ],
                            }}
                            config={{
                                responsive: true,
                                displayModeBar: false,
                            }}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Zoom Control */}
            <div className="flex items-center justify-center space-x-4">
                <motion.button
                    className={`px-8 py-3 rounded-lg font-semibold ${zoomLevel < zoomLevels.length - 1
                            ? 'bg-primary text-white'
                            : 'bg-surface text-textSecondary cursor-not-allowed'
                        }`}
                    whileHover={zoomLevel < zoomLevels.length - 1 ? { scale: 1.05 } : {}}
                    whileTap={zoomLevel < zoomLevels.length - 1 ? { scale: 0.95 } : {}}
                    onClick={handleZoom}
                    disabled={zoomLevel >= zoomLevels.length - 1 || isAnimating}
                >
                    {zoomLevel < zoomLevels.length - 1 ? 'Zoom In' : 'Maximum Zoom'}
                </motion.button>
            </div>

            {/* Status Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">Zoom Level</div>
                    <div className="text-2xl font-bold text-primary">
                        {zoomLevel + 1} / {zoomLevels.length}
                    </div>
                    <div className="text-xs text-textSecondary mt-1">
                        {currentZoom.label}
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">Distance from Target</div>
                    <div className="text-2xl font-bold text-accent">
                        ≈ {distance.toFixed(4)}
                    </div>
                    <div className="text-xs text-textSecondary mt-1">
                        Getting smaller!
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-success glow">
                    <div className="text-textSecondary text-sm mb-1">Limit Value</div>
                    <div className="text-2xl font-bold text-success">
                        {limitValue}
                    </div>
                    <div className="text-xs text-textSecondary mt-1">
                        As x → {targetX}
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div className="bg-surface/50 rounded-lg p-6 border border-accent/30">
                <h3 className="text-lg font-heading font-bold mb-2 flex items-center">
                    <span className="mr-2">
                        <Icon name="lightbulb" size={24} color="#E8A87C" />
                    </span>
                    Understanding Limits
                </h3>
                <p className="text-textSecondary leading-relaxed">
                    A <span className="font-semibold">limit</span> describes what value a function approaches
                    as x gets closer to a specific point. Notice the{' '}
                    <span className="text-accent font-semibold">hollow circle</span> at x = 2? The function
                    isn't actually defined there, but as we zoom in, we can see it's approaching the value 4.
                    This is the power of limits - understanding behavior near a point, even if the function
                    doesn't exist exactly at that point!
                </p>
            </div>
        </motion.div>
    )
}

export default LimitVisualizer
