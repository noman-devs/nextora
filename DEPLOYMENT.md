# Deployment Info

## Domain
meetnextora.com

## GitHub Repository
https://github.com/noman-devs/nextora.git

## Hostinger MySQL Database
- **Database Name:** u874096019_nextora
- **Database Username:** u874096019_nextora
- **Database Password:** (stored in .env locally, set in Hostinger env vars)
- **Host:** Find in Hostinger hPanel → MySQL Databases (not localhost)

### Connection String Format
```
mysql://u874096019_nextora:YOUR_PASSWORD@HOSTINGER_MYSQL_HOST:3306/u874096019_nextora
```

> Replace `HOSTINGER_MYSQL_HOST` with the actual MySQL host from hPanel

## Environment Variables (set in Hostinger)
| Key | Value |
|---|---|
| `DATABASE_URL` | See connection string above |
| `NEXTAUTH_SECRET` | Generate via `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://meetnextora.com` |
| `ADMIN_EMAIL` | `admin@nextora.com` |
| `ADMIN_PASSWORD` | Your chosen password |

## Hostinger Build Settings
- **Install command:** `npm ci`
- **Build command:** `npm run build`
- **Start command:** `npm run start -- -p $PORT`
- **Node.js version:** 20

## After First Deploy
Run these via Hostinger terminal:
```bash
npx prisma migrate deploy
npx prisma db seed
```
