/**
 * SendGrid Email Service
 * Alternative email service with more generous testing limits
 */

import sgMail from '@sendgrid/mail'

const hasSendGridKey = Boolean(process.env.SENDGRID_API_KEY)
if (hasSendGridKey) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
}

export interface SendGridResult {
  success: boolean
  id?: string
  error?: string
  warning?: string
  deliveryMethod: 'sendgrid' | 'fallback' | 'mock'
}

export async function sendEmailViaSendGrid({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}): Promise<SendGridResult> {
  
  // Check if SendGrid is configured
  if (!hasSendGridKey) {
    return {
      success: true,
      id: `mock-sendgrid-${Date.now()}`,
      warning: `Mock SendGrid email sent to ${to}. Set SENDGRID_API_KEY to enable real delivery.`,
      deliveryMethod: 'mock'
    }
  }

  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'noreply@inversionanalytics.com',
      subject,
      text,
      html,
    }

    const response = await sgMail.send(msg)
    
    return {
      success: true,
      id: response[0]?.headers?.['x-message-id'] || `sendgrid-${Date.now()}`,
      deliveryMethod: 'sendgrid'
    }
  } catch (error: any) {
    console.error('SendGrid error:', error)
    
    return {
      success: false,
      error: error.message || 'SendGrid delivery failed',
      deliveryMethod: 'sendgrid'
    }
  }
}

export async function sendDataFormEmailViaSendGrid({
  contactName,
  contactEmail,
  companyName,
  dataFormUrl,
}: {
  contactName: string
  contactEmail: string
  companyName: string
  dataFormUrl: string
}): Promise<SendGridResult> {
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Inversion Analytics</h1>
        <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">GAC System Analysis Platform</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${contactName},</h2>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Thank you for requesting a GAC system analysis for <strong>${companyName}</strong>.
        </p>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Your secure data submission link is ready. Click the button below to complete your analysis:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${dataFormUrl}" 
             style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            Complete Your Analysis
          </a>
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">What to Expect:</h3>
          <ul style="color: #92400e; margin: 0; padding-left: 20px;">
            <li>Comprehensive system analysis</li>
            <li>Optimization recommendations</li>
            <li>Cost savings projections</li>
            <li>Implementation roadmap</li>
          </ul>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          This link expires in 7 days. If you have any questions, please contact our support team.
        </p>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="color: #64748b; font-size: 12px; text-align: center;">
          © 2024 Inversion Analytics. All rights reserved.
        </p>
      </div>
    </div>
  `

  const text = `
Hello ${contactName},

Thank you for requesting a GAC system analysis for ${companyName}.

Your secure data submission link: ${dataFormUrl}

What to Expect:
- Comprehensive system analysis
- Optimization recommendations  
- Cost savings projections
- Implementation roadmap

This link expires in 7 days.

Best regards,
Inversion Analytics Team
  `

  return await sendEmailViaSendGrid({
    to: contactEmail,
    subject: `Complete Your GAC System Analysis - ${companyName}`,
    html,
    text
  })
}

export async function sendReportReadyEmailViaSendGrid({
  contactName,
  contactEmail,
  companyName,
  reportUrl,
  projectedLifespanMonths,
  capitalAvoidance,
  p95SafeLifeMonths,
}: {
  contactName: string
  contactEmail: string
  companyName: string
  reportUrl: string
  projectedLifespanMonths: number
  capitalAvoidance: number
  p95SafeLifeMonths: number
}): Promise<SendGridResult> {
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✅ Analysis Complete!</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Your GAC system analysis is ready</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${contactName},</h2>
        
        <p style="color: #475569; font-size: 16px; line-height: 1.6;">
          Great news! Your GAC system analysis for <strong>${companyName}</strong> is complete.
        </p>
        
        <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #065f46; margin: 0 0 15px 0;">Key Findings:</h3>
          <ul style="color: #065f46; margin: 0; padding-left: 20px;">
            <li><strong>Projected Bed Life:</strong> ${projectedLifespanMonths.toFixed(1)} months</li>
            <li><strong>Potential Savings:</strong> $${capitalAvoidance.toLocaleString()}</li>
            <li><strong>95% Confidence Life:</strong> ${p95SafeLifeMonths.toFixed(1)} months</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${reportUrl}" 
             style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            View Full Report
          </a>
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #92400e; margin: 0 0 10px 0;">Next Steps:</h3>
          <ul style="color: #92400e; margin: 0; padding-left: 20px;">
            <li>Review the detailed analysis report</li>
            <li>Consider implementation support options</li>
            <li>Schedule a consultation call</li>
          </ul>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
          Questions? Contact our expert team for personalized guidance.
        </p>
      </div>
    </div>
  `

  const text = `
Hello ${contactName},

Your GAC system analysis for ${companyName} is complete!

Key Findings:
- Projected Bed Life: ${projectedLifespanMonths.toFixed(1)} months
- Potential Savings: $${capitalAvoidance.toLocaleString()}
- 95% Confidence Life: ${p95SafeLifeMonths.toFixed(1)} months

View your full report: ${reportUrl}

Next Steps:
- Review the detailed analysis report
- Consider implementation support options
- Schedule a consultation call

Best regards,
Inversion Analytics Team
  `

  return await sendEmailViaSendGrid({
    to: contactEmail,
    subject: `Your GAC System Analysis is Ready - ${companyName}`,
    html,
    text
  })
}
