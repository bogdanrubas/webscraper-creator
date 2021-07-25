# Instructions
Follow the steps below to run the application

1. Install frontend dependencies:
```bash
cd frontend
```
```bash
npm i
```

2. Install backend dependecies:
```bash
cd backend
```
```bash
npm i
```

3. Update your backend/.env file

4. Prisma Migrate
```bash
cd backend
```
```bash
npx prisma migrate dev
```

5. Generate Prisma Client JS
```bash
cd backend
```
```bash
npx prisma generate
```
6. Run App
```bash
npm run start
```

7. Compile files
Create an account > create new crawler > edit crawler > add depths and fill inputs > save crawler.
Compiled files are in backend/compiled directory.