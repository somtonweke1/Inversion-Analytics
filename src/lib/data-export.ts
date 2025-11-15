/**
 * Data Export Utilities for Validation Studies
 * Exports analysis results, breakthrough curves, and validation metrics
 */

import { BreakthroughPoint, BreakthroughCurveResult, ValidationMetrics } from './breakthrough-model'
import { AnalysisResults } from './analysis-engine'
import { DataSubmissionFormData } from './validations'

export interface ExportData {
  metadata: {
    exportDate: string
    projectName: string
    siteLocation?: string
    analysisType: string
    version: string
  }
  systemConfiguration: Partial<DataSubmissionFormData>
  analysisResults: AnalysisResults
  breakthroughCurve?: BreakthroughCurveResult
  validationMetrics?: ValidationMetrics
}

/**
 * Convert data to CSV format
 */
export function exportToCSV(data: Record<string, unknown>[], filename: string): void {
  if (data.length === 0) return

  // Get headers from first object
  const headers = Object.keys(data[0])

  // Create CSV content
  let csv = headers.join(',') + '\n'

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header]
      // Handle values that might contain commas
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`
      }
      return value ?? ''
    })
    csv += values.join(',') + '\n'
  })

  // Trigger download
  downloadFile(csv, filename, 'text/csv')
}

/**
 * Convert breakthrough curve to CSV
 */
export function exportBreakthroughCurveCSV(
  breakthroughCurve: BreakthroughCurveResult,
  compoundName: string = 'Total_PFAS'
): void {
  const data = breakthroughCurve.points.map(point => ({
    Time_days: point.time.toFixed(2),
    Bed_Volumes: point.bedVolumes.toFixed(2),
    Concentration_ngL: point.concentration.toFixed(4),
    Percent_Breakthrough: point.percentBreakthrough.toFixed(2)
  }))

  const filename = `breakthrough_curve_${compoundName}_${new Date().toISOString().split('T')[0]}.csv`
  exportToCSV(data, filename)
}

/**
 * Export validation comparison data
 */
export function exportValidationComparisonCSV(
  predicted: BreakthroughPoint[],
  observed: BreakthroughPoint[],
  metrics: ValidationMetrics,
  compoundName: string = 'Total_PFAS'
): void {
  const data = predicted.map((p, i) => ({
    Time_days: p.time.toFixed(2),
    Bed_Volumes: p.bedVolumes.toFixed(2),
    Predicted_ngL: p.concentration.toFixed(4),
    Observed_ngL: observed[i]?.concentration.toFixed(4) || '',
    Absolute_Error: observed[i]
      ? Math.abs(p.concentration - observed[i].concentration).toFixed(4)
      : '',
    Percent_Error: observed[i] && observed[i].concentration > 0
      ? (Math.abs(p.concentration - observed[i].concentration) / observed[i].concentration * 100).toFixed(2)
      : ''
  }))

  const filename = `validation_comparison_${compoundName}_${new Date().toISOString().split('T')[0]}.csv`

  // Add metrics as header rows
  let csv = `Validation Metrics for ${compoundName}\n`
  csv += `R-squared,${metrics.r2.toFixed(4)}\n`
  csv += `RMSE (ng/L),${metrics.rmse.toFixed(4)}\n`
  csv += `MAE (ng/L),${metrics.mae.toFixed(4)}\n`
  csv += `MAPE (%),${metrics.mape.toFixed(2)}\n`
  csv += `Max Error (ng/L),${metrics.maxError.toFixed(4)}\n`
  csv += `Avg Percent Diff (%),${metrics.avgPercentDiff.toFixed(2)}\n`
  csv += '\n'

  // Add data
  const headers = Object.keys(data[0])
  csv += headers.join(',') + '\n'
  data.forEach(row => {
    const values = headers.map(h => row[h as keyof typeof row])
    csv += values.join(',') + '\n'
  })

  downloadFile(csv, filename, 'text/csv')
}

/**
 * Export complete analysis report as JSON
 */
export function exportAnalysisJSON(exportData: ExportData): void {
  const json = JSON.stringify(exportData, null, 2)
  const filename = `analysis_report_${exportData.metadata.projectName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`
  downloadFile(json, filename, 'application/json')
}

/**
 * Export system configuration and water quality data for Hazen import template
 */
export function exportHazenImportTemplate(): void {
  const template = {
    metadata: {
      template_version: '1.0',
      description: 'Hazen Dataset Import Template for Inversion Analytics',
      instructions: 'Fill in all fields with actual data. Concentrations in ng/L, flows in m³/h, dimensions in meters.'
    },
    site_information: {
      project_name: '',
      site_location: '',
      latitude: null,
      longitude: null,
      facility_type: '',
      start_date: '',
      end_date: ''
    },
    system_configuration: {
      system_type: 'Fixed Bed',
      vessel_diameter_m: null,
      vessel_height_m: null,
      flow_rate_m3h: null,
      bed_height_m: null,
      ebct_minutes: null
    },
    water_quality: {
      toc_mgL: null,
      sulfate_mgL: null,
      chloride_mgL: null,
      alkalinity_mgL_CaCO3: null,
      hardness_mgL_CaCO3: null,
      ph: null,
      temperature_C: null
    },
    pfas_concentrations_ngL: {
      PFOA: null,
      PFOS: null,
      PFNA: null,
      PFHxA: null,
      PFHxS: null,
      PFDA: null,
      PFBS: null,
      PFHpA: null,
      PFUnDA: null,
      PFDoA: null,
      total_PFAS: null
    },
    gac_properties: {
      gac_type: '',
      gac_density_kgm3: null,
      gac_particle_size_mm: null,
      gac_iodine_number_mgg: null,
      gac_surface_area_m2g: null
    },
    economic_parameters: {
      gac_cost_per_kg_USD: null,
      replacement_cost_USD: null,
      labor_cost_USD: null,
      disposal_cost_USD: null,
      operating_days_per_year: 365,
      operating_hours_per_day: 24
    },
    operational_parameters: {
      target_removal_efficiency_percent: 99,
      safety_factor: 1.5
    },
    observed_breakthrough_data: [
      {
        time_days: 0,
        bed_volumes: 0,
        effluent_concentration_ngL: 0,
        notes: 'Add actual observed data points here'
      }
    ]
  }

  const json = JSON.stringify(template, null, 2)
  const filename = `hazen_import_template_${new Date().toISOString().split('T')[0]}.json`
  downloadFile(json, filename, 'application/json')
}

/**
 * Parse Hazen dataset from JSON
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseHazenDataset(jsonData: any): {
  formData: Partial<DataSubmissionFormData>
  observedBreakthrough: BreakthroughPoint[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any
} {
  // Convert Hazen format to our internal format
  const formData: Partial<DataSubmissionFormData> = {
    systemType: jsonData.system_configuration?.system_type || 'Fixed Bed',
    vesselDiameter: jsonData.system_configuration?.vessel_diameter_m,
    vesselHeight: jsonData.system_configuration?.vessel_height_m,
    flowRate: jsonData.system_configuration?.flow_rate_m3h,
    bedHeight: jsonData.system_configuration?.bed_height_m,
    ebct: jsonData.system_configuration?.ebct_minutes,

    toc: jsonData.water_quality?.toc_mgL,
    sulfate: jsonData.water_quality?.sulfate_mgL,
    chloride: jsonData.water_quality?.chloride_mgL,
    alkalinity: jsonData.water_quality?.alkalinity_mgL_CaCO3,
    hardness: jsonData.water_quality?.hardness_mgL_CaCO3,
    ph: jsonData.water_quality?.ph,
    temperature: jsonData.water_quality?.temperature_C,

    pfoaConcentration: jsonData.pfas_concentrations_ngL?.PFOA || 0,
    pfosConcentration: jsonData.pfas_concentrations_ngL?.PFOS || 0,
    pfnaConcentration: jsonData.pfas_concentrations_ngL?.PFNA || 0,
    pfhxaConcentration: jsonData.pfas_concentrations_ngL?.PFHxA || 0,
    pfhxsConcentration: jsonData.pfas_concentrations_ngL?.PFHxS || 0,
    pfdaConcentration: jsonData.pfas_concentrations_ngL?.PFDA || 0,
    pfbsConcentration: jsonData.pfas_concentrations_ngL?.PFBS || 0,
    pfhpaConcentration: jsonData.pfas_concentrations_ngL?.PFHpA || 0,
    pfundaConcentration: jsonData.pfas_concentrations_ngL?.PFUnDA || 0,
    pfdoaConcentration: jsonData.pfas_concentrations_ngL?.PFDoA || 0,
    totalPfasConcentration: jsonData.pfas_concentrations_ngL?.total_PFAS,

    gacType: jsonData.gac_properties?.gac_type || '',
    gacDensity: jsonData.gac_properties?.gac_density_kgm3,
    gacParticleSize: jsonData.gac_properties?.gac_particle_size_mm,
    gacIodineNumber: jsonData.gac_properties?.gac_iodine_number_mgg,
    gacSurfaceArea: jsonData.gac_properties?.gac_surface_area_m2g,

    gacCostPerKg: jsonData.economic_parameters?.gac_cost_per_kg_USD,
    replacementCost: jsonData.economic_parameters?.replacement_cost_USD,
    laborCost: jsonData.economic_parameters?.labor_cost_USD,
    disposalCost: jsonData.economic_parameters?.disposal_cost_USD,
    operatingDaysPerYear: jsonData.economic_parameters?.operating_days_per_year || 365,
    operatingHoursPerDay: jsonData.economic_parameters?.operating_hours_per_day || 24,

    targetRemovalEfficiency: jsonData.operational_parameters?.target_removal_efficiency_percent || 99,
    safetyFactor: jsonData.operational_parameters?.safety_factor || 1.5
  }

  // Parse observed breakthrough data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const observedBreakthrough: BreakthroughPoint[] = (jsonData.observed_breakthrough_data || []).map((point: any) => ({
    time: point.time_days || 0,
    bedVolumes: point.bed_volumes || 0,
    concentration: point.effluent_concentration_ngL || 0,
    percentBreakthrough: point.effluent_concentration_ngL && jsonData.pfas_concentrations_ngL?.total_PFAS
      ? (point.effluent_concentration_ngL / jsonData.pfas_concentrations_ngL.total_PFAS) * 100
      : 0
  }))

  return {
    formData,
    observedBreakthrough,
    metadata: jsonData.site_information || {}
  }
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export Monte Carlo simulation results
 */
export function exportMonteCarloResultsCSV(
  monteCarloResults: {
    mean: number
    p5: number
    p10: number
    p90: number
    p95: number
    stdDev: number
  },
  projectName: string
): void {
  const data = [
    { Metric: 'Mean', Value: monteCarloResults.mean.toFixed(2), Unit: 'months' },
    { Metric: 'P5 (5th percentile)', Value: monteCarloResults.p5.toFixed(2), Unit: 'months' },
    { Metric: 'P10 (10th percentile)', Value: monteCarloResults.p10.toFixed(2), Unit: 'months' },
    { Metric: 'P90 (90th percentile)', Value: monteCarloResults.p90.toFixed(2), Unit: 'months' },
    { Metric: 'P95 (95th percentile)', Value: monteCarloResults.p95.toFixed(2), Unit: 'months' },
    { Metric: 'Standard Deviation', Value: monteCarloResults.stdDev.toFixed(2), Unit: 'months' }
  ]

  const filename = `monte_carlo_results_${projectName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`
  exportToCSV(data, filename)
}
