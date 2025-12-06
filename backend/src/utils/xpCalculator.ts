// XP and Level Calculation Utilities

/**
 * Calculate user level based on total XP
 * Formula: Level = floor(sqrt(XP / 100))
 */
export const calculateLevel = (xp: number): number => {
    return Math.floor(Math.sqrt(xp / 100));
};

/**
 * Calculate XP required for next level
 */
export const calculateXPForNextLevel = (currentLevel: number): number => {
    return (currentLevel + 1) ** 2 * 100;
};

/**
 * Calculate XP earned for completing a lesson
 * @param score - Score percentage (0-100)
 * @param isFirstAttempt - Whether this is the first attempt
 * @param streak - Current user streak
 */
export const calculateLessonXP = (
    score: number,
    isFirstAttempt: boolean = false,
    streak: number = 0
): number => {
    let xp = 25; // Base XP

    // First attempt bonus
    if (isFirstAttempt) {
        xp += 10;
    }

    // Perfect score bonus
    if (score === 100) {
        xp += 15;
    }

    // Streak multiplier (1.1x per day, max 2x)
    const streakMultiplier = Math.min(1 + (streak * 0.1), 2);
    xp = Math.round(xp * streakMultiplier);

    return xp;
};

/**
 * Calculate progress percentage for a module
 */
export const calculateModuleProgress = (completedLessons: number, totalLessons: number = 6): number => {
    return Math.round((completedLessons / totalLessons) * 100);
};
