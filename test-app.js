// Simple test script to verify the application works
const { performAnalysis } = require('./src/lib/analysis-engine.ts')

// Test data
const testData = {
  systemType: 'Fixed Bed',
  vesselDiameter: 2.0,
  vesselHeight: 3.0,
  flowRate: 100,
  bedHeight: 2.5,
  vesselVolume: 9.42,
  bedVolume: 7.85,
  ebct: 15,
  toc: 2.0,
  sulfate: 50,
  chloride: 25,
  alkalinity: 100,
  hardness: 150,
  ph: 7.5,
  temperature: 20,
  pfoaConcentration: 10,
  pfosConcentration: 5,
  pfnaConcentration: 2,
  pfhxaConcentration: 3,
  pfhxsConcentration: 1,
  pfdaConcentration: 1,
  pfbsConcentration: 2,
  pfhpaConcentration: 1,
  pfundaConcentration: 0.5,
  pfdoaConcentration: 0.5,
  totalPfasConcentration: 25,
  gacType: 'Coal-based',
  gacDensity: 450,
  gacParticleSize: 1.0,
  gacIodineNumber: 1000,
  gacSurfaceArea: 1000,
  gacCostPerKg: 3.50,
  replacementCost: 50000,
  laborCost: 10000,
  disposalCost: 5000,
  operatingDaysPerYear: 365,
  operatingHoursPerDay: 24,
  targetRemovalEfficiency: 95,
  safetyFactor: 1.5,
}

console.log('🧪 Testing Inversion Analytics Analysis Engine...')
console.log('📊 Test Data:', testData)

try {
  const results = performAnalysis(testData)
  console.log('✅ Analysis completed successfully!')
  console.log('📈 Results:', {
    projectedLifespanMonths: results.projectedLifespanMonths.toFixed(1),
    capitalAvoidance: results.capitalAvoidance.toFixed(0),
    p95SafeLifeMonths: results.p95SafeLifeMonths.toFixed(1),
    keyFindings: results.keyFindings
  })
} catch (error) {
  console.error('❌ Analysis failed:', error.message)
}


