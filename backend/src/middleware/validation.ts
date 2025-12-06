import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Validation schemas
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username must be at most 20 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const lessonSubmitSchema = z.object({
    lessonId: z.string().min(1, 'Lesson ID is required'),
    answers: z.array(z.union([z.number(), z.string()])),
    timeTaken: z.number().min(1).max(3600, 'Time taken must be between 1 and 3600 seconds'),
});

export const updateProfileSchema = z.object({
    avatar: z.string().url().optional(),
    dailyGoal: z.boolean().optional(),
});

// Validation middleware factory
export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
                });
            }
            next(error);
        }
    };
};
