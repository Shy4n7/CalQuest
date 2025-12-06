# CalQuest Backend

Production-ready backend API for CalQuest - A gamified calculus learning platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16
- Redis (optional for caching)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Seed database with demo data
npm run prisma:seed

# Start development server
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### User
- `GET /api/user/profile/:username` - Get user profile
- `POST /api/user/daily-checkin` - Daily check-in for streak
- `PUT /api/user/update-progress` - Update lesson progress
- `GET /api/user/achievements` - Get user achievements

### Lessons
- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons/:id/submit` - Submit lesson answers
- `GET /api/lessons/:id/hint` - Get hint for exercise

### Leaderboard
- `GET /api/leaderboard/global` - Top 100 users
- `GET /api/leaderboard/weekly` - Weekly leaderboard
- `GET /api/leaderboard/friends` - Friends leaderboard

### Gamification
- `GET /api/gamification/streak` - Get streak status
- `GET /api/gamification/achievements` - Get all achievements
- `GET /api/gamification/notifications` - Get recent notifications

## 🎮 Features

- ✅ JWT Authentication with httpOnly cookies
- ✅ 30 Complete Lessons (5 modules × 6 lessons)
- ✅ Automatic Grading System
- ✅ XP & Level Progression
- ✅ Streak Tracking
- ✅ Achievement System
- ✅ Real-time Leaderboards
- ✅ Redis Caching
- ✅ Rate Limiting
- ✅ Input Validation (Zod)
- ✅ Socket.io Real-time Updates

## 🗄️ Database Schema

- **User** - User accounts with progress tracking
- **LessonProgress** - Individual lesson completion data
- **Achievement** - Unlocked achievements
- **LeaderboardEntry** - User rankings

## 🔧 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npm test             # Run tests
```

## 🌐 Environment Variables

See `.env.example` for required environment variables.

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Socket.io
- JWT
- Bcrypt
- Zod

## 👨‍💻 Author

shyanpaul - CalQuest Backend

## 📄 License

MIT
