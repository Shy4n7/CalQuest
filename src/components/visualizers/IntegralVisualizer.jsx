import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Plot from 'react-plotly.js'
import { cardVariants } from '../../utils/animations'
import { functions as calculusFunctions, generateXValues } from '../../utils/calculus'
import { Icon } from '../icons'

// Helper functions
const areaUnderCurve = (f, a, b, n) => {
    const width = (b - a) / n
    let sum = 0
    for (let i = 0; i < n; i++) {
        const x = a + i * width
        sum += f(x) * width
    }
    return sum
}

const integrate = (f, a, b, n) => {
    return areaUnderCurve(f, a, b, n)
}

const IntegralVisualizer = () => {
    const [rectangles, setRectangles] = useState(10)
    const [selectedFunction, setSelectedFunction] = useState('linear')

    // Define functions
    const functions = {
        linear: { f: (x) => x, name: 'f(x) = x', exactArea: 8 },
        quadratic: { f: (x) => x * x, name: 'f(x) = x²', exactArea: 21.33 },
        sine: { f: (x) => Math.sin(x) + 2, name: 'f(x) = sin(x) + 2', exactArea: null },
    }

    const { f, name, exactArea } = functions[selectedFunction]
    const a = 0
    const b = 4

    // Calculate areas
    const estimatedArea = useMemo(() => areaUnderCurve(f, a, b, rectangles), [rectangles, selectedFunction])
    const preciseArea = useMemo(() => integrate(f, a, b, 1000), [selectedFunction])
    const accuracy = exactArea ? ((1 - Math.abs(estimatedArea - exactArea) / exactArea) * 100) :
        ((1 - Math.abs(estimatedArea - preciseArea) / preciseArea) * 100)

    // Generate curve
    const xValues = generateXValues(a, b, 100)
    const yValues = xValues.map(f)

    // Generate rectangles
    const width = (b - a) / rectangles
    const rectangleData = []
    for (let i = 0; i < rectangles; i++) {
        const x = a + i * width
        const height = f(x)
        rectangleData.push({
            x: [x, x + width, x + width, x, x],
            y: [0, 0, height, height, 0],
            fill: 'toself',
            fillcolor: 'rgba(59, 130, 246, 0.3)',
            line: { color: '#3B82F6', width: 1 },
            mode: 'lines',
            showlegend: false,
            hoverinfo: 'skip',
        })
    }

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
                    <Icon name="integral" size={36} color="#8B7EC8" />
                    Integral Visualizer
                </h2>
                <motion.button
                    className="px-4 py-2 bg-surface rounded-lg text-textSecondary hover:text-textPrimary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRectangles(10)}
                >
                    ↻ Reset
                </motion.button>
            </div>

            {/* Function Selector */}
            <div className="flex items-center space-x-4">
                <label className="text-textSecondary">Function:</label>
                <select
                    value={selectedFunction}
                    onChange={(e) => setSelectedFunction(e.target.value)}
                    className="bg-surface text-textPrimary px-4 py-2 rounded-lg border border-gray-700 focus:border-primary focus:outline-none"
                >
                    <option value="linear">f(x) = x</option>
                    <option value="quadratic">f(x) = x²</option>
                    <option value="sine">f(x) = sin(x) + 2</option>
                </select>
            </div>

            {/* Graph */}
            <div className="bg-surface rounded-xl p-6 border border-gray-700">
                <Plot
                    data={[
                        ...rectangleData,
                        {
                            x: xValues,
                            y: yValues,
                            type: 'scatter',
                            mode: 'lines',
                            name: name,
                            line: { color: '#10B981', width: 3 },
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
                            range: [a - 0.5, b + 0.5],
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
                    }}
                    config={{
                        responsive: true,
                        displayModeBar: false,
                    }}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>

            {/* Precision Slider */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-textPrimary font-semibold">
                        Precision Level (Number of Rectangles):
                    </label>
                    <span className="text-primary font-mono">{rectangles}</span>
                </div>
                <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={rectangles}
                    onChange={(e) => setRectangles(parseInt(e.target.value))}
                    className="w-full h-3 bg-surface rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-textSecondary">
                    <span>5 (Low)</span>
                    <span>50 (Medium)</span>
                    <span>100 (High)</span>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">Estimated Area</div>
                    <div className="text-2xl font-bold text-primary">
                        {estimatedArea.toFixed(3)}
                    </div>
                    <div className="text-xs text-textSecondary mt-1">
                        Using {rectangles} rectangles
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">
                        {exactArea ? 'Exact Area' : 'Precise Area'}
                    </div>
                    <div className="text-2xl font-bold text-secondary">
                        {(exactArea || preciseArea).toFixed(3)}
                    </div>
                    <div className="text-xs text-textSecondary mt-1">
                        {exactArea ? 'Calculated' : 'Using 1000 steps'}
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-success glow">
                    <div className="text-textSecondary text-sm mb-1">Accuracy</div>
                    <div className="text-2xl font-bold text-success">
                        {accuracy.toFixed(1)}%
                    </div>
                    <div className="w-full bg-surface rounded-full h-2 mt-2">
                        <motion.div
                            className="h-full bg-success rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${accuracy}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div className="bg-surface/50 rounded-lg p-6 border border-secondary/30">
                <h3 className="text-lg font-heading font-bold mb-2 flex items-center">
                    <span className="mr-2">
                        <Icon name="lightbulb" size={24} color="#E8A87C" />
                    </span>
                    How It Works
                </h3>
                <p className="text-textSecondary leading-relaxed">
                    The <span className="text-primary font-semibold">blue rectangles</span> approximate the area
                    under the <span className="text-secondary font-semibold">green curve</span>. As you increase
                    the number of rectangles, the approximation gets better! This is the fundamental idea behind
                    <span className="font-semibold"> integration</span> - adding up infinitely many tiny pieces
                    to find the total area. Watch the accuracy improve as you slide to the right!
                </p>
            </div>
        </motion.div>
    )
}

export default IntegralVisualizer
