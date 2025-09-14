import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface EmailWithLinkProps {
  contactName: string
  companyName: string
  dataFormUrl: string
}

export const EmailWithLink = ({
  contactName,
  companyName,
  dataFormUrl,
}: EmailWithLinkProps) => (
  <Html>
    <Head />
    <Preview>Complete your GAC system analysis - Inversion Analytics</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={logo}>Inversion Analytics</Heading>
        </Section>
        
        <Heading style={h1}>Complete Your GAC System Analysis</Heading>
        
        <Text style={text}>
          Hello {contactName},
        </Text>
        
        <Text style={text}>
          Thank you for requesting a GAC system analysis for {companyName}. 
          We&apos;re excited to help you optimize your Granular Activated Carbon system performance.
        </Text>
        
        <Text style={text}>
          To get started, please click the button below to access our secure data collection form. 
          This form will gather the technical details needed for our advanced analysis.
        </Text>
        
        <Section style={buttonContainer}>
          <Link href={dataFormUrl} style={button}>
            Complete Your Analysis
          </Link>
        </Section>
        
        <Text style={text}>
          The form will take approximately 10-15 minutes to complete and includes questions about:
        </Text>
        
        <Text style={list}>
          • System configuration and dimensions<br/>
          • Water quality parameters<br/>
          • PFAS concentrations<br/>
          • GAC properties and specifications<br/>
          • Economic parameters and operating conditions
        </Text>
        
        <Text style={text}>
          Once you submit the form, our advanced modeling algorithms will analyze your data 
          and generate a comprehensive report with lifespan projections, cost optimization 
          insights, and actionable recommendations.
        </Text>
        
        <Text style={text}>
          If you have any questions or need assistance, please don&apos;t hesitate to contact us 
          at admin@inversionanalytics.com.
        </Text>
        
        <Text style={text}>
          Best regards,<br/>
          The Inversion Analytics Team
        </Text>
        
        <Section style={footer}>
          <Text style={footerText}>
            This link is secure and will expire in 7 days. If you didn&apos;t request this analysis, 
            please ignore this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  color: '#2563eb',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
}

const h1 = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

const list = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
  paddingLeft: '16px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  borderTop: '1px solid #e5e7eb',
  marginTop: '32px',
  paddingTop: '16px',
}

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  textAlign: 'center' as const,
}

export default EmailWithLink

