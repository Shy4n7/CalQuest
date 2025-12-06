// Astrophysics Constants and Conversion Utilities

// Fundamental Constants
export const CONSTANTS = {
    // Gravitational constant (m³/kg·s²)
    G: 6.674e-11,

    // Speed of light (m/s)
    c: 299792458,

    // Hubble constant (km/s/Mpc) - current best estimate
    H0: 70,

    // Astronomical Unit (m) - Earth-Sun distance
    AU: 1.496e11,

    // Parsec (m)
    parsec: 3.086e16,

    // Light year (m)
    lightYear: 9.461e15,

    // Solar mass (kg)
    solarMass: 1.989e30,

    // Earth mass (kg)
    earthMass: 5.972e24,

    // Solar radius (m)
    solarRadius: 6.96e8,

    // Earth radius (m)
    earthRadius: 6.371e6,

    // Megaparsec (m)
    Mpc: 3.086e22,

    // Planck constant (J·s)
    h: 6.626e-34,

    // Boltzmann constant (J/K)
    k: 1.381e-23,

    // Stefan-Boltzmann constant (W/m²·K⁴)
    sigma: 5.670e-8,
};

// Unit Conversions
export const convert = {
    // Distance conversions
    metersToAU: (m) => m / CONSTANTS.AU,
    metersToLightYears: (m) => m / CONSTANTS.lightYear,
    metersToParsecs: (m) => m / CONSTANTS.parsec,
    metersToKm: (m) => m / 1000,

    AUtoMeters: (au) => au * CONSTANTS.AU,
    lightYearsToMeters: (ly) => ly * CONSTANTS.lightYear,
    parsecsToMeters: (pc) => pc * CONSTANTS.parsec,
    kmToMeters: (km) => km * 1000,

    // Velocity conversions
    msToKms: (ms) => ms / 1000,
    kmsToMs: (kms) => kms * 1000,
    velocityToC: (v) => v / CONSTANTS.c,

    // Mass conversions
    kgToSolarMass: (kg) => kg / CONSTANTS.solarMass,
    solarMassToKg: (sm) => sm * CONSTANTS.solarMass,
    kgToEarthMass: (kg) => kg / CONSTANTS.earthMass,
    earthMassToKg: (em) => em * CONSTANTS.earthMass,

    // Time conversions
    secondsToYears: (s) => s / (365.25 * 24 * 3600),
    yearsToSeconds: (y) => y * 365.25 * 24 * 3600,
    secondsToDays: (s) => s / (24 * 3600),
    daysToSeconds: (d) => d * 24 * 3600,
};

