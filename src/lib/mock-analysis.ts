// Mock analysis engine for immediate functionality
export interface MockAnalysisResults {
  projectedLifespanMonths: number
  capitalAvoidance: number
  p95SafeLifeMonths: number
  keyFindings: string[]
  capacityEstimate: number
  ebctCalculated: number
  removalEfficiency: number
  costPerMillionGallons: number
}

export function performMockAnalysis(formData: any): MockAnalysisResults { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Extract key parameters
  const flowRate = formData.flowRate || 1
  const bedVolume = formData.bedVolume || 100
  const targetRemovalEfficiency = formData.targetRemovalEfficiency || 95 // eslint-disable-line @typescript-eslint/no-unused-vars
  const safetyFactor = formData.safetyFactor || 1.5
  
  // Calculate EBCT (Empty Bed Contact Time)
  const ebctCalculated = (bedVolume / flowRate) * 24 // hours
  
  // Calculate removal efficiency based on EBCT
  const removalEfficiency = Math.min(95, Math.max(60, 60 + (ebctCalculated - 5) * 2))
  
  // Calculate projected lifespan (simplified model)
  const baseLifespan = 24 // months
  const ebctFactor = Math.min(2, ebctCalculated / 10)
  const flowFactor = Math.max(0.5, 2 - (flowRate / 10))
  const projectedLifespanMonths = Math.round(baseLifespan * ebctFactor * flowFactor * safetyFactor)
  
  // Calculate capital avoidance
  const replacementCost = 500000 // $500k per bed
  const capitalAvoidance = replacementCost * 0.8 // 80% of replacement cost
  
  // Calculate P95 safe life (95th percentile)
  const p95SafeLifeMonths = Math.round(projectedLifespanMonths * 0.7)
  
  // Calculate capacity estimate
  const capacityEstimate = Math.round(flowRate * 24 * 365 * 0.8) // 80% utilization
  
  // Calculate cost per million gallons
  const annualFlow = flowRate * 24 * 365
  const costPerMillionGallons = Math.round((replacementCost / projectedLifespanMonths) * 12 / (annualFlow / 1000000))
  
  // Generate key findings
  const keyFindings = [
    `EBCT of ${ebctCalculated.toFixed(1)} hours provides ${removalEfficiency.toFixed(1)}% removal efficiency`,
    `Projected bed life of ${projectedLifespanMonths} months with ${safetyFactor}x safety factor`,
    `Capital avoidance of $${capitalAvoidance.toLocaleString()} over bed lifetime`,
    `Cost per million gallons treated: $${costPerMillionGallons}`,
    `Recommended monitoring frequency: ${Math.max(1, Math.round(projectedLifespanMonths / 6))} times per year`
  ]
  
  return {
    projectedLifespanMonths,
    capitalAvoidance,
    p95SafeLifeMonths,
    keyFindings,
    capacityEstimate,
    ebctCalculated,
    removalEfficiency,
    costPerMillionGallons
  }
}

export function generateMockReport(analysisResults: MockAnalysisResults, formData: any, contactRequest: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  return {
    id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    contactRequestId: contactRequest.id,
    pdfUrl: `/reports/mock-report-${Date.now()}.pdf`,
    projectedLifespanMonths: analysisResults.projectedLifespanMonths,
    capitalAvoidance: analysisResults.capitalAvoidance,
    p95SafeLifeMonths: analysisResults.p95SafeLifeMonths,
    createdAt: new Date().toISOString()
  }
}
