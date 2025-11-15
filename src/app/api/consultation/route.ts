import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Consultation request received:', body)

    const { companyName, contactName, contactEmail, implementationPackage, message, reportId } = body

    // Basic validation
    if (!companyName || !contactName || !contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'somtonweke1@gmail.com'

    // Send email to admin
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">📅 New Consultation Request</h1>
          <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 16px;">Implementation Support Inquiry</p>
        </div>

        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">New Consultation Request</h2>

          <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>
            <p style="margin: 5px 0;"><strong>Contact Name:</strong> ${contactName}</p>
            <p style="margin: 5px 0;"><strong>Contact Email:</strong> <a href="mailto:${contactEmail}">${contactEmail}</a></p>
            <p style="margin: 5px 0;"><strong>Package:</strong> ${implementationPackage || 'Not specified'}</p>
            ${reportId ? `<p style="margin: 5px 0;"><strong>Report ID:</strong> ${reportId}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          ${message ? `
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin: 0 0 10px 0;">Message:</h3>
              <p style="color: #92400e; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          ` : ''}

          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${contactEmail}"
               style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              Reply to ${contactName}
            </a>
          </div>
        </div>
      </div>
    `

    const text = `
New Consultation Request

Company: ${companyName}
Contact Name: ${contactName}
Contact Email: ${contactEmail}
Package: ${implementationPackage || 'Not specified'}
${reportId ? `Report ID: ${reportId}` : ''}
Submitted: ${new Date().toLocaleString()}

${message ? `Message:\n${message}` : ''}

Reply to: ${contactEmail}
    `

    const result = await sendEmail({
      to: adminEmail,
      subject: `New Consultation Request - ${companyName}`,
      html,
      text
    })

    console.log('Email result:', result)

    // Also send confirmation to customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">✅ Consultation Request Received</h1>
          <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">We'll contact you within 24 hours</p>
        </div>

        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${contactName},</h2>

          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Thank you for requesting a consultation with Inversion Analytics!
          </p>

          <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #065f46; margin: 0 0 15px 0;">Your Request Details:</h3>
            <ul style="color: #065f46; margin: 0; padding-left: 20px;">
              <li><strong>Company:</strong> ${companyName}</li>
              <li><strong>Package:</strong> ${implementationPackage || 'To be discussed'}</li>
              <li><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>

          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Our team will review your request and reach out within 24 hours to schedule your consultation.
          </p>

          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            Questions in the meantime? Reply to this email or contact us at ${adminEmail}
          </p>
        </div>
      </div>
    `

    const confirmationText = `
Hello ${contactName},

Thank you for requesting a consultation with Inversion Analytics!

Your Request Details:
- Company: ${companyName}
- Package: ${implementationPackage || 'To be discussed'}
- Submitted: ${new Date().toLocaleString()}

Our team will review your request and reach out within 24 hours to schedule your consultation.

Questions in the meantime? Reply to this email or contact us at ${adminEmail}

Best regards,
Inversion Analytics Team
    `

    await sendEmail({
      to: contactEmail,
      subject: 'Consultation Request Received - Inversion Analytics',
      html: confirmationHtml,
      text: confirmationText
    })

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      emailResult: result
    })

  } catch (error) {
    console.error('Error processing consultation request:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
