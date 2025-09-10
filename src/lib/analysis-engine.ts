import { DataSubmissionFormData } from './validations'

export interface AnalysisResults {
  projectedLifespanMonths: number
  capitalAvoidance: number
  p95SafeLifeMonths: number
  keyFindings: string[]
  capacityEstimate: number
  ebctCalculated: number
  removalEfficiency: number
  costPerMillionGallons: number
}

/**
 * Calculate Empty Bed Contact Time (EBCT) in minutes
 */
export function calculateEBCT(formData: DataSubmissionFormData): number {
  const { bedVolume, flowRate } = formData
  return (bedVolume / flowRate) * 60 // Convert hours to minutes
}

/**
 * Estimate GAC capacity using Freundlich Isotherm model
 * Based on PFAS concentration, TOC, sulfate, and system type
 */
export function estimateCapacityWithFreundlich(
  pfasConcentration: number,
  toc: number,
  sulfate: number,
  systemType: string
): number {
  // Freundlich isotherm parameters (empirically derived)
  const k = 0.15 // Freundlich constant
  const n = 0.7  // Freundlich exponent
  
  // Base capacity calculation using Freundlich equation
  const baseCapacity = k * Math.pow(pfasConcentration, 1/n)
  
  // Adjust for water quality factors
  const tocFactor = Math.max(0.5, 1 - (toc / 10)) // TOC reduces capacity
  const sulfateFactor = Math.max(0.7, 1 - (sulfate / 200)) // Sulfate competes for sites
  const systemFactor = systemType === 'Fluidized Bed' ? 1.1 : 1.0 // Fluidized beds slightly more efficient
  
  const adjustedCapacity = baseCapacity * tocFactor * sulfateFactor * systemFactor
  
  return Math.max(0.1, adjustedCapacity) // Minimum capacity of 0.1 mg/g
}

/**
 * Run Monte Carlo simulation for uncertainty analysis
 */
export function runMonteCarloSimulation(
  projectedLife: number,
  uncertainty: number = 0.18,
  iterations: number = 5000
): { mean: number; p95: number; p5: number } {
  const results: number[] = []
  
  for (let i = 0; i < iterations; i++) {
    // Generate random factor with normal distribution
    const randomFactor = 1 + (Math.random() - 0.5) * uncertainty * 2
    const simulatedLife = projectedLife * randomFactor
    results.push(Math.max(0, simulatedLife)) // Ensure non-negative
  }
  
  // Sort results for percentile calculation
  results.sort((a, b) => a - b)
  
  const mean = results.reduce((sum, val) => sum + val, 0) / results.length
  const p95Index = Math.floor(results.length * 0.95)
  const p5Index = Math.floor(results.length * 0.05)
  
  return {
    mean,
    p95: results[p95Index],
    p5: results[p5Index]
  }
}

/**
 * Calculate removal efficiency based on system parameters
 */
export function calculateRemovalEfficiency(formData: DataSubmissionFormData): number {
  const { ebct, gacIodineNumber, ph, temperature } = formData
  
  // Base efficiency from EBCT (longer contact time = higher efficiency)
  const ebctFactor = Math.min(0.99, 0.7 + (ebct / 30) * 0.25)
  
  // GAC quality factor (higher iodine number = better efficiency)
  const gacFactor = Math.min(1.0, 0.5 + (gacIodineNumber / 2000) * 0.4)
  
  // pH factor (optimal around 7-8)
  const phFactor = ph >= 6 && ph <= 8 ? 1.0 : 0.8
  
  // Temperature factor (higher temp = better efficiency up to 25°C)
  const tempFactor = Math.min(1.0, 0.7 + (temperature / 25) * 0.3)
  
  const efficiency = ebctFactor * gacFactor * phFactor * tempFactor
  return Math.min(0.99, Math.max(0.5, efficiency)) * 100 // Return as percentage
}

/**
 * Calculate cost per million gallons treated
 */
export function calculateCostPerMillionGallons(formData: DataSubmissionFormData, lifespanMonths: number): number {
  const { 
    gacCostPerKg, 
    gacDensity, 
    bedVolume, 
    flowRate, 
    operatingDaysPerYear, 
    operatingHoursPerDay,
    replacementCost,
    laborCost,
    disposalCost
  } = formData
  
  // Calculate total GAC mass
  const gacMass = bedVolume * gacDensity // kg
  
  // Calculate annual flow
  const annualFlow = flowRate * operatingHoursPerDay * operatingDaysPerYear // m³/year
  const annualFlowMG = annualFlow * 0.000264172 // Convert m³ to million gallons
  
  // Calculate costs over lifespan
  const gacCost = gacMass * gacCostPerKg
  const totalReplacementCost = replacementCost + laborCost + disposalCost
  
  // Annualize costs
  const annualGACCost = gacCost / (lifespanMonths / 12)
  const annualReplacementCost = totalReplacementCost / (lifespanMonths / 12)
  
  const totalAnnualCost = annualGACCost + annualReplacementCost
  
  return totalAnnualCost / annualFlowMG
}

