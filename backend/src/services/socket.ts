import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { verifyAccessToken } from '../middleware/auth';

let io: Server | null = null;

export const initializeSocket = (httpServer: HTTPServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        },
    });

    // Authentication middleware for Socket.io
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if (!token) {
            return next(new Error('Authentication error'));
        }

        const decoded = verifyAccessToken(token);

        if (!decoded) {
            return next(new Error('Invalid token'));
        }

        socket.data.userId = decoded.userId;
        next();
    });

    io.on('connection', (socket) => {
        console.log(`✅ User connected: ${socket.data.userId}`);

        // Join user's personal room
        socket.join(`user:${socket.data.userId}`);

        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${socket.data.userId}`);
        });
    });

    console.log('✅ Socket.io initialized');
    return io;
};

export const getIO = (): Server => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

// Emit events to specific users or broadcast
export const emitToUser = (userId: string, event: string, data: any) => {
    if (io) {
        io.to(`user:${userId}`).emit(event, data);
    }
};

export const broadcastToAll = (event: string, data: any) => {
    if (io) {
        io.emit(event, data);
    }
};

// Specific event emitters
export const emitLeaderboardUpdate = (data: any) => {
    broadcastToAll('leaderboard:update', data);
};

export const emitAchievementUnlock = (userId: string, achievement: any) => {
    emitToUser(userId, 'achievement:unlock', achievement);
};

export const emitStreakMilestone = (userId: string, data: any) => {
    emitToUser(userId, 'streak:milestone', data);
};

export const emitDailyReset = () => {
    broadcastToAll('daily:reset', { message: 'Daily goals have been reset!' });
};
