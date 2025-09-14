# Email Setup Guide for Inversion Analytics

## Current Issue
Resend's testing domain (`onboarding@resend.dev`) has restrictions that prevent sending emails to arbitrary addresses. This is causing the email stress test to fail.

## Solutions

### Option 1: Quick Fix - Use Development Mode
For testing purposes, we can modify the email function to handle the restrictions gracefully.

### Option 2: Production Solution - Domain Verification (Recommended)

#### Step 1: Verify Your Domain in Resend
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain (e.g., `inversionanalytics.com`)
3. Add the required DNS records:
   - **SPF Record**: `v=spf1 include:_spf.resend.com ~all`
   - **DKIM Record**: Provided by Resend
   - **DMARC Record**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@inversionanalytics.com`

#### Step 2: Update Email Configuration
```typescript
// Update src/lib/email.ts
from: 'Inversion Analytics <noreply@inversionanalytics.com>'
```

#### Step 3: Update Environment Variables
```bash
vercel env add FROM_EMAIL production
# Value: noreply@inversionanalytics.com
```

### Option 3: Alternative Email Service
Consider using:
- **SendGrid** (more generous testing limits)
- **Mailgun** (good for transactional emails)
- **Amazon SES** (cost-effective for high volume)

## Current Status
- ✅ Email functions are implemented
- ✅ API endpoints are working
- ❌ Domain restrictions preventing delivery
- ❌ Need domain verification or alternative service

## Next Steps
1. Choose your preferred solution (domain verification recommended)
2. Implement the chosen solution
3. Test email delivery end-to-end
4. Deploy to production with working email functionality

