import {
    powerRuleDerivative,
    numericalDerivative,
    integrate,
    approximateLimit,
    areaUnderCurve,
    getTangentLine,
    functions
} from './calculus.js';

// Simple assert function
const assert = (condition, message) => {
    if (!condition) {
        console.error(`❌ Test failed: ${message}`);
        process.exit(1);
    } else {
        console.log(`✅ ${message}`);
    }
};

const assertApprox = (actual, expected, tolerance = 0.001) => {
    if (Math.abs(actual - expected) > tolerance) {
        console.error(`❌ Test failed: Expected ${expected} +/- ${tolerance}, got ${actual}`);
        process.exit(1);
    } else {
        console.log(`✅ Value ${actual} is close to ${expected}`);
    }
};

const assertNaN = (value, message) => {
    if (!Number.isNaN(value)) {
        console.error(`❌ Test failed: ${message}. Expected NaN, got ${value}`);
        process.exit(1);
    } else {
        console.log(`✅ ${message}`);
    }
};

console.log('--- Running Calculus Utils Tests ---');

// Test numericalDerivative
// d/dx(x^2) at x=2 is 2*2 = 4
// The quadratic function is x^2 - 2x + 3, deriv is 2x - 2. At x=2, 2(2)-2 = 2.
const deriv = numericalDerivative(functions.quadratic, 2);
assertApprox(deriv, 2, 0.01);

// Test invalid input for numericalDerivative
assertNaN(numericalDerivative("not a function", 2), "numericalDerivative with string input");
assertNaN(numericalDerivative(null, 2), "numericalDerivative with null input");
assertNaN(numericalDerivative(() => { throw new Error(); }, 2), "numericalDerivative with throwing function");

// Test integrate
// Integral of 2x from 0 to 2 is [x^2] from 0 to 2 = 4
const integral = integrate((x) => 2 * x, 0, 2);
assertApprox(integral, 4, 0.01);

// Test invalid input for integrate
assertNaN(integrate("not a function", 0, 2), "integrate with string input");
assertNaN(integrate(() => { throw new Error(); }, 0, 2), "integrate with throwing function");

// Test approximateLimit
// Limit of (x^2 - 1)/(x - 1) as x -> 1 is 2
const limitFunc = (x) => (x * x - 1) / (x - 1);
const limit = approximateLimit(limitFunc, 1);
assertApprox(limit, 2, 0.01);

// Test invalid input for approximateLimit
assertNaN(approximateLimit("not a function", 1), "approximateLimit with string input");
assertNaN(approximateLimit(() => { throw new Error(); }, 1), "approximateLimit with throwing function");

// Test areaUnderCurve
// Area under 2x from 0 to 2 is 4
const area = areaUnderCurve((x) => 2 * x, 0, 2);
assertApprox(area, 4, 0.1); // Riemann sum might be less accurate

// Test invalid input for areaUnderCurve
assertNaN(areaUnderCurve("not a function", 0, 2), "areaUnderCurve with string input");
assertNaN(areaUnderCurve(() => { throw new Error(); }, 0, 2), "areaUnderCurve with throwing function");

// Test powerRuleDerivative
// d/dx(3x^2) at x=2 -> 3*2*2^(2-1) = 12
const powerDeriv = powerRuleDerivative(3, 2, 2);
assertApprox(powerDeriv, 12, 0.001);

// Test invalid input for powerRuleDerivative
assertNaN(powerRuleDerivative("3", 2, 2), "powerRuleDerivative with string input");

// Test getTangentLine
const tangent = getTangentLine(2, functions.quadratic, functions.quadraticDerivative);
// Tangent at x=2 for x^2-2x+3 (y=3, slope=2) -> y = 2(x-2) + 3 = 2x - 1
// At x=3, y should be 5
assertApprox(tangent(3), 5, 0.001);

// Test invalid input for getTangentLine
const invalidTangent = getTangentLine(2, "not a function", functions.quadraticDerivative);
assertNaN(invalidTangent(3), "getTangentLine with invalid f returns function returning NaN");

const throwingTangent = getTangentLine(2, () => { throw new Error(); }, functions.quadraticDerivative);
assertNaN(throwingTangent(3), "getTangentLine with throwing f returns function returning NaN");

console.log('--- All Tests Passed ---');
