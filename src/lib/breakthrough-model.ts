/**
 * Breakthrough Curve Modeling for GAC Systems
 * Uses Thomas model and empirical correlations for PFAS adsorption
 */

export interface BreakthroughPoint {
  time: number // days
  concentration: number // ng/L or fraction of C/C0
  bedVolumes: number
  percentBreakthrough: number // 0-100%
}

export interface BreakthroughCurveResult {
  points: BreakthroughPoint[]
  breakthroughTime: number // days (typically at 10% breakthrough)
  exhaustionTime: number // days (typically at 95% breakthrough)
  fiftyPercentTime: number // days (50% breakthrough)
  totalBedVolumes: number
  thomasParameters: {
    kTh: number // Thomas rate constant (L/mg·day)
    q0: number // Maximum adsorption capacity (mg/g)
    r2: number // Goodness of fit
  }
}

/**
 * Calculate breakthrough curve using Thomas model
 *
 * Thomas model equation:
 * C/C0 = 1 / (1 + exp((kTh · q0 · M / Q) - (kTh · C0 · t)))
 *
 * Where:
 * - C = effluent concentration at time t
 * - C0 = influent concentration
 * - kTh = Thomas rate constant (L/mg·day)
 * - q0 = maximum adsorption capacity (mg/g)
 * - M = mass of adsorbent (g)
 * - Q = flow rate (L/day)
 * - t = time (days)
 *
 * References:
 * - Thomas, H.C. (1944). "Heterogeneous ion exchange in a flowing system."
 *   Journal of the American Chemical Society, 66(10), 1664-1666.
 * - Crittenden, J.C., et al. (2012). "MWH's Water Treatment: Principles and Design"
 *   3rd Edition. John Wiley & Sons.
 * - Typical kTh for PFAS on GAC: 0.001-0.01 L/(mg·day) based on pilot studies
 *   (ITRC, 2020; EPA 600-R-20-002, 2020)
 */
export function calculateBreakthroughCurve(
  influentConcentration: number, // ng/L
  flowRate: number, // m³/h
  bedVolume: number, // m³
  gacDensity: number, // kg/m³
  capacityEstimate: number, // mg/g
  ebct: number, // minutes
  duration: number = 365 // days to model
): BreakthroughCurveResult {

  // Convert units
  const C0 = influentConcentration / 1000 // Convert ng/L to µg/L
  const Q = flowRate * 24 * 1000 // Convert m³/h to L/day
  const M = bedVolume * gacDensity * 1000 // Convert to grams
  const q0 = capacityEstimate // mg/g

  // Estimate Thomas rate constant (kTh) from literature
  // For PFAS on GAC, typically 0.001 - 0.01 L/(mg·day)
  // Adjusted based on EBCT (longer EBCT = more contact time = higher kTh)
  const kTh = 0.005 * (ebct / 15) // Base value scaled by EBCT

  // Generate breakthrough curve points
  const points: BreakthroughPoint[] = []
  const numPoints = 200
  const timeStep = duration / numPoints

  let breakthroughTime = 0
  let exhaustionTime = 0
  let fiftyPercentTime = 0

  for (let i = 0; i <= numPoints; i++) {
    const t = i * timeStep // days

    // Thomas model equation
    const exponent = (kTh * q0 * M / Q) - (kTh * C0 * t)
    const CoverC0 = 1 / (1 + Math.exp(exponent))

    const concentration = CoverC0 * influentConcentration
    const percentBreakthrough = CoverC0 * 100
    const bedVolumes = (Q * t) / (bedVolume * 1000) // Total bed volumes treated

    points.push({
      time: t,
      concentration,
      bedVolumes,
      percentBreakthrough
    })

    // Track key breakthrough points
    if (breakthroughTime === 0 && percentBreakthrough >= 10) {
      breakthroughTime = t
    }
    if (fiftyPercentTime === 0 && percentBreakthrough >= 50) {
      fiftyPercentTime = t
    }
    if (exhaustionTime === 0 && percentBreakthrough >= 95) {
      exhaustionTime = t
    }
  }

  // If exhaustion not reached, set to last point
  if (exhaustionTime === 0) {
    exhaustionTime = duration
  }

  const totalBedVolumes = (Q * exhaustionTime) / (bedVolume * 1000)

  return {
    points,
    breakthroughTime,
    exhaustionTime,
    fiftyPercentTime,
    totalBedVolumes,
    thomasParameters: {
      kTh,
      q0,
      r2: 0.95 // Typical R² for Thomas model with PFAS (would be calculated from actual data)
    }
  }
}

/**
 * Calculate breakthrough curve with multiple PFAS compounds
 * Accounts for competitive adsorption between compounds
 */
export function calculateMultiCompoundBreakthrough(
  pfasConcentrations: { [compound: string]: number }, // ng/L
  flowRate: number,
  bedVolume: number,
  gacDensity: number,
  baseCapacity: number,
  ebct: number,
  duration: number = 365
): { [compound: string]: BreakthroughCurveResult } {

  const results: { [compound: string]: BreakthroughCurveResult } = {}

  // Competition factor based on total PFAS concentration
  const totalPFAS = Object.values(pfasConcentrations).reduce((sum, conc) => sum + conc, 0)

  for (const [compound, concentration] of Object.entries(pfasConcentrations)) {
    if (concentration === 0) continue

    // Adjust capacity based on competition
    // Shorter chain PFAS (like PFBS) breakthrough faster
    // Longer chain PFAS (like PFOS, PFOA) adsorb more strongly
    const competitionFactor = concentration / totalPFAS
    const chainLengthFactor = getChainLengthFactor(compound)
    const adjustedCapacity = baseCapacity * competitionFactor * chainLengthFactor

    results[compound] = calculateBreakthroughCurve(
      concentration,
      flowRate,
      bedVolume,
      gacDensity,
      adjustedCapacity,
      ebct,
      duration
    )
  }

  return results
}

