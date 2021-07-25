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
6. Seed the database
```bash
cd backend
```
```bash
npm run seed
```
7. Run App
```bash
npm run start
```