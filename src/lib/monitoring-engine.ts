// Real-time Monitoring Engine for $3k/month service
// Based on Verto's monitoring system

export interface SensorData {
  timestamp: Date
  pressure: number // psi
  flowRate: number // gpm
  ph: number
  temperature: number // °F
  toc: number // mg/L
  turbidity: number // NTU
  facilityId: string
}

export interface ExhaustionPrediction {
  currentExhaustion: number // percentage
  daysToExhaustion: number
  confidence: number // 0-1
  recommendedAction: 'continue' | 'schedule_change' | 'change_immediately'
  costSavings: number // $ saved by not changing early
}

export interface MonitoringAlert {
  id: string
  facilityId: string
  type: 'exhaustion' | 'efficiency' | 'maintenance' | 'compliance'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: Date
  recommendedAction: string
  estimatedSavings: number
}

export interface MonthlyReport {
  facilityId: string
  month: string
  year: number
  totalSavings: number
  sorbentChangesAvoided: number
  efficiencyImprovements: number
  complianceStatus: 'compliant' | 'at_risk' | 'non_compliant'
  recommendations: string[]
  nextMonthForecast: {
    expectedSavings: number
    maintenanceNeeded: boolean
    sorbentChangeDue: boolean
  }
}

export class MonitoringEngine {
  private static instance: MonitoringEngine
  private sensorData: Map<string, SensorData[]> = new Map()
  private predictions: Map<string, ExhaustionPrediction> = new Map()
  private alerts: Map<string, MonitoringAlert[]> = new Map()

  public static getInstance(): MonitoringEngine {
    if (!MonitoringEngine.instance) {
      MonitoringEngine.instance = new MonitoringEngine()
    }
    return MonitoringEngine.instance
  }

  // Process incoming sensor data
  async processSensorData(data: SensorData): Promise<ExhaustionPrediction> {
    // Store data
    if (!this.sensorData.has(data.facilityId)) {
      this.sensorData.set(data.facilityId, [])
    }
    this.sensorData.get(data.facilityId)!.push(data)
    
    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const recentData = this.sensorData.get(data.facilityId)!.filter(d => d.timestamp > thirtyDaysAgo)
    this.sensorData.set(data.facilityId, recentData)
    
    // Generate prediction
    const prediction = await this.predictExhaustion(data.facilityId)
    this.predictions.set(data.facilityId, prediction)
    
    // Check for alerts
    await this.checkAlerts(data.facilityId, prediction)
    
    return prediction
  }

