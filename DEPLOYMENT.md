# Deployment Info — Nextora Agency

> **IMPORTANT:** This file contains ALL project credentials, links, and configuration.
> Any AI model or developer reading this file should have full context to make changes.
> Read this file FIRST before making any deployment or code changes.

---

## Project Overview

- **Project Name:** nextora-agency
- **Framework:** Next.js 16 (App Router) + TypeScript
- **ORM:** Prisma 6.x (MongoDB provider)
- **Database:** MongoDB Atlas (free M0 cluster)
- **Hosting:** Vercel (auto-deploy from GitHub)
- **Auth:** NextAuth.js v5 (JWT strategy, Credentials provider)

---

## Live URLs

| Service | URL |
|---|---|
| **Website** | https://meetnextora.com |
| **Admin Panel** | https://meetnextora.com/admin/login |
| **GitHub Repo** | https://github.com/noman-devs/nextora.git |

---

## Credentials

### Admin Login (Admin Panel)
| Field | Value |
|---|---|
| URL | https://meetnextora.com/admin/login |
| Email | `admin@nextora.com` |
| Password | `admin123` |

### MongoDB Atlas
| Field | Value |
|---|---|
| Cluster Name | `nextora-production` |
| Database User | `nextora` |
| Database Password | `Noman9250` |
| Database Name | `nextora` |
| Connection String | `mongodb+srv://nextora:Noman9250@nextora-production.e90ktm0.mongodb.net/nextora?retryWrites=true&w=majority&appName=nextora-production` |
| Atlas Dashboard | https://cloud.mongodb.com (login with your MongoDB account) |

### Vercel
| Field | Value |
|---|---|
| Dashboard | https://vercel.com |
| Project Name | (auto-named from repo) |
| Node.js Version | 20 |

### GitHub
| Field | Value |
|---|---|
| Repo URL | https://github.com/noman-devs/nextora.git |
| Branch | `master` |
| Git User | noman-devs |

---

## Environment Variables (exact values for Vercel)

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

| Key | Value | Environment |
|---|---|---|
| `DATABASE_URL` | `mongodb+srv://nextora:Noman9250@nextora-production.e90ktm0.mongodb.net/nextora?retryWrites=true&w=majority&appName=nextora-production` | Production, Preview, Development |
| `NEXTAUTH_SECRET` | `iz2qOeLaXMaiQu7UIalL9g0j894a01bT87DsygDu2Tc=` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://meetnextora.com` | Production |
| `ADMIN_EMAIL` | `admin@nextora.com` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `admin123` | Production, Preview, Development |

---

## Domain / DNS (Hostinger)

**Domain Provider:** Hostinger (hpanel.hostinger.com)

DNS records pointing to Vercel:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 14400 |
| CNAME | `www` | `cname.vercel-dns.com` | 14400 |

SSL is automatic via Vercel (HTTPS enabled).

---

## MongoDB Collections

Database name: `nextora`

| Collection | Model | Purpose |
|---|---|---|
| `users` | User | Admin users for login |
| `leads` | Lead | Contact form submissions |
| `blog_posts` | BlogPost | Blog articles (CMS) |
| `portfolio_projects` | PortfolioProject | Portfolio items |
| `testimonials` | Testimonial | Client testimonials |
| `services` | ServiceItem | Services offered |
| `subscribers` | Subscriber | Newsletter subscribers |
| `media` | Media | Uploaded media files |
| `settings` | Setting | Global site settings (JSON) |

---

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes (Next.js Route Handlers)
│   │   ├── auth/      # NextAuth.js (Credentials provider)
│   │   ├── blog/      # Blog CRUD
│   │   ├── leads/     # Contact form leads
│   │   ├── media/     # Media uploads
│   │   ├── portfolio/ # Portfolio CRUD
│   │   ├── services/  # Services CRUD
│   │   ├── settings/  # Global settings
│   │   ├── subscribers/ # Newsletter
│   │   └── testimonials/ # Testimonials CRUD
│   ├── admin/         # Admin panel pages
│   └── (public pages) # Public-facing pages
├── components/        # React components
├── generated/prisma/  # Auto-generated Prisma Client (DO NOT EDIT)
├── lib/
│   ├── prisma.ts      # Prisma client singleton
│   ├── auth.ts        # Password hashing + seed helper
│   └── utils.ts       # Utility functions
└── types/             # TypeScript type definitions

prisma/
├── schema.prisma      # Database schema (MongoDB)
├── seed.ts            # Seeds admin user
└── prisma.config.ts   # Prisma config (datasource URL from .env)
```

---

## Build & Deploy Commands

### Local Development
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### After Code Push (GitHub auto-deploys to Vercel)
```bash
git add .
git commit -m "your message"
git push origin master
```

### If Database Schema Changes (after editing prisma/schema.prisma)
```bash
npx prisma db push          # Push schema changes to MongoDB
npx prisma generate         # Regenerate Prisma Client
npx prisma db seed          # Re-seed (if seed.ts changed)
```

### Seed Admin User (if needed)
```bash
npx prisma db seed
```

---

## Key Technical Notes

1. **Prisma 6.x** is used (NOT 7.x) because MongoDB is not yet supported in Prisma 7.
2. **Prisma Client** is generated to `src/generated/prisma/` (custom output path).
3. **No driver adapter needed** — Prisma connects to MongoDB natively.
4. **Auth is JWT-based** (no database sessions) via NextAuth v5 Credentials provider.
5. **JSON fields** (images, results, tags, features) are stored as strings in MongoDB, parsed with `JSON.parse()` in the app.
6. **Build command** includes `prisma generate` before `next build`.
7. **ESLint** ignores `src/generated/**` (auto-generated Prisma files).

---

## Common Tasks

### Change Admin Password
1. Update `ADMIN_PASSWORD` in `.env` file
2. Update it in Vercel Environment Variables
3. Delete old admin from MongoDB Atlas (users collection) or run `npx prisma db seed` (will not overwrite existing user — delete first)

### Add New API Route
Create file in `src/app/api/<resource>/route.ts` following existing patterns.

### View Database
Go to MongoDB Atlas Dashboard → Database → Browse Collections

### Redeploy on Vercel
Vercel Dashboard → Deployments → click "..." on latest → Redeploy
