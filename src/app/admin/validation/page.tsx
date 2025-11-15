'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react'
import { parseHazenDataset, exportHazenImportTemplate } from '@/lib/data-export'
import BreakthroughCurveChart from '@/components/BreakthroughCurveChart'
import { calculateBreakthroughCurve, compareBreakthroughCurves } from '@/lib/breakthrough-model'
import { performResearchAnalysis } from '@/lib/analysis-engine'

export default function ValidationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedData, setUploadedData] = useState<Record<string, unknown> | null>(null)
  const [analysisResults, setAnalysisResults] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const text = await file.text()
      const jsonData = JSON.parse(text)

      // Parse Hazen dataset
      const { formData, observedBreakthrough, metadata } = parseHazenDataset(jsonData)

      // Validate that we have the necessary data
      if (!formData.totalPfasConcentration || !formData.flowRate || !formData.bedVolume) {
        throw new Error('Missing required fields in dataset')
      }

      // Calculate required fields
      const vesselVolume = Math.PI * Math.pow(formData.vesselDiameter! / 2, 2) * formData.vesselHeight!
      const bedVolume = Math.PI * Math.pow(formData.vesselDiameter! / 2, 2) * formData.bedHeight!

      const completeFormData = {
        ...formData,
        vesselVolume,
        bedVolume
      } as Parameters<typeof performResearchAnalysis>[0]

      // Run research-grade analysis with full Monte Carlo
      const analysis = performResearchAnalysis(completeFormData, 5000)

      // Calculate breakthrough curve
      const predictedBreakthrough = calculateBreakthroughCurve(
        formData.totalPfasConcentration!,
        formData.flowRate!,
        bedVolume,
        formData.gacDensity!,
        analysis.capacityEstimate,
        formData.ebct!,
        365
      )

      // If we have observed data, calculate validation metrics
      let validationMetrics = null
      if (observedBreakthrough && observedBreakthrough.length > 0) {
        // Interpolate predicted data to match observed data points
        const alignedPredicted = observedBreakthrough.map(obs => {
          const predicted = predictedBreakthrough.points.find(
            p => Math.abs(p.time - obs.time) < 1
          ) || predictedBreakthrough.points[0]
          return predicted
        })

        validationMetrics = compareBreakthroughCurves(alignedPredicted, observedBreakthrough)
      }

      setUploadedData({
        metadata,
        formData: completeFormData,
        observedBreakthrough
      })

      setAnalysisResults({
        analysis,
        predictedBreakthrough,
        validationMetrics
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file')
      console.error('Error processing file:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadTemplate = () => {
    exportHazenImportTemplate()
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">PFAS Model Validation</h1>
          <p className="text-slate-600">
            Upload Hazen/EPA datasets to validate breakthrough curve predictions
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Dataset Upload</CardTitle>
            <CardDescription>
              Upload a Hazen-formatted JSON file containing system configuration and observed breakthrough data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Template Download */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <FileJson className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold mb-2">Download Template</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get the JSON template for Hazen dataset import
                </p>
                <Button onClick={handleDownloadTemplate} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>

              {/* File Upload */}
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="font-semibold mb-2">Upload Dataset</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Select a JSON file with observed breakthrough data
                </p>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <Button asChild disabled={isLoading}>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {isLoading ? 'Processing...' : 'Upload File'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">Upload Error</h4>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Success Display */}
            {uploadedData && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Dataset Loaded Successfully</h4>
                  <p className="text-sm text-green-700">
                    Project: {(uploadedData.metadata as Record<string, string>).project_name || 'Unnamed Project'}
                  </p>
                  {(uploadedData.metadata as Record<string, string>).site_location && (
                    <p className="text-sm text-green-700">
                      Location: {(uploadedData.metadata as Record<string, string>).site_location}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {analysisResults && (() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const results = analysisResults as any;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const uploaded = uploadedData as any;
          return (
          <>
            {/* Analysis Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Analysis Summary</CardTitle>
                <CardDescription>Model predictions with full Monte Carlo simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-slate-600">Projected Lifespan</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {results.analysis.projectedLifespanMonths.toFixed(1)} months
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">P95 Confidence</p>
                    <p className="text-2xl font-bold text-green-600">
                      {results.analysis.monteCarloResults.p95.toFixed(1)} months
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">GAC Capacity</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {results.analysis.capacityEstimate.toFixed(3)} mg/g
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Removal Efficiency</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {results.analysis.removalEfficiency.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Monte Carlo Results */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Monte Carlo Simulation Results (5,000 iterations)</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Mean</p>
                      <p className="font-bold">{results.analysis.monteCarloResults.mean.toFixed(2)} months</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Std Dev</p>
                      <p className="font-bold">{results.analysis.monteCarloResults.stdDev.toFixed(2)} months</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">P5 - P95 Range</p>
                      <p className="font-bold">
                        {results.analysis.monteCarloResults.p5.toFixed(1)} - {results.analysis.monteCarloResults.p95.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Breakthrough Curve */}
            <BreakthroughCurveChart
              predicted={results.predictedBreakthrough.points}
              observed={uploaded.observedBreakthrough?.length > 0 ? uploaded.observedBreakthrough : undefined}
              title="GAC Breakthrough Curve - Validation Study"
              description="Predicted vs Observed PFAS Breakthrough"
              compoundName="Total PFAS"
              influentConcentration={uploaded.formData.totalPfasConcentration}
              validationMetrics={results.validationMetrics}
            />
          </>
        )})()}
      </div>
    </div>
  )
}
