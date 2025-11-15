# Deployment Guide - Inversion Analytics Platform

## Deployment Status: ✅ SUCCESSFUL

**Production URL:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app

**Deployment Time:** November 6, 2025

---

## What Was Deployed

### Build Status: ✅ Successful
- Production build completed without errors
- Only minor ESLint warnings (non-blocking)
- All 24 routes generated successfully
- Bundle size optimized

### Features Deployed:
1. ✅ Admin Dashboard with Project Map
2. ✅ Validation Study Interface
3. ✅ Breakthrough Curve Modeling (Thomas Model)
4. ✅ Monte Carlo Simulation (Box-Muller, 5000 iterations)
5. ✅ Hazen Dataset Import/Export
6. ✅ Interactive Geographic Maps (Leaflet)
7. ✅ Data Submission Forms
8. ✅ PDF Report Generation
9. ✅ Client Projects Interface

---

## Next Steps Required

### 1. Set Up Database

The app is currently deployed but needs a database connection. You have two options:

#### Option A: Use Vercel Postgres (Recommended)
1. Go to your Vercel dashboard: https://vercel.com/somtonweke1s-projects/axiom-mvp
2. Navigate to the **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Follow the prompts to create a database
5. Vercel will automatically add the `DATABASE_URL` environment variable

#### Option B: Use External PostgreSQL
1. Set up a PostgreSQL database (e.g., Supabase, Railway, Neon)
2. Get the connection string
3. Add it to Vercel environment variables:
   - Go to: https://vercel.com/somtonweke1s-projects/axiom-mvp/settings/environment-variables
   - Add `DATABASE_URL` = your connection string

### 2. Configure Environment Variables

Add these environment variables in Vercel Dashboard:

**Required:**
- `DATABASE_URL` - PostgreSQL connection string (added automatically if using Vercel Postgres)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Set to: `https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app`

**Optional:**
- `ADMIN_EMAIL` - Admin login email (default: admin@axiomanalytics.com)
- `ADMIN_PASSWORD` - Admin login password (default: admin123)
- `RESEND_API_KEY` - For email functionality (get from https://resend.com)

**How to Add:**
1. Go to: https://vercel.com/somtonweke1s-projects/axiom-mvp/settings/environment-variables
2. Click **Add New**
3. Enter key and value
4. Select **Production** environment
5. Click **Save**

### 3. Run Database Migration

After setting up the database and environment variables:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Pull environment variables from Vercel
vercel env pull

# Run Prisma migration
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

OR directly on Vercel (add to package.json):
```json
{
  "scripts": {
    "postbuild": "prisma migrate deploy"
  }
}
```

Then redeploy:
```bash
vercel --prod
```

### 4. Seed Production Database (Optional)

To populate with test data:

```bash
# After pulling env vars and running migrations
npx tsx prisma/seed.ts

# Or add to package.json:
"seed": "npx tsx prisma/seed.ts"
```

---

## Testing the Deployment

### Basic Health Check

1. **Home Page:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app
   - Should load without errors

2. **Admin Login:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/admin/login
   - Test credentials: admin@axiomanalytics.com / admin123

3. **Admin Dashboard:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/admin/dashboard
   - Should show project statistics
   - Map should render (after database is set up)

4. **Validation Page:** https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app/admin/validation
   - Upload demo-hazen-dataset.json
   - Verify charts render

### Expected Issues (Before Database Setup)

Until you configure the database, you'll see errors like:
- "PrismaClientInitializationError"
- "Can't reach database server"
- API endpoints returning 500 errors

This is normal and will be resolved after Step 1 above.

---

## User Testing Guide

### For External Users

**Demo Access Page:**
Create a simple demo page at `/demo` that explains:
1. What the platform does
2. How to upload test data
3. Expected results

**Test Dataset:**
Provide `demo-hazen-dataset.json` for users to download and upload

**Test Flow:**
1. Visit validation page: `/admin/validation`
2. Download template
3. Upload demo dataset
4. Verify breakthrough curves render
5. Check validation metrics

---

## Monitoring & Logs

**View Deployment Logs:**
```bash
vercel logs https://axiom-gzp3hpzmg-somtonweke1s-projects.vercel.app
```

**Inspect Deployment:**
https://vercel.com/somtonweke1s-projects/axiom-mvp/nfufetJEYgrvuGFYXorn3bFssn1a

**Common Issues:**

1. **Database connection errors:**
   - Check `DATABASE_URL` environment variable
   - Verify database is accessible from Vercel's IP addresses

2. **NextAuth errors:**
   - Verify `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches production URL

3. **Map not rendering:**
   - Check browser console for Leaflet errors
   - Verify database has projects with lat/long data

---

## Deployment Commands Reference

```bash
# Deploy to production
vercel --prod

# Pull environment variables
vercel env pull

# View logs
vercel logs

# Inspect specific deployment
vercel inspect <deployment-url>

# Redeploy
vercel redeploy <deployment-url>

# Local development
npm run dev

# Build locally (test)
npm run build

# Database migrations
npx prisma migrate deploy
npx prisma generate
npx prisma studio  # Database GUI
```

---

## Production Checklist

Before announcing to users:

- [ ] Database configured and connected
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Test data seeded (optional)
- [ ] Admin login working
- [ ] Dashboard map displays
- [ ] Validation page accepts uploads
- [ ] Breakthrough curves render
- [ ] No console errors
- [ ] Mobile responsive testing
- [ ] Email functionality tested (if using Resend)

---

## Custom Domain (Optional)

To use a custom domain:

1. Go to: https://vercel.com/somtonweke1s-projects/axiom-mvp/settings/domains
2. Add your domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

---

## Support

**Vercel Documentation:**
- https://vercel.com/docs
- https://vercel.com/docs/storage/vercel-postgres

**Prisma Documentation:**
- https://www.prisma.io/docs/orm/prisma-migrate

**Next.js Documentation:**
- https://nextjs.org/docs

---

**Last Updated:** November 6, 2025
**Status:** ✅ Deployed, Awaiting Database Configuration
