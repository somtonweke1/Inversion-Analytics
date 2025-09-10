import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { AnalysisResults } from '@/lib/analysis-engine'
import { DataSubmissionFormData } from '@/lib/validations'

// Register fonts for better styling
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf' },
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhp.ttf', fontWeight: 'bold' }
  ]
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    backgroundColor: '#f1f5f9',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    color: '#475569',
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  highlightBox: {
    backgroundColor: '#dbeafe',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  findingsList: {
    marginTop: 10,
  },
  finding: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 5,
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#64748b',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
})

interface ReportPDFProps {
  analysisResults: AnalysisResults
  formData: DataSubmissionFormData
  contactRequest: {
    companyName: string
    contactName: string
    contactEmail: string
  }
}

export const ReportPDF = ({ analysisResults, formData, contactRequest }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Inversion Analytics GAC System Report</Text>
        <Text style={styles.subtitle}>Company: {contactRequest.companyName}</Text>
        <Text style={styles.subtitle}>Contact: {contactRequest.contactName}</Text>
        <Text style={styles.subtitle}>Generated: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Executive Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Projected System Lifespan</Text>
          <Text style={styles.highlightValue}>{analysisResults.projectedLifespanMonths.toFixed(1)} months</Text>
        </View>
        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>95% Confidence Interval</Text>
          <Text style={styles.highlightValue}>{analysisResults.p95SafeLifeMonths.toFixed(1)} months</Text>
        </View>
        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Annual Capital Avoidance</Text>
          <Text style={styles.highlightValue}>${analysisResults.capitalAvoidance.toLocaleString()}</Text>
        </View>
      </View>

      {/* System Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Configuration</Text>
        <View style={styles.row}>
          <Text style={styles.label}>System Type:</Text>
          <Text style={styles.value}>{formData.systemType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vessel Diameter:</Text>
          <Text style={styles.value}>{formData.vesselDiameter} m</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vessel Height:</Text>
          <Text style={styles.value}>{formData.vesselHeight} m</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Flow Rate:</Text>
          <Text style={styles.value}>{formData.flowRate} m³/h</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Bed Height:</Text>
          <Text style={styles.value}>{formData.bedHeight} m</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Calculated EBCT:</Text>
          <Text style={styles.value}>{analysisResults.ebctCalculated.toFixed(1)} minutes</Text>
        </View>
      </View>

      {/* Water Quality Parameters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Water Quality Parameters</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Organic Carbon:</Text>
          <Text style={styles.value}>{formData.toc} mg/L</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sulfate:</Text>
          <Text style={styles.value}>{formData.sulfate} mg/L</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Chloride:</Text>
          <Text style={styles.value}>{formData.chloride} mg/L</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>pH:</Text>
          <Text style={styles.value}>{formData.ph}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Temperature:</Text>
          <Text style={styles.value}>{formData.temperature}°C</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total PFAS:</Text>
          <Text style={styles.value}>{formData.totalPfasConcentration} ng/L</Text>
        </View>
      </View>

      {/* GAC Properties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GAC Properties</Text>
        <View style={styles.row}>
          <Text style={styles.label}>GAC Type:</Text>
          <Text style={styles.value}>{formData.gacType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Density:</Text>
          <Text style={styles.value}>{formData.gacDensity} kg/m³</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Particle Size:</Text>
          <Text style={styles.value}>{formData.gacParticleSize} mm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Iodine Number:</Text>
          <Text style={styles.value}>{formData.gacIodineNumber} mg/g</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Surface Area:</Text>
          <Text style={styles.value}>{formData.gacSurfaceArea} m²/g</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estimated Capacity:</Text>
          <Text style={styles.value}>{analysisResults.capacityEstimate.toFixed(2)} mg/g</Text>
        </View>
      </View>

      {/* Performance Analysis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Analysis</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Removal Efficiency:</Text>
          <Text style={styles.value}>{analysisResults.removalEfficiency.toFixed(1)}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cost per Million Gallons:</Text>
          <Text style={styles.value}>${analysisResults.costPerMillionGallons.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Safety Factor Applied:</Text>
          <Text style={styles.value}>{formData.safetyFactor}</Text>
        </View>
      </View>

      {/* Key Findings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Findings & Recommendations</Text>
        <View style={styles.findingsList}>
          {analysisResults.keyFindings.map((finding, index) => (
            <Text key={index} style={styles.finding}>
              • {finding}
            </Text>
          ))}
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        This report was generated by Inversion Analytics using advanced modeling algorithms.
        For questions or additional analysis, contact admin@axiomanalytics.com
      </Text>
    </Page>
  </Document>
)