// Common Astrophysics Calculations
export const calculations = {
    // Schwarzschild radius: r_s = 2GM/c²
    schwarzschildRadius: (mass) => {
        return (2 * CONSTANTS.G * mass) / (CONSTANTS.c ** 2);
    },

    // Escape velocity: v = √(2GM/r)
    escapeVelocity: (mass, radius) => {
        return Math.sqrt((2 * CONSTANTS.G * mass) / radius);
    },

    // Orbital velocity: v = √(GM/r)
    orbitalVelocity: (mass, radius) => {
        return Math.sqrt((CONSTANTS.G * mass) / radius);
    },

    // Orbital period: T = 2π√(r³/GM)
    orbitalPeriod: (mass, radius) => {
        return 2 * Math.PI * Math.sqrt((radius ** 3) / (CONSTANTS.G * mass));
    },

    // Gravitational force: F = GMm/r²
    gravitationalForce: (mass1, mass2, distance) => {
        return (CONSTANTS.G * mass1 * mass2) / (distance ** 2);
    },

    // Gravitational potential energy: U = -GMm/r
    gravitationalPotentialEnergy: (mass1, mass2, distance) => {
        return -(CONSTANTS.G * mass1 * mass2) / distance;
    },

    // Redshift: z = (λ_obs - λ_emit) / λ_emit
    redshift: (observedWavelength, emittedWavelength) => {
        return (observedWavelength - emittedWavelength) / emittedWavelength;
    },

    // Velocity from redshift (non-relativistic): v = cz
    velocityFromRedshift: (z) => {
        if (z < 0.1) {
            // Non-relativistic approximation
            return CONSTANTS.c * z;
        } else {
            // Relativistic formula: v = c[(1+z)² - 1] / [(1+z)² + 1]
            const factor = (1 + z) ** 2;
            return CONSTANTS.c * (factor - 1) / (factor + 1);
        }
    },

    // Distance from Hubble's law: d = v / H₀
    hubbleDistance: (velocity) => {
        // Convert H₀ from km/s/Mpc to m/s/m
        const H0_SI = (CONSTANTS.H0 * 1000) / CONSTANTS.Mpc;
        return velocity / H0_SI;
    },

    // Parallax distance: d = 1/p (p in arcseconds, d in parsecs)
    parallaxDistance: (parallaxArcsec) => {
        return 1 / parallaxArcsec;
    },

    // Kepler's Third Law: T² = (4π²/GM) × a³
    keplerPeriodFromSemiMajorAxis: (mass, semiMajorAxis) => {
        return Math.sqrt((4 * Math.PI ** 2 * semiMajorAxis ** 3) / (CONSTANTS.G * mass));
    },

    keplerSemiMajorAxisFromPeriod: (mass, period) => {
        return Math.cbrt((CONSTANTS.G * mass * period ** 2) / (4 * Math.PI ** 2));
    },

    // Luminosity from Stefan-Boltzmann: L = 4πR²σT⁴
    luminosity: (radius, temperature) => {
        return 4 * Math.PI * radius ** 2 * CONSTANTS.sigma * temperature ** 4;
    },

    // Wien's displacement law: λ_max = b/T (b = 2.898e-3 m·K)
    wienPeakWavelength: (temperature) => {
        return 2.898e-3 / temperature;
    },

    // Time dilation near massive object: t' = t√(1 - r_s/r)
    timeDilation: (mass, radius) => {
        const rs = calculations.schwarzschildRadius(mass);
        if (radius <= rs) return Infinity; // Inside event horizon
        return Math.sqrt(1 - rs / radius);
    },
};

// Formatting utilities
export const format = {
    scientific: (num, decimals = 2) => {
        return num.toExponential(decimals);
    },

    withUnits: (value, unit) => {
        if (Math.abs(value) >= 1e9) {
            return `${(value / 1e9).toFixed(2)} G${unit}`;
        } else if (Math.abs(value) >= 1e6) {
            return `${(value / 1e6).toFixed(2)} M${unit}`;
        } else if (Math.abs(value) >= 1e3) {
            return `${(value / 1e3).toFixed(2)} k${unit}`;
        } else {
            return `${value.toFixed(2)} ${unit}`;
        }
    },

    distance: (meters) => {
        const ly = convert.metersToLightYears(meters);
        const pc = convert.metersToParsecs(meters);
        const au = convert.metersToAU(meters);

        if (ly > 1) {
            return `${ly.toFixed(2)} light-years`;
        } else if (pc > 0.01) {
            return `${pc.toFixed(4)} parsecs`;
        } else if (au > 1) {
            return `${au.toFixed(2)} AU`;
        } else {
            return format.withUnits(meters, 'm');
        }
    },

    velocity: (ms) => {
        const kms = convert.msToKms(ms);
        const fractionOfC = convert.velocityToC(ms);

        if (fractionOfC > 0.01) {
            return `${(fractionOfC * 100).toFixed(2)}% speed of light`;
        } else {
            return `${kms.toFixed(2)} km/s`;
        }
    },

    time: (seconds) => {
        const years = convert.secondsToYears(seconds);
        const days = convert.secondsToDays(seconds);

        if (years > 1) {
            return `${years.toFixed(2)} years`;
        } else if (days > 1) {
            return `${days.toFixed(2)} days`;
        } else if (seconds > 3600) {
            return `${(seconds / 3600).toFixed(2)} hours`;
        } else if (seconds > 60) {
            return `${(seconds / 60).toFixed(2)} minutes`;
        } else {
            return `${seconds.toFixed(2)} seconds`;
        }
    },
};

export default { CONSTANTS, convert, calculations, format };
