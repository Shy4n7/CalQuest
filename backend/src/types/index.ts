export interface Lesson {
    id: string;
    title: string;
    module: 'limits' | 'derivatives' | 'powerRule' | 'integrals' | 'astrophysics';
    level: number;
    explanation: string;
    visualization: {
        type: string;
        params: Record<string, any>;
    };
    exercises: Exercise[];
    xpReward: number;
}

export interface Exercise {
    id: string;
    question: string;
    type: 'multiple_choice' | 'fill_blank';
    options?: string[];
    correct: number | string;
    explanation: string;
    hint?: string;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    avatar?: string;
    streak: number;
    xp: number;
    level: number;
    dailyGoal: boolean;
    progress: {
        limits: number;
        derivatives: number;
        powerRule: number;
        integrals: number;
        astrophysics: number;
    };
    createdAt: Date;
}

export interface LeaderboardUser {
    rank: number;
    username: string;
    avatar?: string;
    xp: number;
    level: number;
}

export interface AchievementData {
    id: string;
    name: string;
    icon: string;
    description: string;
    requirement: (user: any) => boolean;
}
