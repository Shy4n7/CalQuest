import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
});

redis.on('connect', () => {
    console.log('✅ Redis connected successfully');
});

redis.on('error', (error) => {
    console.error('❌ Redis connection error:', error);
});

// Cache helper functions
export const cacheGet = async (key: string): Promise<any> => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Redis GET error:', error);
        return null;
    }
};

export const cacheSet = async (key: string, value: any, ttl: number = 300): Promise<void> => {
    try {
        await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
        console.error('Redis SET error:', error);
    }
};

export const cacheDel = async (key: string): Promise<void> => {
    try {
        await redis.del(key);
    } catch (error) {
        console.error('Redis DEL error:', error);
    }
};

export default redis;
