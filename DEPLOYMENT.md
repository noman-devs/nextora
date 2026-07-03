# Deployment Info

## Domain
meetnextora.com

## GitHub Repository
https://github.com/noman-devs/nextora.git

## MongoDB Atlas (Free Tier)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a free M0 cluster (choose a region close to you)
3. Under **Database Access**, create a database user with a username and password
4. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere (required for Vercel)
5. Go to **Database** → **Connect** → **Connect your application**
6. Copy the connection string and replace `<password>` with your database user's password

### Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@cluster.xxxxx.mongodb.net/nextora?retryWrites=true&w=majority
```

## Vercel Deployment
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js — keep the default settings
4. Add environment variables (see below)
5. Deploy

### Environment Variables (set in Vercel)
| Key | Value |
|---|---|
| `DATABASE_URL` | Your MongoDB Atlas connection string (from above) |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` to generate |
| `NEXTAUTH_URL` | `https://meetnextora.com` |
| `ADMIN_EMAIL` | `admin@nextora.com` |
| `ADMIN_PASSWORD` | Your chosen admin password |

### Vercel Build Settings
- **Install command:** `npm ci`
- **Build command:** `prisma generate && next build`
- **Output directory:** `.next`
- **Node.js version:** 20

## After First Deploy
Push your schema to MongoDB Atlas:
```bash
npx prisma db push
npx prisma db seed
```

Or run locally before deploying:
```bash
npx prisma db push
npx prisma db seed
git add .
git commit -m "seed database"
git push
```

## Local Development
1. Copy `.env.example` to `.env`
2. Update `DATABASE_URL` with your MongoDB Atlas connection string
3. Run:
```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run dev
```