/**
 * Main analysis function that orchestrates all calculations
 */
export function performAnalysis(formData: DataSubmissionFormData): AnalysisResults {
  // Calculate EBCT
  const ebctCalculated = calculateEBCT(formData)
  
  // Estimate GAC capacity
  const capacityEstimate = estimateCapacityWithFreundlich(
    formData.totalPfasConcentration,
    formData.toc,
    formData.sulfate,
    formData.systemType
  )
  
  // Calculate removal efficiency
  const removalEfficiency = calculateRemovalEfficiency(formData)
  
  // Estimate projected lifespan (simplified model)
  const baseLifespan = (capacityEstimate * formData.bedVolume * formData.gacDensity) / 
                      (formData.totalPfasConcentration * formData.flowRate * 24 * 30) // months
  
  // Apply safety factor
  const projectedLifespanMonths = baseLifespan / formData.safetyFactor
  
  // Run Monte Carlo simulation
  const monteCarloResults = runMonteCarloSimulation(projectedLifespanMonths)
  
  // Calculate cost per million gallons
  const costPerMillionGallons = calculateCostPerMillionGallons(formData, projectedLifespanMonths)
  
  // Calculate capital avoidance (simplified)
  const capitalAvoidance = (formData.replacementCost + formData.laborCost) * 
                          (monteCarloResults.mean / 12) // Annual savings
  
  // Generate key findings
  const keyFindings = generateKeyFindings({
    projectedLifespanMonths: monteCarloResults.mean,
    p95SafeLifeMonths: monteCarloResults.p95,
    removalEfficiency,
    costPerMillionGallons,
    capacityEstimate,
    ebctCalculated
  })
  
  return {
    projectedLifespanMonths: monteCarloResults.mean,
    capitalAvoidance,
    p95SafeLifeMonths: monteCarloResults.p95,
    keyFindings,
    capacityEstimate,
    ebctCalculated,
    removalEfficiency,
    costPerMillionGallons
  }
}

/**
 * Generate key findings based on analysis results
 */
function generateKeyFindings(results: {
  projectedLifespanMonths: number
  p95SafeLifeMonths: number
  removalEfficiency: number
  costPerMillionGallons: number
  capacityEstimate: number
  ebctCalculated: number
}): string[] {
  const findings: string[] = []
  
  // Lifespan findings
  if (results.projectedLifespanMonths > 24) {
    findings.push(`Excellent projected lifespan of ${results.projectedLifespanMonths.toFixed(1)} months`)
  } else if (results.projectedLifespanMonths > 12) {
    findings.push(`Good projected lifespan of ${results.projectedLifespanMonths.toFixed(1)} months`)
  } else {
    findings.push(`Short projected lifespan of ${results.projectedLifespanMonths.toFixed(1)} months - consider optimization`)
  }
  
  // Efficiency findings
  if (results.removalEfficiency > 95) {
    findings.push(`High removal efficiency of ${results.removalEfficiency.toFixed(1)}%`)
  } else if (results.removalEfficiency > 90) {
    findings.push(`Good removal efficiency of ${results.removalEfficiency.toFixed(1)}%`)
  } else {
    findings.push(`Moderate removal efficiency of ${results.removalEfficiency.toFixed(1)}% - consider system optimization`)
  }
  
  // Cost findings
  if (results.costPerMillionGallons < 100) {
    findings.push(`Low treatment cost of $${results.costPerMillionGallons.toFixed(2)} per million gallons`)
  } else if (results.costPerMillionGallons < 200) {
    findings.push(`Moderate treatment cost of $${results.costPerMillionGallons.toFixed(2)} per million gallons`)
  } else {
    findings.push(`High treatment cost of $${results.costPerMillionGallons.toFixed(2)} per million gallons - consider optimization`)
  }
  
  // EBCT findings
  if (results.ebctCalculated > 15) {
    findings.push(`Adequate contact time of ${results.ebctCalculated.toFixed(1)} minutes`)
  } else {
    findings.push(`Short contact time of ${results.ebctCalculated.toFixed(1)} minutes - consider increasing bed volume`)
  }
  
  // P95 safety findings
  if (results.p95SafeLifeMonths > 18) {
    findings.push(`High confidence in system performance with 95% safety margin`)
  } else {
    findings.push(`Consider additional safety measures for reliable operation`)
  }
  
  return findings
}
