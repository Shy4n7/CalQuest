import prisma from '../src/services/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('🌱 Starting seed...');

    // Create demo users
    const users = [
        {
            email: 'shyan@calquest.com',
            username: 'shyanpaul',
            xp: 5000,
            level: 22,
            streak: 15,
        },
        {
            email: 'einstein@calquest.com',
            username: 'einstein',
            xp: 10000,
            level: 31,
            streak: 100,
        },
        {
            email: 'newton@calquest.com',
            username: 'newton',
            xp: 8000,
            level: 28,
            streak: 50,
        },
    ];

    for (const userData of users) {
        const passwordHash = await bcrypt.hash('password123', 12);

        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: {
                ...userData,
                passwordHash,
                progress: JSON.stringify({
                    limits: 100,
                    derivatives: 83,
                    powerRule: 67,
                    integrals: 50,
                    astrophysics: 33,
                }),
            },
        });

        console.log(`✅ Created user: ${user.username}`);

        // Add some lesson progress for demo users
        if (user.username === 'shyanpaul') {
            // Complete first 15 lessons
            for (let i = 1; i <= 6; i++) {
                await prisma.lessonProgress.create({
                    data: {
                        userId: user.id,
                        lessonId: `limits_${i}`,
                        completed: true,
                        score: 90 + Math.floor(Math.random() * 10),
                        attempts: 1,
                        bestScore: 95,
                        completedAt: new Date(),
                    },
                });
            }

            for (let i = 1; i <= 5; i++) {
                await prisma.lessonProgress.create({
                    data: {
                        userId: user.id,
                        lessonId: `derivatives_${i}`,
                        completed: true,
                        score: 85 + Math.floor(Math.random() * 15),
                        attempts: 1,
                        bestScore: 92,
                        completedAt: new Date(),
                    },
                });
            }

            // Add achievements
            await prisma.achievement.createMany({
                data: [
                    {
                        userId: user.id,
                        name: 'First Steps',
                        icon: '🎯',
                    },
                    {
                        userId: user.id,
                        name: 'Streak Master',
                        icon: '🔥',
                    },
                    {
                        userId: user.id,
                        name: 'Limit Legend',
                        icon: '🎓',
                    },
                ],
            });
        }
    }

    // Create leaderboard entries
    for (const userData of users) {
        const user = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (user) {
            await prisma.leaderboardEntry.upsert({
                where: { userId: user.id },
                update: {
                    xp: user.xp,
                    level: user.level,
                    rank: 0, // Will be calculated later
                },
                create: {
                    userId: user.id,
                    xp: user.xp,
                    level: user.level,
                    rank: 0,
                },
            });
        }
    }

    // Update ranks
    const allUsers = await prisma.user.findMany({
        orderBy: { xp: 'desc' },
    });

    for (let i = 0; i < allUsers.length; i++) {
        await prisma.leaderboardEntry.update({
            where: { userId: allUsers[i].id },
            data: { rank: i + 1 },
        });
    }

    console.log('✅ Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
