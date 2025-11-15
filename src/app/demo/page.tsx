'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, PlayCircle, CheckCircle2, Map } from 'lucide-react'
import Link from 'next/link'

export default function DemoPage() {
  const handleDownloadDemo = () => {
    // Download the demo dataset
    const link = document.createElement('a')
    link.href = '/demo-hazen-dataset.json'
    link.download = 'demo-hazen-dataset.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Inversion Analytics Platform
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            PFAS GAC Performance Modeling & Validation
          </p>
          <p className="text-lg text-blue-600 font-semibold">
            Interactive Demo & Testing Guide
          </p>
        </div>

        {/* What is this? */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              What is this platform?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 mb-4">
              Inversion Analytics provides research-grade modeling for PFAS (Per- and Polyfluoroalkyl Substances)
              treatment using Granular Activated Carbon (GAC). Our platform uses validated scientific models to:
            </p>
            <ul className="space-y-2 text-slate-700 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Predict GAC breakthrough curves using the Thomas model</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Estimate treatment system lifespan with Monte Carlo simulation (5,000 iterations)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Validate predictions against observed breakthrough data</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Calculate validation metrics (R², RMSE, MAE, MAPE)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Visualize project locations with interactive maps</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-6 w-6 text-purple-600" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>Geographic project visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 mb-4">
                Interactive map showing PFAS treatment sites across the USA with:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Color-coded status markers</li>
                <li>• Project details on click</li>
                <li>• Performance metrics</li>
                <li>• Capital avoidance calculations</li>
              </ul>
              <Link href="/admin/dashboard">
                <Button className="w-full mt-4" variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Validation Study
              </CardTitle>
              <CardDescription>Model validation interface</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 mb-4">
                Upload Hazen-formatted datasets to validate breakthrough predictions:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Predicted vs observed curves</li>
                <li>• Statistical validation metrics</li>
                <li>• Monte Carlo uncertainty analysis</li>
                <li>• CSV/JSON export for research</li>
              </ul>
              <Link href="/admin/validation">
                <Button className="w-full mt-4" variant="outline">
                  Try Validation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Testing Guide */}
        <Card className="mb-8 border-2 border-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="h-6 w-6 text-blue-600" />
              Try the Platform - Interactive Demo
            </CardTitle>
            <CardDescription>
              Follow these steps to test the validation interface with real data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-bold text-lg mb-2">Step 1: Download Demo Dataset</h3>
                <p className="text-slate-700 mb-3">
                  Download our pre-configured Hazen dataset containing:
                </p>
                <ul className="text-sm text-slate-600 space-y-1 ml-4 mb-4">
                  <li>• Flint Water Treatment Facility configuration</li>
                  <li>• 13 observed breakthrough data points (0-360 days)</li>
                  <li>• Complete water quality parameters</li>
                  <li>• Economic data and system specifications</li>
                </ul>
                <Button onClick={handleDownloadDemo} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download demo-hazen-dataset.json
                </Button>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-bold text-lg mb-2">Step 2: Navigate to Validation Page</h3>
                <p className="text-slate-700 mb-3">
                  Go to the validation study interface where you can upload datasets:
                </p>
                <Link href="/admin/validation">
                  <Button variant="outline" className="gap-2">
                    <PlayCircle className="h-4 w-4" />
                    Open Validation Page
                  </Button>
                </Link>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-bold text-lg mb-2">Step 3: Upload and Analyze</h3>
                <p className="text-slate-700 mb-3">
                  On the validation page:
                </p>
                <ol className="text-sm text-slate-600 space-y-2 ml-4">
                  <li>1. Click &quot;Upload File&quot; button</li>
                  <li>2. Select the demo-hazen-dataset.json you downloaded</li>
                  <li>3. Wait 5-10 seconds for analysis to complete</li>
                  <li>4. Observe the results:</li>
                </ol>
                <div className="mt-3 ml-8 text-sm text-slate-600">
                  <p className="font-semibold text-slate-700 mb-2">Expected Results:</p>
                  <ul className="space-y-1">
                    <li>• Projected Lifespan: ~18-20 months</li>
                    <li>• GAC Capacity: ~0.15-0.20 mg/g</li>
                    <li>• Removal Efficiency: ~95-99%</li>
                    <li>• Monte Carlo Results with P5-P95 confidence interval</li>
                    <li>• Breakthrough curve visualization</li>
                    <li>• Validation metrics (R², RMSE, MAE)</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border-l-4 border-amber-500 pl-4">
                <h3 className="font-bold text-lg mb-2">Step 4: Explore Dashboard</h3>
                <p className="text-slate-700 mb-3">
                  Check out the admin dashboard to see the interactive project map:
                </p>
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="gap-2">
                    <Map className="h-4 w-4" />
                    View Dashboard Map
                  </Button>
                </Link>
                <p className="text-sm text-slate-600 mt-3">
                  The map shows 5 test projects across the USA with location markers,
                  status indicators, and performance metrics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scientific Rigor */}
        <Card className="mb-8 bg-slate-50">
          <CardHeader>
            <CardTitle>Scientific Foundation</CardTitle>
            <CardDescription>Peer-reviewed models and methodologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Freundlich Isotherm</h4>
                <p className="text-sm text-slate-600 mb-2">
                  GAC capacity estimation: q = K·C^(1/n)
                </p>
                <p className="text-xs text-slate-500">
                  Citations: Appleman et al. (2014), Kothawala et al. (2017), EPA (2021)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Thomas Model</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Breakthrough curve prediction for fixed-bed GAC systems
                </p>
                <p className="text-xs text-slate-500">
                  Citations: Thomas (1944), Crittenden et al. (2012), ITRC/EPA (2020)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Monte Carlo Simulation</h4>
                <p className="text-sm text-slate-600 mb-2">
                  5,000 iterations using Box-Muller transform
                </p>
                <p className="text-xs text-slate-500">
                  Citation: Box & Muller (1958)
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Validation Metrics</h4>
                <p className="text-sm text-slate-600 mb-2">
                  R², RMSE, MAE, MAPE for model comparison
                </p>
                <p className="text-xs text-slate-500">
                  Standard statistical validation methods
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm">
          <p className="mb-2">
            Developed for academic validation and research collaboration
          </p>
          <p className="text-xs text-slate-500">
            Platform Version 1.0 | November 2025
          </p>
        </div>
      </div>
    </div>
  )
}
