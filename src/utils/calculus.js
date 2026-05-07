// Derivative functions for common power functions
export const powerRuleDerivative = (coefficient, power, x) => {
    // d/dx(ax^n) = a*n*x^(n-1)
    if (typeof coefficient !== 'number' || typeof power !== 'number' || typeof x !== 'number') {
        return NaN;
    }
    return coefficient * power * Math.pow(x, power - 1)
}

// Numerical derivative (for custom functions)
export const numericalDerivative = (f, x, h = 0.0001) => {
    if (typeof f !== 'function') return NaN;
    if (typeof h !== 'number' || h === 0) h = 0.0001;

    try {
        const val = (f(x + h) - f(x - h)) / (2 * h);
        return isFinite(val) ? val : NaN;
    } catch (e) {
        return NaN;
    }
}

// Calculate tangent line at point
export const getTangentLine = (x, f, fPrime) => {
    if (typeof f !== 'function' || typeof fPrime !== 'function') {
        return () => NaN;
    }

    try {
        const y = f(x)
        const slope = fPrime(x)
        if (!isFinite(y) || !isFinite(slope)) return () => NaN;

        // y - y1 = m(x - x1) → y = m(x - x1) + y1
        return (xVal) => slope * (xVal - x) + y
    } catch (e) {
        return () => NaN;
    }
}

// Numerical integration using Simpson's rule
export const integrate = (f, a, b, n = 100) => {
    if (typeof f !== 'function') return NaN;
    if (n <= 0) n = 100;

    const h = (b - a) / n
    try {
        let sum = f(a) + f(b)

        for (let i = 1; i < n; i++) {
            const x = a + i * h
            sum += (i % 2 === 1 ? 4 : 2) * f(x)
        }

        const result = (h / 3) * sum;
        return isFinite(result) ? result : NaN;
    } catch (e) {
        return NaN;
    }
}

// Area under curve (Riemann sum)
export const areaUnderCurve = (f, a, b, rectangles = 100) => {
    if (typeof f !== 'function') return NaN;
    if (rectangles <= 0) rectangles = 100;

    const width = (b - a) / rectangles
    let area = 0

    try {
        for (let i = 0; i < rectangles; i++) {
            const x = a + i * width
            area += f(x) * width
        }
        return isFinite(area) ? area : NaN;
    } catch (e) {
        return NaN;
    }
}

// Limit approximation
export const approximateLimit = (f, x, tolerance = 0.0001) => {
    if (typeof f !== 'function') return NaN;

    let h = 1
    let prevValue = null
    let iterations = 0;
    const MAX_ITERATIONS = 100;

    try {
        while (h > tolerance && iterations < MAX_ITERATIONS) {
            const value = f(x + h)
            if (prevValue !== null && Math.abs(value - prevValue) < tolerance) {
                return value
            }
            prevValue = value
            h /= 10
            iterations++;
        }
        return prevValue !== null ? prevValue : NaN;
    } catch (e) {
        return NaN;
    }
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
    if (typeof func !== 'function') return [];
    return xValues.map(func)
}
