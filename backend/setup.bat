@echo off
echo ========================================
echo CalQuest Backend - Quick Setup Script
echo ========================================
echo.

REM Check if .env exists
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit .env file and add:
    echo    - DATABASE_URL
    echo    - JWT_ACCESS_SECRET
    echo    - JWT_REFRESH_SECRET
    echo.
    pause
)

echo Installing dependencies...
call npm install
echo.

echo Generating Prisma client...
call npx prisma generate
echo.

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file with your database URL
echo 2. Run: npx prisma migrate dev --name init
echo 3. Run: npm run prisma:seed
echo 4. Run: npm run dev
echo.
pause