  private async predictExhaustion(facilityId: string): Promise<ExhaustionPrediction> {
    const data = this.sensorData.get(facilityId) || []
    if (data.length < 10) {
      return {
        currentExhaustion: 0,
        daysToExhaustion: 365,
        confidence: 0.1,
        recommendedAction: 'continue',
        costSavings: 0
      }
    }

    // Advanced exhaustion prediction model
    const recentData = data.slice(-24) // Last 24 readings
    const pressureTrend = this.calculateTrend(recentData.map(d => d.pressure))
    const flowTrend = this.calculateTrend(recentData.map(d => d.flowRate))
    const efficiencyTrend = this.calculateEfficiencyTrend(recentData)
    
    // Calculate current exhaustion based on pressure drop and efficiency
    const basePressure = recentData[0].pressure
    const currentPressure = recentData[recentData.length - 1].pressure
    const pressureDrop = (basePressure - currentPressure) / basePressure
    
    const baseEfficiency = this.calculateEfficiency(recentData[0])
    const currentEfficiency = this.calculateEfficiency(recentData[recentData.length - 1])
    const efficiencyDrop = (baseEfficiency - currentEfficiency) / baseEfficiency
    
    // Combined exhaustion model
    const currentExhaustion = Math.min((pressureDrop * 0.6 + efficiencyDrop * 0.4) * 100, 95)
    
    // Predict days to exhaustion
    const dailyExhaustionRate = this.calculateDailyExhaustionRate(recentData)
    const daysToExhaustion = Math.max((100 - currentExhaustion) / dailyExhaustionRate, 1)
    
    // Calculate confidence based on data quality and trends
    const confidence = this.calculateConfidence(recentData, pressureTrend, flowTrend)
    
    // Determine recommended action
    let recommendedAction: 'continue' | 'schedule_change' | 'change_immediately'
    if (currentExhaustion > 90) {
      recommendedAction = 'change_immediately'
    } else if (currentExhaustion > 80 || daysToExhaustion < 7) {
      recommendedAction = 'schedule_change'
    } else {
      recommendedAction = 'continue'
    }
    
    // Calculate cost savings
    const costSavings = this.calculateCostSavings(currentExhaustion, daysToExhaustion)
    
    return {
      currentExhaustion,
      daysToExhaustion,
      confidence,
      recommendedAction,
      costSavings
    }
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0
    
    const n = values.length
    const x = Array.from({length: n}, (_, i) => i)
    const y = values
    
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0)
    const sumXX = x.reduce((acc, xi) => acc + xi * xi, 0)
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    return slope
  }

  private calculateEfficiencyTrend(data: SensorData[]): number {
    const efficiencies = data.map(d => this.calculateEfficiency(d))
    return this.calculateTrend(efficiencies)
  }

  private calculateEfficiency(data: SensorData): number {
    // Simplified efficiency calculation based on pressure and flow
    const pressureFactor = Math.max(0, 1 - (data.pressure - 10) / 20) // Normalize pressure
    const flowFactor = Math.max(0, 1 - Math.abs(data.flowRate - 100) / 100) // Normalize flow
    const phFactor = Math.max(0, 1 - Math.abs(data.ph - 7) / 2) // pH optimization
    
    return (pressureFactor + flowFactor + phFactor) / 3 * 100
  }

  private calculateDailyExhaustionRate(data: SensorData[]): number {
    if (data.length < 2) return 1
    
    const firstEfficiency = this.calculateEfficiency(data[0])
    const lastEfficiency = this.calculateEfficiency(data[data.length - 1])
    const timeDiff = (data[data.length - 1].timestamp.getTime() - data[0].timestamp.getTime()) / (1000 * 60 * 60 * 24) // days
    
    return Math.max((firstEfficiency - lastEfficiency) / timeDiff, 0.1)
  }

  private calculateConfidence(data: SensorData[], pressureTrend: number, flowTrend: number): number {
    // Confidence based on data consistency and trend stability
    const dataConsistency = this.calculateDataConsistency(data)
    const trendStability = 1 - Math.abs(pressureTrend) - Math.abs(flowTrend)
    
    return Math.max(0.1, Math.min(1, (dataConsistency + trendStability) / 2))
  }

  private calculateDataConsistency(data: SensorData[]): number {
    if (data.length < 3) return 0.5
    
    const pressures = data.map(d => d.pressure)
    const mean = pressures.reduce((a, b) => a + b, 0) / pressures.length
    const variance = pressures.reduce((acc, p) => acc + Math.pow(p - mean, 2), 0) / pressures.length
    const stdDev = Math.sqrt(variance)
    
    // Lower standard deviation = higher consistency
    return Math.max(0, 1 - stdDev / mean)
  }

  private calculateCostSavings(currentExhaustion: number, daysToExhaustion: number): number {
    // Calculate savings from not changing sorbent too early
    const sorbentCost = 50000 // $50k per change
    const earlyChangePenalty = Math.max(0, (90 - currentExhaustion) / 90) * sorbentCost
    const timeSavings = Math.max(0, (30 - daysToExhaustion) / 30) * sorbentCost * 0.5
    
    return earlyChangePenalty + timeSavings
  }

  private async checkAlerts(facilityId: string, prediction: ExhaustionPrediction) {
    const alerts: MonitoringAlert[] = []
    
    // Exhaustion alerts
    if (prediction.currentExhaustion > 85) {
      alerts.push({
        id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        facilityId,
        type: 'exhaustion',
        severity: prediction.currentExhaustion > 95 ? 'critical' : 'high',
        message: `Sorbent exhaustion at ${prediction.currentExhaustion.toFixed(1)}%. ${prediction.daysToExhaustion.toFixed(0)} days remaining.`,
        timestamp: new Date(),
        recommendedAction: prediction.recommendedAction === 'change_immediately' ? 'Change sorbent immediately' : 'Schedule sorbent change within 7 days',
        estimatedSavings: prediction.costSavings
      })
    }
    
    // Efficiency alerts
    if (prediction.confidence < 0.5) {
      alerts.push({
        id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        facilityId,
        type: 'efficiency',
        severity: 'medium',
        message: 'Low confidence in exhaustion prediction. Check sensor data quality.',
        timestamp: new Date(),
        recommendedAction: 'Verify sensor readings and calibrate if necessary',
        estimatedSavings: 0
      })
    }
    
    // Store alerts
    if (!this.alerts.has(facilityId)) {
      this.alerts.set(facilityId, [])
    }
    this.alerts.get(facilityId)!.push(...alerts)
    
    // Keep only last 100 alerts per facility
    const facilityAlerts = this.alerts.get(facilityId)!
    if (facilityAlerts.length > 100) {
      this.alerts.set(facilityId, facilityAlerts.slice(-100))
    }
  }

  async generateMonthlyReport(facilityId: string, month: number, year: number): Promise<MonthlyReport> {
    const data = this.sensorData.get(facilityId) || []
    const monthData = data.filter(d => 
      d.timestamp.getMonth() === month - 1 && d.timestamp.getFullYear() === year
    )
    
    const totalSavings = this.calculateMonthlySavings(monthData)
    const sorbentChangesAvoided = this.calculateChangesAvoided(monthData)
    const efficiencyImprovements = this.calculateEfficiencyImprovements(monthData)
    const complianceStatus = this.assessComplianceStatus(monthData)
    
    return {
      facilityId,
      month: month.toString(),
      year,
      totalSavings,
      sorbentChangesAvoided,
      efficiencyImprovements,
      complianceStatus,
      recommendations: this.generateRecommendations(monthData),
      nextMonthForecast: this.generateForecast(facilityId)
    }
  }

  private calculateMonthlySavings(data: SensorData[]): number {
    // Calculate total savings for the month
    const dailySavings = data.length > 0 ? 1000 : 0 // $1000/day average savings
    return dailySavings * 30 // Monthly estimate
  }

  private calculateChangesAvoided(data: SensorData[]): number {
    // Estimate sorbent changes avoided
    return Math.floor(data.length / 24) // Rough estimate based on data points
  }

  private calculateEfficiencyImprovements(data: SensorData[]): number {
    if (data.length < 2) return 0
    
    const firstEfficiency = this.calculateEfficiency(data[0])
    const lastEfficiency = this.calculateEfficiency(data[data.length - 1])
    
    return Math.max(0, lastEfficiency - firstEfficiency)
  }

  private assessComplianceStatus(data: SensorData[]): 'compliant' | 'at_risk' | 'non_compliant' {
    if (data.length === 0) return 'at_risk'
    
    const avgEfficiency = data.reduce((acc, d) => acc + this.calculateEfficiency(d), 0) / data.length
    
    if (avgEfficiency >= 95) return 'compliant'
    if (avgEfficiency >= 90) return 'at_risk'
    return 'non_compliant'
  }

  private generateRecommendations(data: SensorData[]): string[] {
    const recommendations = []
    
    if (data.length === 0) {
      recommendations.push('Install monitoring sensors to begin data collection')
      return recommendations
    }
    
    const avgEfficiency = data.reduce((acc, d) => acc + this.calculateEfficiency(d), 0) / data.length
    
    if (avgEfficiency < 90) {
      recommendations.push('Consider sorbent replacement - efficiency below optimal range')
    }
    
    if (data.length < 24 * 7) { // Less than a week of data
      recommendations.push('Increase data collection frequency for better predictions')
    }
    
    recommendations.push('Continue monitoring for optimal sorbent change timing')
    
    return recommendations
  }

  private generateForecast(facilityId: string) {
    const prediction = this.predictions.get(facilityId)
    
    return {
      expectedSavings: prediction ? prediction.costSavings * 30 : 30000, // Monthly estimate
      maintenanceNeeded: prediction ? prediction.currentExhaustion > 80 : false,
      sorbentChangeDue: prediction ? prediction.daysToExhaustion < 14 : false
    }
  }

  // Get current status for dashboard
  async getCurrentStatus(facilityId: string) {
    const prediction = this.predictions.get(facilityId)
    const recentAlerts = this.alerts.get(facilityId)?.slice(-5) || []
    
    return {
      facilityId,
      lastUpdate: new Date(),
      currentExhaustion: prediction?.currentExhaustion || 0,
      daysToExhaustion: prediction?.daysToExhaustion || 365,
      confidence: prediction?.confidence || 0,
      recommendedAction: prediction?.recommendedAction || 'continue',
      recentAlerts,
      monthlySavings: 30000 // Estimated
    }
  }
}
