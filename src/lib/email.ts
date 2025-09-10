import { Resend } from 'resend'
import EmailWithLink from '@/components/emails/EmailWithLink'
import ReportReadyEmail from '@/components/emails/ReportReadyEmail'

const hasResendKey = Boolean(process.env.RESEND_API_KEY)
const resend = hasResendKey ? new Resend(process.env.RESEND_API_KEY) : null as unknown as Resend

export async function sendDataFormEmail({
  contactName,
  contactEmail,
  companyName,
  dataFormUrl,
}: {
  contactName: string
  contactEmail: string
  companyName: string
  dataFormUrl: string
}) {
  try {
    if (!hasResendKey) {
      console.warn('[email] RESEND_API_KEY not set; skipping sendDataFormEmail. Intended for local dev.')
      return { id: 'dev-skip' }
    }
    const { data, error } = await resend.emails.send({
      from: 'Inversion Analytics <noreply@inversionanalytics.com>',
      to: [contactEmail],
      subject: 'Complete Your GAC System Analysis - Inversion Analytics',
      react: EmailWithLink({
        contactName,
        companyName,
        dataFormUrl,
      }),
    })

    if (error) {
      console.error('Error sending data form email:', error)
      throw new Error('Failed to send email')
    }

    return data
  } catch (error) {
    console.error('Error in sendDataFormEmail:', error)
    throw error
  }
}

export async function sendReportReadyEmail({
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
}) {
  try {
    if (!hasResendKey) {
      console.warn('[email] RESEND_API_KEY not set; skipping sendReportReadyEmail. Intended for local dev.')
      return { id: 'dev-skip' }
    }
    const { data, error } = await resend.emails.send({
      from: 'Inversion Analytics <noreply@inversionanalytics.com>',
      to: [contactEmail],
      subject: 'Your GAC System Analysis is Ready - Inversion Analytics',
      react: ReportReadyEmail({
        contactName,
        companyName,
        reportUrl,
        projectedLifespanMonths,
        capitalAvoidance,
        p95SafeLifeMonths,
      }),
    })

    if (error) {
      console.error('Error sending report ready email:', error)
      throw new Error('Failed to send email')
    }

    return data
  } catch (error) {
    console.error('Error in sendReportReadyEmail:', error)
    throw error
  }
}

export async function sendAdminNotification({
  companyName,
  contactName,
  contactEmail,
  reportUrl,
  projectedLifespanMonths,
}: {
  companyName: string
  contactName: string
  contactEmail: string
  reportUrl: string
  projectedLifespanMonths: number
}) {
  try {
    if (!hasResendKey) {
      console.warn('[email] RESEND_API_KEY not set; skipping sendAdminNotification. Intended for local dev.')
      return { id: 'dev-skip' }
    }
    const { data, error } = await resend.emails.send({
      from: 'Inversion Analytics <noreply@inversionanalytics.com>',
      to: [process.env.ADMIN_EMAIL || 'admin@axiomanalytics.com'],
      subject: `New GAC Analysis Completed - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New GAC Analysis Completed</h2>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Contact:</strong> ${contactName} (${contactEmail})</p>
          <p><strong>Projected Lifespan:</strong> ${projectedLifespanMonths.toFixed(1)} months</p>
          <p><strong>Report URL:</strong> <a href="${reportUrl}">View Report</a></p>
          <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending admin notification:', error)
      throw new Error('Failed to send admin notification')
    }

    return data
  } catch (error) {
    console.error('Error in sendAdminNotification:', error)
    throw error
  }
}


