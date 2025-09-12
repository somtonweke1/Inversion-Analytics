'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { dataSubmissionSchema, type DataSubmissionFormData } from '@/lib/validations'
import { 
  Loader2, 
  CheckCircle, 
  ArrowLeft, 
  BarChart3, 
  Factory, 
  Gauge, 
  Zap,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

// interface ContactRequest {
//   id: string
//   companyName: string
//   contactName: string
//   contactEmail: string
//   status: string
// }

export default function DataFormPage({ params }: { params: Promise<{ id: string }> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [analysisStep, setAnalysisStep] = useState<string>('')

  const form = useForm<DataSubmissionFormData>({
    resolver: zodResolver(dataSubmissionSchema),
    defaultValues: {
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
      pfoaConcentration: 15,
      pfosConcentration: 8,
      pfnaConcentration: 2,
      pfhxaConcentration: 1,
      pfhxsConcentration: 0.5,
      pfdaConcentration: 0.3,
      pfbsConcentration: 0.2,
      pfhpaConcentration: 0.1,
      pfundaConcentration: 0.05,
      pfdoaConcentration: 0.02,
      totalPfasConcentration: 27.17,
      gacType: 'Calgon F400',
      gacDensity: 450,
      gacParticleSize: 0.8,
      gacIodineNumber: 1100,
      gacSurfaceArea: 1200,
      gacCostPerKg: 3.50,
      replacementCost: 50000,
      laborCost: 20000,
      disposalCost: 10000,
      operatingDaysPerYear: 365,
      operatingHoursPerDay: 24,
      targetRemovalEfficiency: 95,
      safetyFactor: 1.2
    }
  })

  useEffect(() => {
    const resolveParams = async () => {
      await params // Just resolve the params promise
      setIsLoading(false)
    }
    resolveParams()
  }, [params])

  const onSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(null)
    setAnalysisStep('')

    try {
      // Simulate analysis steps
      const steps = [
        'Validating system parameters...',
        'Running Freundlich Isotherm analysis...',
        'Performing Monte Carlo simulation...',
        'Calculating bed life predictions...',
        'Generating cost optimization report...',
        'Preparing final analysis...'
      ]

      for (let i = 0; i < steps.length; i++) {
        setAnalysisStep(steps[i])
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Generate mock analysis results
      const mockResults = {
        bedLifeDays: Math.floor(Math.random() * 365) + 180,
        costSavings: Math.floor(Math.random() * 500000) + 200000,
        roi: Math.floor(Math.random() * 300) + 150,
        paybackPeriod: Math.floor(Math.random() * 12) + 6
      }

      setIsSubmitted(true)
      setSubmitSuccess(`Analysis complete! Your GAC system analysis shows ${mockResults.bedLifeDays} days bed life with $${mockResults.costSavings.toLocaleString()} in potential savings.`)
      
    } catch (error) {
      console.error('Error submitting data:', error)
      setSubmitError('There was an error processing your analysis. Please try again.')
    } finally {
      setIsSubmitting(false)
      setAnalysisStep('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading form...</p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 font-medium" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-semibold text-slate-900 tracking-tight">Inversion Analytics</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20 pb-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Analysis Complete!
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Thank you for submitting your data. We&apos;ll process your analysis and send you the results via email.
              </p>
            </div>

            <Card className="p-8 rounded-2xl border-0 shadow-xl bg-slate-50">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Bed Life Prediction</h3>
                    <p className="text-slate-600">Advanced modeling predicts optimal replacement timing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Cost Optimization</h3>
                    <p className="text-slate-600">Detailed analysis of potential savings and ROI</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-12">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 text-lg font-medium rounded-xl" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 font-medium" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-semibold text-slate-900 tracking-tight">Inversion Analytics</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium mb-8">
                <Factory className="h-4 w-4 mr-2 text-slate-600" />
                GAC System Analysis
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              System Data Collection
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Please provide detailed information about your GAC system for comprehensive analysis and optimization recommendations.
            </p>
          </header>

          {/* Form */}
          <Card className="p-8 rounded-2xl border-0 shadow-xl bg-white">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-semibold text-slate-900">System Parameters</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your GAC system specifications for accurate analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* System Configuration */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Gauge className="h-5 w-5 mr-2 text-slate-600" />
                      System Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="systemType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">System Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-slate-200 focus:border-slate-400 focus:ring-slate-400">
                                  <SelectValue placeholder="Select system type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Fixed Bed">Fixed Bed</SelectItem>
                                <SelectItem value="Moving Bed">Moving Bed</SelectItem>
                                <SelectItem value="Fluidized Bed">Fluidized Bed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="flowRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Flow Rate (m³/h)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Vessel Dimensions */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Factory className="h-5 w-5 mr-2 text-slate-600" />
                      Vessel Dimensions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="vesselDiameter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Diameter (m)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vesselHeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Height (m)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bedHeight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Bed Height (m)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Water Quality */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-slate-600" />
                      Water Quality Parameters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="ph"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">pH</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Temperature (°C)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="toc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">TOC (mg/L)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* PFAS Concentrations */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-slate-600" />
                      PFAS Concentrations (ng/L)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="pfoaConcentration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">PFOA</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pfosConcentration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">PFOS</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="totalPfasConcentration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Total PFAS</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* GAC Properties */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-slate-600" />
                      GAC Properties
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="gacType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">GAC Type</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gacDensity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Density (kg/m³)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.1" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gacCostPerKg"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">Cost per kg ($)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.01" 
                                {...field} 
                                className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 text-lg font-medium rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {analysisStep || 'Processing...'}
                        </>
                      ) : (
                        'Submit Analysis'
                      )}
                    </Button>
                  </div>

                  {/* Error/Success Messages */}
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-700">{submitError}</p>
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-green-700">{submitSuccess}</p>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}