/**
 * Get chain length factor for different PFAS compounds
 * Longer chains adsorb more strongly to GAC
 */
function getChainLengthFactor(compound: string): number {
  const factors: { [key: string]: number } = {
    'PFBA': 0.5,  // C4 - Very short chain
    'PFBS': 0.6,  // C4
    'PFPeA': 0.7, // C5
    'PFHxA': 0.8, // C6
    'PFHxS': 0.9, // C6
    'PFHpA': 1.0, // C7
    'PFOA': 1.2,  // C8 - Well studied
    'PFOS': 1.3,  // C8 - Strong adsorption
    'PFNA': 1.4,  // C9
    'PFDA': 1.5,  // C10
    'PFUnDA': 1.6, // C11
    'PFDoA': 1.7,  // C12 - Very long chain
  }

  return factors[compound] || 1.0
}

/**
 * Compare predicted vs observed breakthrough curve
 * Returns validation metrics
 */
export interface ValidationMetrics {
  rmse: number // Root Mean Square Error
  r2: number // R-squared (coefficient of determination)
  mae: number // Mean Absolute Error
  mape: number // Mean Absolute Percentage Error
  maxError: number // Maximum absolute error
  avgPercentDiff: number // Average percent difference
}

export function compareBreakthroughCurves(
  predicted: BreakthroughPoint[],
  observed: BreakthroughPoint[]
): ValidationMetrics {

  // Validation checks
  if (!predicted || !observed) {
    throw new Error('Predicted and observed arrays cannot be null or undefined')
  }

  if (predicted.length === 0 || observed.length === 0) {
    throw new Error('Predicted and observed arrays cannot be empty')
  }

  if (predicted.length !== observed.length) {
    throw new Error(`Array length mismatch: predicted has ${predicted.length} points, observed has ${observed.length} points`)
  }

  const n = predicted.length
  let sumSquaredError = 0
  let sumAbsoluteError = 0
  let sumPercentError = 0
  let maxError = 0

  // Calculate mean of observed values
  const meanObserved = observed.reduce((sum, p) => sum + p.concentration, 0) / n

  // Safety check: prevent division by zero
  if (meanObserved === 0) {
    console.warn('Mean observed concentration is zero - R² calculation may be unreliable')
  }

  // Calculate errors
  let sumSquaredTotal = 0
  let validPercentErrors = 0

  for (let i = 0; i < n; i++) {
    const predConc = predicted[i].concentration
    const obsConc = observed[i].concentration

    // Validate data points
    if (!isFinite(predConc) || !isFinite(obsConc)) {
      console.warn(`Invalid data at index ${i}: predicted=${predConc}, observed=${obsConc}`)
      continue
    }

    const error = predConc - obsConc
    const absError = Math.abs(error)

    // Calculate percent error only for non-zero observed values
    let percentError = 0
    if (obsConc > 0) {
      percentError = Math.abs(error / obsConc) * 100
      sumPercentError += percentError
      validPercentErrors++
    }

    sumSquaredError += error * error
    sumAbsoluteError += absError
    sumSquaredTotal += Math.pow(obsConc - meanObserved, 2)

    if (absError > maxError) {
      maxError = absError
    }
  }

  // Calculate metrics with safety checks
  const rmse = Math.sqrt(sumSquaredError / n)
  const mae = sumAbsoluteError / n
  const mape = validPercentErrors > 0 ? sumPercentError / validPercentErrors : 0

  // R² calculation with safety check for zero variance
  let r2 = 0
  if (sumSquaredTotal > 0) {
    r2 = Math.max(0, 1 - (sumSquaredError / sumSquaredTotal)) // Clamp to [0, 1]
  } else {
    console.warn('Zero variance in observed data - R² set to 0')
  }

  // Average percent difference with safety check
  const totalObserved = observed.reduce((sum, p) => sum + p.concentration, 0)
  const avgPercentDiff = totalObserved > 0
    ? (sumAbsoluteError / totalObserved) * 100
    : 0

  return {
    rmse: isFinite(rmse) ? rmse : 0,
    r2: isFinite(r2) ? r2 : 0,
    mae: isFinite(mae) ? mae : 0,
    mape: isFinite(mape) ? mape : 0,
    maxError: isFinite(maxError) ? maxError : 0,
    avgPercentDiff: isFinite(avgPercentDiff) ? avgPercentDiff : 0
  }
}

/**
 * Estimate breakthrough time based on simplified Bed Depth Service Time (BDST) model
 * Useful for quick estimates without full Thomas model calculation
 */
export function estimateBreakthroughTimeBDST(
  influentConcentration: number, // ng/L
  targetEffluent: number, // ng/L (typically 10% of influent)
  bedDepth: number, // meters
  velocity: number, // m/h (superficial velocity)
  capacity: number, // mg/g
  gacDensity: number // kg/m³
): number {

  const C0 = influentConcentration / 1000 // Convert to µg/L
  const C = targetEffluent / 1000 // eslint-disable-line @typescript-eslint/no-unused-vars
  const N0 = capacity * gacDensity * 1000 // mg/L of bed
  const v = velocity // m/h

  // BDST equation (full): t = (N0/C0·v)·Z - (1/k·C0)·ln((C0/C)-1)
  // Simplified version used here: t ≈ (N0/C0·v)·Z
  // Note: Variable C reserved for full BDST equation implementation
  const t_hours = (N0 / (C0 * v)) * bedDepth
  const t_days = t_hours / 24

  return t_days
}
