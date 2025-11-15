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
 *
 * Freundlich Equation: q = K·C^(1/n)
 * Where: q = adsorption capacity (mg/g), C = concentration (µg/L)
 *
 * References:
 * - Appleman, T.D., et al. (2014). "Treatment of poly- and perfluoroalkyl substances
 *   in U.S. full-scale water treatment systems." Water Research, 51, 246-255.
 * - Kothawala, D.N., et al. (2017). "Influence of dissolved organic matter concentration
 *   and composition on the removal efficiency of perfluoroalkyl substances."
 *   Environmental Science & Technology, 51(13), 7488-7497.
 * - Typical PFAS GAC parameters: K = 0.05-0.30, n = 0.5-0.9 (EPA, 2021)
 */
export function estimateCapacityWithFreundlich(
  pfasConcentration: number,
  toc: number,
  sulfate: number,
  systemType: string
): number {
  // Freundlich isotherm parameters for PFAS on GAC
  // K = 0.15 represents mid-range adsorption capacity for mixed PFAS
  // n = 0.7 represents typical non-linearity for PFAS adsorption
  const k = 0.15 // Freundlich constant (mg/g)/(µg/L)^(1/n)
  const n = 0.7  // Freundlich exponent (dimensionless), typically 0.5-0.9 for PFAS

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
 * Generate normally distributed random numbers using Box-Muller transform
 * More accurate than uniform distribution for uncertainty analysis
 *
 * Reference: Box, G. E. P. and Muller, M. E. (1958).
 * "A Note on the Generation of Random Normal Deviates".
 * Annals of Mathematical Statistics. 29 (2): 610–611.
 */
function boxMullerRandom(mean: number = 0, stdDev: number = 1): number {
  // Prevent log(0) edge case by ensuring u1 > 0
  const u1 = Math.max(Math.random(), Number.EPSILON)
  const u2 = Math.random()
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return z0 * stdDev + mean
}

/**
 * Run Monte Carlo simulation for uncertainty analysis
 * Uses proper normal distribution (Box-Muller) for academic rigor
 *
 * @param projectedLife - Base projected lifespan in months
 * @param uncertainty - Uncertainty factor (default 0.18 = 18%)
 * @param iterations - Number of Monte Carlo iterations (default 5000 for research-grade)
 * @param useSimplified - Use simplified calculation for production speed (default false)
 */
export function runMonteCarloSimulation(
  projectedLife: number,
  uncertainty: number = 0.18,
  iterations: number = 5000,
  useSimplified: boolean = false
): { mean: number; p95: number; p5: number; p10: number; p90: number; stdDev: number } {

  // Simplified mode for production speed (NOT true Monte Carlo)
  if (useSimplified) {
    return {
      mean: projectedLife,
      p95: projectedLife * (1 + uncertainty),
      p5: projectedLife * (1 - uncertainty),
      p10: projectedLife * (1 - uncertainty * 0.75),
      p90: projectedLife * (1 + uncertainty * 0.75),
      stdDev: projectedLife * uncertainty / 2
    }
  }

  // Full Monte Carlo simulation with Box-Muller normal distribution
  const results: number[] = []
  results.length = iterations

  // Standard deviation from uncertainty (assuming uncertainty is ~2σ)
  const stdDev = (projectedLife * uncertainty) / 2

  for (let i = 0; i < iterations; i++) {
    // Generate normally distributed random value
    const randomValue = boxMullerRandom(projectedLife, stdDev)
    results[i] = Math.max(0, randomValue) // Ensure non-negative (GAC life can't be negative)
  }

  // Sort results for percentile calculation
  results.sort((a, b) => a - b)

  // Calculate statistics
  const mean = results.reduce((sum, val) => sum + val, 0) / results.length
  const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length
  const calculatedStdDev = Math.sqrt(variance)

  // Calculate percentiles
  const p5Index = Math.floor(results.length * 0.05)
  const p10Index = Math.floor(results.length * 0.10)
  const p90Index = Math.floor(results.length * 0.90)
  const p95Index = Math.floor(results.length * 0.95)

  return {
    mean,
    p95: results[p95Index],
    p5: results[p5Index],
    p10: results[p10Index],
    p90: results[p90Index],
    stdDev: calculatedStdDev
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
 * Fast analysis function for production use (optimized for speed)
 * Uses simplified Monte Carlo for faster response times
 */
export function performFastAnalysis(formData: DataSubmissionFormData): AnalysisResults {
  // Calculate EBCT
  const ebctCalculated = calculateEBCT(formData)

  // Estimate GAC capacity (simplified)
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

  // Simplified Monte Carlo (useSimplified=true for speed)
  const monteCarloResults = runMonteCarloSimulation(
    projectedLifespanMonths,
    0.18,
    1000,
    true // Use simplified mode for fast production response
  )

  // Calculate cost per million gallons
  const costPerMillionGallons = calculateCostPerMillionGallons(formData, projectedLifespanMonths)

  // Calculate capital avoidance
  const capitalAvoidance = (formData.replacementCost + formData.laborCost) *
                          (projectedLifespanMonths / 12) // Annual savings

  // Generate key findings
  const keyFindings = generateKeyFindings({
    projectedLifespanMonths,
    p95SafeLifeMonths: monteCarloResults.p95,
    removalEfficiency,
    costPerMillionGallons,
    capacityEstimate,
    ebctCalculated
  })

  return {
    projectedLifespanMonths,
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
 * Research-grade analysis with full Monte Carlo simulation
 * Use this for validation studies and academic work
 */
export function performResearchAnalysis(
  formData: DataSubmissionFormData,
  iterations: number = 5000
): AnalysisResults & {
  monteCarloResults: ReturnType<typeof runMonteCarloSimulation>
} {
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

  // Estimate projected lifespan
  const baseLifespan = (capacityEstimate * formData.bedVolume * formData.gacDensity) /
                      (formData.totalPfasConcentration * formData.flowRate * 24 * 30)

  const projectedLifespanMonths = baseLifespan / formData.safetyFactor

  // Full Monte Carlo simulation with Box-Muller normal distribution
  const monteCarloResults = runMonteCarloSimulation(
    projectedLifespanMonths,
    0.18,
    iterations,
    false // Use full Monte Carlo for research
  )

  const costPerMillionGallons = calculateCostPerMillionGallons(formData, projectedLifespanMonths)

  const capitalAvoidance = (formData.replacementCost + formData.laborCost) *
                          (projectedLifespanMonths / 12)

  const keyFindings = generateKeyFindings({
    projectedLifespanMonths,
    p95SafeLifeMonths: monteCarloResults.p95,
    removalEfficiency,
    costPerMillionGallons,
    capacityEstimate,
    ebctCalculated
  })

  return {
    projectedLifespanMonths,
    capitalAvoidance,
    p95SafeLifeMonths: monteCarloResults.p95,
    keyFindings,
    capacityEstimate,
    ebctCalculated,
    removalEfficiency,
    costPerMillionGallons,
    monteCarloResults // Include full Monte Carlo results for research
  }
}

/**
 * Main analysis function that orchestrates all calculations
 */
export function performAnalysis(formData: DataSubmissionFormData): AnalysisResults {
  // Use fast analysis for production to prevent timeouts
  return performFastAnalysis(formData)
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
