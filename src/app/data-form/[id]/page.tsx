'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { dataSubmissionSchema, type DataSubmissionFormData } from '@/lib/validations'
import { Loader2, CheckCircle } from 'lucide-react'

interface ContactRequest {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  status: string
}

export default function DataFormPage({ params }: { params: Promise<{ id: string }> }) {
  const [contactId, setContactId] = useState<string>('')
  const [contactRequest, setContactRequest] = useState<ContactRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
  })

  useEffect(() => {
    const fetchContactRequest = async () => {
      try {
        const { id } = await params
        setContactId(id)
        const response = await fetch(`/api/contact-request/${id}`)
        if (response.ok) {
          const data = await response.json()
          setContactRequest(data)
        } else {
          console.error('Failed to fetch contact request')
        }
      } catch (error) {
        console.error('Error fetching contact request:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContactRequest()
  }, [params])

  const onSubmit = async (data: DataSubmissionFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/data-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactRequestId: contactId,
          ...data,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit data')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
      alert('There was an error submitting your data. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!contactRequest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Invalid Request</CardTitle>
            <CardDescription>
              The requested analysis link is invalid or has expired.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-600">Analysis Submitted!</CardTitle>
            <CardDescription>
              Thank you for submitting your data. We'll process your analysis and send you the results via email.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>GAC System Analysis - {contactRequest.companyName}</CardTitle>
            <CardDescription>
              Please provide detailed information about your Granular Activated Carbon system. 
              All fields are required for accurate analysis.
            </CardDescription>
          </CardHeader>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>
                  Basic parameters of your GAC treatment system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="systemType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>System Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select system type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Fixed Bed">Fixed Bed</SelectItem>
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
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                        <FormLabel>Bed Height (m)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ebct"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empty Bed Contact Time (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Water Quality Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Parameters</CardTitle>
                <CardDescription>
                  Chemical composition of the water being treated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="toc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Organic Carbon (mg/L)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sulfate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sulfate (mg/L)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="chloride"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chloride (mg/L)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alkalinity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alkalinity (mg/L as CaCO₃)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hardness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hardness (mg/L as CaCO₃)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ph"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>pH</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                        <FormLabel>Temperature (°C)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* PFAS Concentrations */}
            <Card>
              <CardHeader>
                <CardTitle>PFAS Concentrations</CardTitle>
                <CardDescription>
                  Per- and polyfluoroalkyl substances in ng/L
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: 'pfoaConcentration', label: 'PFOA (ng/L)' },
                    { name: 'pfosConcentration', label: 'PFOS (ng/L)' },
                    { name: 'pfnaConcentration', label: 'PFNA (ng/L)' },
                    { name: 'pfhxaConcentration', label: 'PFHxA (ng/L)' },
                    { name: 'pfhxsConcentration', label: 'PFHxS (ng/L)' },
                    { name: 'pfdaConcentration', label: 'PFDA (ng/L)' },
                    { name: 'pfbsConcentration', label: 'PFBS (ng/L)' },
                    { name: 'pfhpaConcentration', label: 'PFHpA (ng/L)' },
                    { name: 'pfundaConcentration', label: 'PFUnDA (ng/L)' },
                    { name: 'pfdoaConcentration', label: 'PFDoA (ng/L)' },
                    { name: 'totalPfasConcentration', label: 'Total PFAS (ng/L)' },
                  ].map(({ name, label }) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name as keyof DataSubmissionFormData}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GAC Properties */}
            <Card>
              <CardHeader>
                <CardTitle>GAC Properties</CardTitle>
                <CardDescription>
                  Characteristics of your Granular Activated Carbon
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="gacType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GAC Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select GAC type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Coal-based">Coal-based</SelectItem>
                            <SelectItem value="Coconut shell">Coconut shell</SelectItem>
                            <SelectItem value="Wood-based">Wood-based</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                        <FormLabel>GAC Density (kg/m³)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gacParticleSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Particle Size (mm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gacIodineNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Iodine Number (mg/g)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gacSurfaceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Surface Area (m²/g)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Economic Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Economic Parameters</CardTitle>
                <CardDescription>
                  Cost factors for your analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="gacCostPerKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GAC Cost ($/kg)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="replacementCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Replacement Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="100"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                        <FormLabel>Labor Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="100"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="disposalCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Disposal Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="100"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Parameters</CardTitle>
                <CardDescription>
                  Operating conditions and safety factors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="operatingDaysPerYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operating Days per Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatingHoursPerDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operating Hours per Day</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetRemovalEfficiency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Removal Efficiency (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="safetyFactor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Safety Factor</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit Analysis Request'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
