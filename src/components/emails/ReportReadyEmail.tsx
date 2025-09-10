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

interface ReportReadyEmailProps {
  contactName: string
  companyName: string
  reportUrl: string
  projectedLifespanMonths: number
  capitalAvoidance: number
  p95SafeLifeMonths: number
}

export const ReportReadyEmail = ({
  contactName,
  companyName,
  reportUrl,
  projectedLifespanMonths,
  capitalAvoidance,
  p95SafeLifeMonths,
}: ReportReadyEmailProps) => (
  <Html>
    <Head />
    <Preview>Your GAC system analysis is ready - Inversion Analytics</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={logo}>Inversion Analytics</Heading>
        </Section>
        
        <Heading style={h1}>Your Analysis is Ready!</Heading>
        
        <Text style={text}>
          Hello {contactName},
        </Text>
        
        <Text style={text}>
          Great news! Your comprehensive GAC system analysis for {companyName} has been completed. 
          Our advanced modeling algorithms have processed your data and generated detailed insights 
          about your system&apos;s performance and optimization opportunities.
        </Text>
        
        <Section style={summaryContainer}>
          <Heading style={summaryTitle}>Analysis Summary</Heading>
          <Text style={summaryItem}>
            <strong>Projected Lifespan:</strong> {projectedLifespanMonths.toFixed(1)} months
          </Text>
          <Text style={summaryItem}>
            <strong>95% Confidence Interval:</strong> {p95SafeLifeMonths.toFixed(1)} months
          </Text>
          <Text style={summaryItem}>
            <strong>Annual Capital Avoidance:</strong> ${capitalAvoidance.toLocaleString()}
          </Text>
        </Section>
        
        <Text style={text}>
          Your detailed report includes:
        </Text>
        
        <Text style={list}>
          • Advanced Freundlich Isotherm modeling results<br/>
          • Monte Carlo uncertainty analysis<br/>
          • Economic optimization recommendations<br/>
          • Risk assessment and safety factors<br/>
          • Specific actionable insights for your system
        </Text>
        
        <Section style={buttonContainer}>
          <Link href={reportUrl} style={button}>
            Download Your Report
          </Link>
        </Section>
        
        <Text style={text}>
          The report is available for download and contains comprehensive analysis of your 
          GAC system performance, lifespan projections, and cost optimization opportunities.
        </Text>
        
        <Text style={text}>
          If you have any questions about the analysis or would like to discuss the results 
          with our team, please contact us at admin@axiomanalytics.com.
        </Text>
        
        <Text style={text}>
          Thank you for choosing Inversion Analytics for your GAC system optimization needs.
        </Text>
        
        <Text style={text}>
          Best regards,<br/>
          The Inversion Analytics Team
        </Text>
        
        <Section style={footer}>
          <Text style={footerText}>
            This report is confidential and intended for {companyName} use only.
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

const summaryContainer = {
  backgroundColor: '#f1f5f9',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
}

const summaryTitle = {
  color: '#1e40af',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
}

const summaryItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 8px',
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

export default ReportReadyEmail


