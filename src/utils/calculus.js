// Derivative functions for common power functions
export const powerRuleDerivative = (coefficient, power, x) => {
    // d/dx(ax^n) = a*n*x^(n-1)
    return coefficient * power * Math.pow(x, power - 1)
}

// Numerical derivative (for custom functions)
export const numericalDerivative = (f, x, h = 0.0001) => {
    return (f(x + h) - f(x - h)) / (2 * h)
}

// Calculate tangent line at point
export const getTangentLine = (x, f, fPrime) => {
    const y = f(x)
    const slope = fPrime(x)
    // y - y1 = m(x - x1) → y = m(x - x1) + y1
    return (xVal) => slope * (xVal - x) + y
}

// Numerical integration using Simpson's rule
export const integrate = (f, a, b, n = 100) => {
    const h = (b - a) / n
    let sum = f(a) + f(b)

    for (let i = 1; i < n; i++) {
        const x = a + i * h
        sum += (i % 2 === 1 ? 4 : 2) * f(x)
    }

    return (h / 3) * sum
}

// Area under curve (Riemann sum)
export const areaUnderCurve = (f, a, b, rectangles = 100) => {
    const width = (b - a) / rectangles
    let area = 0

    for (let i = 0; i < rectangles; i++) {
        const x = a + i * width
        area += f(x) * width
    }

    return area
}

// Limit approximation
export const approximateLimit = (f, x, tolerance = 0.0001) => {
    let h = 1
    let prevValue = null

    while (h > tolerance) {
        const value = f(x + h)
        if (prevValue && Math.abs(value - prevValue) < tolerance) {
            return value
        }
        prevValue = value
        h /= 10
    }

    return prevValue
}

// Common test functions
export const functions = {
    quadratic: (x) => x * x - 2 * x + 3,
    quadraticDerivative: (x) => 2 * x - 2,
    cubic: (x) => x * x * x - x,
    cubicDerivative: (x) => 3 * x * x - 1,
    exponential: (x) => Math.exp(x),
    sine: (x) => Math.sin(x),
    cosine: (x) => Math.cos(x),
    linear: (x) => 2 * x + 1,
    linearDerivative: () => 2,
}

// Generate array of x values for plotting
export const generateXValues = (start, end, numPoints = 100) => {
    const step = (end - start) / (numPoints - 1)
    return Array.from({ length: numPoints }, (_, i) => start + i * step)
}

// Generate y values from x values and function
export const generateYValues = (xValues, func) => {
    return xValues.map(func)
}
