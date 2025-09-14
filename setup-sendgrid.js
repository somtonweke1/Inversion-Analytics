#!/usr/bin/env node

/**
 * SendGrid Setup Script
 * Quick setup for SendGrid email service
 */

console.log('📧 SendGrid Email Setup for Inversion Analytics')
console.log('=' * 50)

console.log('\n🎯 Why SendGrid?')
console.log('• More generous testing limits than Resend')
console.log('• Can send to any email address immediately')
console.log('• Professional email delivery')
console.log('• Easy setup and configuration')

console.log('\n📝 Quick Setup Steps:')
console.log('')
console.log('1. 🌐 Create SendGrid Account:')
console.log('   • Go to: https://sendgrid.com')
console.log('   • Sign up for free account')
console.log('   • Verify your email address')
console.log('')
console.log('2. 🔑 Get API Key:')
console.log('   • Go to Settings > API Keys')
console.log('   • Create API Key with "Mail Send" permissions')
console.log('   • Copy the API key (starts with "SG.")')
console.log('')
console.log('3. ⚙️  Set Environment Variables:')
console.log('   vercel env add SENDGRID_API_KEY production')
console.log('   # Paste your SendGrid API key')
console.log('   ')
console.log('   vercel env add FROM_EMAIL production')
console.log('   # Value: noreply@inversionanalytics.com (or your domain)')
console.log('')
console.log('4. 🚀 Deploy Changes:')
console.log('   git add .')
console.log('   git commit -m "Add SendGrid email service"')
console.log('   git push origin main')
console.log('')

console.log('✅ Benefits:')
console.log('• Send emails to any address immediately')
console.log('• No domain verification required for testing')
console.log('• Professional email templates')
console.log('• Reliable delivery')
console.log('')

console.log('💰 Pricing:')
console.log('• Free tier: 100 emails/day')
console.log('• Paid plans start at $19.95/month')
console.log('• Perfect for MVP and testing')
console.log('')

console.log('🔄 Alternative: Keep Resend + Domain Verification')
console.log('If you prefer to stick with Resend:')
console.log('• Follow the domain verification guide')
console.log('• More control over email branding')
console.log('• Better long-term solution')
console.log('')

console.log('🎉 Ready to set up SendGrid?')
console.log('Follow the steps above and your emails will work immediately!')

