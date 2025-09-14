/**
 * Email Setup Configuration
 * Handles domain verification and email sending strategies
 */

export interface EmailConfig {
  fromEmail: string
  fromName: string
  domainVerified: boolean
  fallbackEnabled: boolean
}

export const getEmailConfig = (): EmailConfig => {
  const isProduction = process.env.NODE_ENV === 'production'
  const hasCustomDomain = Boolean(process.env.FROM_EMAIL)
  
  return {
    fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    fromName: process.env.FROM_NAME || 'Inversion Analytics',
    domainVerified: hasCustomDomain,
    fallbackEnabled: !isProduction
  }
}

export const getEmailStatus = () => {
  const config = getEmailConfig()
  
  if (!config.domainVerified) {
    return {
      status: 'restricted',
      message: 'Using Resend testing domain. Emails limited to verified addresses only.',
      recommendation: 'Verify a custom domain in Resend dashboard to send to any address.',
      canSend: false
    }
  }
  
  return {
    status: 'verified',
    message: 'Custom domain verified. Can send to any email address.',
    recommendation: 'Email sending fully enabled.',
    canSend: true
  }
}

export const getEmailInstructions = () => {
  return {
    setup: {
      title: 'Email Setup Instructions',
      steps: [
        '1. Go to Resend Dashboard (https://resend.com/domains)',
        '2. Add your domain (e.g., inversionanalytics.com)',
        '3. Add DNS records:',
        '   - SPF: v=spf1 include:_spf.resend.com ~all',
        '   - DKIM: (provided by Resend)',
        '   - DMARC: v=DMARC1; p=quarantine; rua=mailto:dmarc@inversionanalytics.com',
        '4. Verify domain in Resend',
        '5. Set environment variables:',
        '   - FROM_EMAIL=noreply@inversionanalytics.com',
        '   - FROM_NAME=Inversion Analytics',
        '6. Redeploy application'
      ]
    },
    alternatives: [
      'SendGrid (more generous testing limits)',
      'Mailgun (good for transactional emails)', 
      'Amazon SES (cost-effective for high volume)'
    ]
  }
}

