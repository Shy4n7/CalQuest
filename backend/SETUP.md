# CalQuest Backend - Simple Setup (SQLite)

## 🚀 Super Simple Setup (2 Commands!)

### 1. Create .env file
```bash
cd backend
copy .env.example .env
```

Edit `.env` and change this ONE line:
```
DATABASE_URL="file:./dev.db"
```

That's it! No PostgreSQL needed - uses SQLite (file-based database)

### 2. Setup & Start
```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

✅ **Done!** Server running at **http://localhost:5000**

---

## 📝 Demo Login

- **Username:** `shyanpaul`  
- **Password:** `password123`

Or try `einstein` / `newton` with same password!

---

## 🧪 Test It

Open browser: http://localhost:5000/health

Should show: `{"status":"ok","message":"CalQuest API is running"}`

---

## 📁 Database File

Your database is saved as `backend/prisma/dev.db` - a single file!

No installation needed, no server to run. Simple! 🎉
