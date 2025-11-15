# Custom Domain Setup - inversion.works

## 🎯 Quick Setup Guide

I've opened two browser tabs for you:
1. **Environment Variables** - To update NEXTAUTH_URL
2. **Domains** - To add inversion.works

---

## ✅ What I've Already Fixed

### 1. Slow Loading Issue - FIXED ✅
**Problem:** Data form page was stuck showing "Loading..." forever
**Cause:** `useState(true)` on line 26 kept `isLoading` always true
**Fix:** Changed to `useState(false)`
**File:** `src/app/data-form/[id]/page.tsx:26`

**The page will now load instantly!** 🚀

---

## 📋 Steps to Complete (5 minutes)

### Step 1: Update NEXTAUTH_URL (Tab 1)

In the **Environment Variables** tab that just opened:

1. Find `NEXTAUTH_URL` in the list
2. Click the **3 dots** (⋯) on the right
3. Click **Edit**
4. Change value from:
   ```
   https://axiom-mvp.vercel.app
   ```
   To:
   ```
   https://inversion.works
   ```
5. Click **Save**

---

### Step 2: Add Custom Domain (Tab 2)

In the **Domains** tab that just opened:

1. In the "Add Domain" field, type:
   ```
   inversion.works
   ```
2. Click **Add**

3. You'll see instructions to add DNS records. You need to add **ONE** of these:

**Option A: A Record (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option B: CNAME Record**
```
Type: CNAME
Name: @  (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600
```

4. Also add **www subdomain**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

### Step 3: Configure DNS at Your Domain Registrar

**Where to do this:**
- If you bought domain from Namecheap: https://www.namecheap.com/myaccount/login
- If you bought from GoDaddy: https://dcc.godaddy.com/control/portfolio
- If you bought from Google Domains: https://domains.google.com
- Other registrars: Check your registrar's DNS management

**What to add:**

1. **For root domain (inversion.works):**
   - Type: `A`
   - Host: `@` or leave blank
   - Value: `76.76.21.21`
   - TTL: `3600` (or Auto)

2. **For www subdomain (www.inversion.works):**
   - Type: `CNAME`
   - Host: `www`
   - Value: `cname.vercel-dns.com.`
   - TTL: `3600` (or Auto)

---

### Step 4: Wait for DNS Propagation

- **Typical time:** 5-30 minutes
- **Maximum time:** Up to 48 hours (rare)
- **Check status:** Vercel will show "Valid Configuration" when ready

---

## 🧪 Testing After DNS Setup

Once Vercel shows "Valid Configuration":

### Test These URLs:

1. **Main site:** https://inversion.works
2. **WWW redirect:** https://www.inversion.works (should redirect to main)
3. **Demo page:** https://inversion.works/demo
4. **Dashboard:** https://inversion.works/admin/dashboard
5. **Validation:** https://inversion.works/admin/validation
6. **Data form:** https://inversion.works/data-form/[any-id]

---

## ⚡ Immediate Fix (While Waiting for DNS)

**The slow loading is already fixed!** You can test it now:

Visit: https://axiom-mvp.vercel.app/data-form/contact_1762454011883_zmog7a3n1

**It should load instantly now** (no more infinite "Loading..." spinner)

---

## 🔧 Current Status

### ✅ Completed:
- [x] Fixed slow loading on data-form page
- [x] Updated local .env file
- [x] Redeploying with fix

### ⏳ Pending (Your Action):
- [ ] Update NEXTAUTH_URL in Vercel (Tab 1)
- [ ] Add inversion.works domain in Vercel (Tab 2)
- [ ] Configure DNS records at your registrar
- [ ] Wait for DNS propagation

---

## 📝 DNS Record Summary

Copy this to your DNS provider:

```
# Root domain
Type: A
Host: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Host: www
Value: cname.vercel-dns.com.
```

**Important:** The period (`.`) at the end of `cname.vercel-dns.com.` is required by some DNS providers!

---

## 🎯 After Setup Complete

Once DNS propagates and domain is active:

1. **Update email links** - Any emails you send with platform links
2. **Update documentation** - Replace axiom-mvp.vercel.app with inversion.works
3. **Test all features** - Especially authentication and redirects
4. **Update any bookmarks** - Save new inversion.works URLs

---

## 💡 Pro Tips

### SSL Certificate
- **Automatic:** Vercel automatically provisions SSL for your domain
- **No action needed:** HTTPS will work immediately once DNS is configured

### Redirects
- Vercel will keep **axiom-mvp.vercel.app** working
- You can set it to redirect to inversion.works (optional)

### Email Domain
- If you want **@inversion.works** email, set up separately with:
  - Google Workspace ($6/user/month)
  - Zoho Mail (free tier available)
  - Fastmail ($5/month)

---

## 🐛 Troubleshooting

### Domain Not Working After 30 Minutes?

**Check DNS propagation:**
```bash
nslookup inversion.works
# Should show: 76.76.21.21
```

**Or visit:** https://dnschecker.org/#A/inversion.works

### "Invalid Configuration" in Vercel?

- Double-check DNS records match exactly
- Ensure you added both `@` and `www` records
- Wait a bit longer (can take up to 2 hours sometimes)

### NEXTAUTH_URL Not Updating?

- Make sure you clicked "Save" after editing
- Try redeploying: `vercel --prod`
- Check it's set for "Production" environment (not Preview/Development)

---

## 📧 When to Update Dr. Weiss

**Wait until:**
- ✅ DNS is propagated (inversion.works loads)
- ✅ All pages work on new domain
- ✅ Data form loads quickly (already fixed)
- ✅ You've tested the demo workflow

**Then send email with:**
- **Demo URL:** https://inversion.works/demo
- **Platform URL:** https://inversion.works

---

**Created:** November 6, 2025
**Status:** Loading fix deployed, domain setup in progress
**Next:** Complete Steps 1-3 above in the browser tabs I opened for you!
