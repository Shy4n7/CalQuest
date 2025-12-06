import { useState } from 'react'
import { motion } from 'framer-motion'
import Plot from 'react-plotly.js'
import { cardVariants } from '../../utils/animations'
import { functions, numericalDerivative, generateXValues } from '../../utils/calculus'
import { Icon } from '../icons'

const SlopeVisualizer = () => {
    const [xPosition, setXPosition] = useState(1.5)
    const [selectedFunction, setSelectedFunction] = useState('quadratic')

    // Get function and its derivative
    const f = functions[selectedFunction]
    const fPrime = functions[`${selectedFunction}Derivative`] || ((x) => numericalDerivative(f, x))

    // Generate curve points
    const xValues = generateXValues(-2, 4, 100)
    const yValues = xValues.map(f)

    // Calculate tangent line
    const slope = fPrime(xPosition)
    const yAtPoint = f(xPosition)
    const tangentY = xValues.map((x) => slope * (x - xPosition) + yAtPoint)

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
                    <Icon name="derivative" size={36} color="#E8A87C" />
                    Slope Visualizer
                </h2>
                <motion.button
                    className="px-4 py-2 bg-surface rounded-lg text-textSecondary hover:text-textPrimary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setXPosition(1.5)}
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
                    <option value="quadratic">f(x) = x² - 2x + 3</option>
                    <option value="cubic">f(x) = x³ - x</option>
                    <option value="sine">f(x) = sin(x)</option>
                    <option value="linear">f(x) = 2x + 1</option>
                </select>
            </div>

            {/* Graph */}
            <div className="bg-surface rounded-xl p-6 border border-gray-700">
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
                            x: xValues,
                            y: tangentY,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Tangent Line',
                            line: { color: '#EF4444', width: 2, dash: 'dash' },
                        },
                        {
                            x: [xPosition],
                            y: [yAtPoint],
                            type: 'scatter',
                            mode: 'markers',
                            name: 'Point',
                            marker: { color: '#10B981', size: 12 },
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
                        hovermode: 'closest',
                    }}
                    config={{
                        responsive: true,
                        displayModeBar: false,
                    }}
                    style={{ width: '100%', height: '400px' }}
                />
            </div>

            {/* Slider */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-textPrimary font-semibold">
                        Drag to move along the curve:
                    </label>
                    <span className="text-primary font-mono">x = {xPosition.toFixed(2)}</span>
                </div>
                <input
                    type="range"
                    min="-2"
                    max="4"
                    step="0.01"
                    value={xPosition}
                    onChange={(e) => setXPosition(parseFloat(e.target.value))}
                    className="w-full h-3 bg-surface rounded-lg appearance-none cursor-pointer slider"
                />
            </div>

            {/* Values Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">Current Point</div>
                    <div className="text-2xl font-bold text-primary">
                        ({xPosition.toFixed(2)}, {yAtPoint.toFixed(2)})
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-gray-700">
                    <div className="text-textSecondary text-sm mb-1">Function Value</div>
                    <div className="text-2xl font-bold text-secondary">
                        f({xPosition.toFixed(2)}) = {yAtPoint.toFixed(2)}
                    </div>
                </div>
                <div className="bg-background rounded-lg p-4 border border-accent glow">
                    <div className="text-textSecondary text-sm mb-1">Slope (Derivative)</div>
                    <div className="text-2xl font-bold text-accent">
                        f'({xPosition.toFixed(2)}) = {slope.toFixed(2)}
                    </div>
                </div>
            </div>

            {/* Explanation */}
            <div className="bg-surface/50 rounded-lg p-6 border border-primary/30">
                <h3 className="text-lg font-heading font-bold mb-2 flex items-center">
                    <span className="mr-2">
                        <Icon name="lightbulb" size={24} color="#E8A87C" />
                    </span>
                    What's Happening?
                </h3>
                <p className="text-textSecondary leading-relaxed">
                    The <span className="text-error font-semibold">red dashed line</span> is the{' '}
                    <span className="font-semibold">tangent line</span> - it touches the curve at exactly one point.
                    The slope of this tangent line is the <span className="text-accent font-semibold">derivative</span>{' '}
                    at that point. As you move the slider, watch how the slope changes! This is the core idea
                    behind derivatives - measuring how fast something is changing at any exact moment.
                </p>
            </div>
        </motion.div>
    )
}

export default SlopeVisualizer
