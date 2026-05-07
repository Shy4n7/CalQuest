import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    userId?: string;
    user?: any;
}

const getSecret = (key: string, defaultVal: string): string => {
    const value = process.env[key];
    if (!value) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error(`${key} is not defined in environment variables`);
        }
        console.warn(`Warning: ${key} is not defined, using default secret`);
        return defaultVal;
    }
    return value;
};

const JWT_ACCESS_SECRET = getSecret('JWT_ACCESS_SECRET', 'default-secret');
const JWT_REFRESH_SECRET = getSecret('JWT_REFRESH_SECRET', 'default-refresh-secret');

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (error) {
        return null;
    }
};

export const verifyRefreshToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
};

// Auth middleware
export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = verifyAccessToken(token);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed' });
    }
};

// Optional auth (doesn't fail if no token)
export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace('Bearer ', '');

        if (token) {
            const decoded = verifyAccessToken(token);
            if (decoded) {
                req.userId = decoded.userId;
            }
        }
        next();
    } catch (error) {
        next();
    }
};
