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
  Shield,
  Target,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react'
import Link from 'next/link'

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
      gacType: 'Coal Based',
      gacDensity: 0.5,
      particleSize: 1.5,
      iodineNumber: 1000,
      surfaceArea: 900,
      poreVolume: 0.6,
      ashContent: 8.0,
      moistureContent: 5.0,
      phValue: 7.0,
      waterTemperature: 25.0,
      totalDissolvedSolids: 500,
      turbidity: 1.0,
      chlorineResidual: 0.5,
      organicCarbon: 2.0,
      targetContaminants: ['Chlorine', 'Taste and Odor'],
      contaminantConcentration: 1.0,
      targetRemoval: 95.0,
      emptyBedContactTime: 15.0,
      hydraulicLoadingRate: 10.0,
      bedVolumeUtilization: 80.0,
      regenerationFrequency: 180,
      regenerationMethod: 'Thermal',
      regenerationTemperature: 850.0,
      regenerationTime: 8.0,
      sorbentCost: 5.0,
      laborCost: 100.0,
      disposalCost: 50.0,
      energyCost: 2.0,
      complianceRequirements: ['EPA', 'State Regulations'],
      monitoringFrequency: 'Daily',
      reportingRequirements: 'Monthly',
      performanceMetrics: ['Removal Efficiency', 'Pressure Drop'],
      optimizationGoals: ['Cost Reduction', 'Extended Bed Life'],
      environmentalFactors: ['Temperature Variation', 'Flow Rate Changes'],
      operationalConstraints: ['Limited Downtime', 'Budget Constraints'],
      historicalData: 'Available',
      previousOptimization: 'None',
      maintenanceSchedule: 'Quarterly',
      operatorExperience: 'Intermediate',
      trainingNeeds: 'Basic',
      technologyReadiness: 'High'
    }
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const onSubmit = async (data: DataSubmissionFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Simulate analysis steps
      const steps = [
        'Initializing system analysis...',
        'Processing GAC parameters...',
        'Calculating adsorption isotherm...',
        'Running Monte Carlo simulation...',
        'Generating optimization recommendations...',
        'Preparing comprehensive report...'
      ]
      
      for (const step of steps) {
        setAnalysisStep(step)
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      
      // Submit to API
      const response = await fetch('/api/data-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactRequestId: (await params).id,
          formData: data
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setSubmitSuccess('Analysis complete! Your comprehensive optimization report has been sent to your email.')
        setIsSubmitted(true)
        
        // Redirect to analysis success page after a short delay
        setTimeout(() => {
          window.location.href = `/analysis-success/${(await params).id}`
        }, 2000)
      } else {
        setSubmitError('Failed to submit data. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
      setSubmitError('An error occurred while submitting your data. Please try again.')
    } finally {
      setIsSubmitting(false)
      setAnalysisStep('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data form...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Inversion Analytics</span>
            </div>
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Return Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              GAC System Data Submission
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Provide your GAC system specifications to receive a comprehensive optimization analysis and guaranteed cost savings.
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <Card className="bg-green-50 border-green-200 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Analysis Complete!</h3>
                    <p className="text-green-700">{submitSuccess}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {submitError && (
            <Card className="bg-red-50 border-red-200 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <p className="text-red-700">{submitError}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Progress */}
          {isSubmitting && analysisStep && (
            <Card className="bg-blue-50 border-blue-200 mb-8">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Processing Analysis</h3>
                    <p className="text-blue-700">{analysisStep}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* System Configuration */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Factory className="h-5 w-5 text-gray-700" />
                    <span>System Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Basic information about your GAC system setup
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="systemType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>System Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
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
                      name="vesselDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vessel Diameter (m)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                          <FormLabel>Vessel Height (m)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="flowRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flow Rate (m³/h)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* GAC Properties */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Gauge className="h-5 w-5 text-gray-700" />
                    <span>GAC Properties</span>
                  </CardTitle>
                  <CardDescription>
                    Characteristics of your granular activated carbon
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="gacType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GAC Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select GAC type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Coal Based">Coal Based</SelectItem>
                              <SelectItem value="Coconut Shell">Coconut Shell</SelectItem>
                              <SelectItem value="Wood Based">Wood Based</SelectItem>
                              <SelectItem value="Lignite">Lignite</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gacDensity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GAC Density (g/cm³)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="iodineNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Iodine Number (mg/g)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="10"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surfaceArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surface Area (m²/g)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="10"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Water Quality */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-gray-700" />
                    <span>Water Quality Parameters</span>
                  </CardTitle>
                  <CardDescription>
                    Current water quality conditions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>pH Value</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="waterTemperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Water Temperature (°C)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contaminantConcentration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contaminant Concentration (mg/L)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="targetRemoval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Removal Efficiency (%)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Operational Parameters */}
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-gray-700" />
                    <span>Operational Parameters</span>
                  </CardTitle>
                  <CardDescription>
                    Current operational settings and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="emptyBedContactTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empty Bed Contact Time (min)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="regenerationFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Regeneration Frequency (days)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sorbentCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sorbent Cost ($/kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="laborCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Labor Cost ($/hour)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="1"
                              className="border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                              {...field} 
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing System...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-5 w-5" />
                      Submit for Analysis
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>

          {/* Guarantee */}
          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-900">Performance Guarantee</h3>
                </div>
                <p className="text-blue-800">
                  We guarantee <span className="font-semibold">$200,000+ in cost savings</span> or your analysis is completely free.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
