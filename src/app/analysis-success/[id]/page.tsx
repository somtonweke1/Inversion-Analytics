'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Mail,
  Calendar,
  Activity,
  Briefcase,
  Gauge
} from 'lucide-react'
import Link from 'next/link'

interface AnalysisResults {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  potentialSavings: number
  currentEfficiency: number
  optimalEfficiency: number
  bedLifeDays: number
  paybackPeriod: number
  roi: number
}

export default function AnalysisSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [showImplementationModal, setShowImplementationModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const resolvedParams = await params
        const response = await fetch(`/api/report/${resolvedParams.id}`)

        if (!response.ok) {
          throw new Error('Report not found')
        }

        const data = await response.json()

        // Transform database report to match AnalysisResults interface
        const transformedResults: AnalysisResults = {
          id: data.id,
          companyName: data.contactRequest.companyName,
          contactName: data.contactRequest.contactName,
          contactEmail: data.contactRequest.contactEmail,
          potentialSavings: data.capitalAvoidance,
          currentEfficiency: 60,
          optimalEfficiency: 85,
          bedLifeDays: Math.round(data.projectedLifespanMonths * 30),
          paybackPeriod: 8,
          roi: 400
        }

        setAnalysisResults(transformedResults)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching report:', error)
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [params])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analysis results...</p>
        </div>
      </div>
    )
  }

  if (!analysisResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Analysis results not found.</p>
          <Link href="/" className="text-gray-600 hover:text-gray-900 mt-4 inline-block">
            Return to Home
          </Link>
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
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Success Header */}
          <div className="text-center mb-16">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
              <CheckCircle className="h-8 w-8 text-gray-900" />
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              Analysis Complete
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your GAC system analysis is ready. Review the findings and select your implementation path.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Potential Savings</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${analysisResults.potentialSavings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {analysisResults.roi}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payback Period</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {analysisResults.paybackPeriod} months
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Gauge className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Efficiency Gain</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {analysisResults.optimalEfficiency - analysisResults.currentEfficiency}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Options */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Implementation Options
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the level of support that best fits your organization&apos;s needs and timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Guided Implementation */}
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Guided Implementation
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    Expert guidance with your internal team leading the project
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Weekly expert guidance calls</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Implementation roadmap</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Progress monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Training for your team</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">$10,000</div>
                  <Button 
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={() => setShowImplementationModal(true)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Full Implementation */}
              <Card className="bg-white border-2 border-blue-200 hover:shadow-lg transition-shadow relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="pb-4 pt-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Full Implementation
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    Complete project management with guaranteed results
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">End-to-end project management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Dedicated project manager</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Vendor coordination</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Performance guarantees</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">$35,000</div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowImplementationModal(true)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Ongoing Optimization */}
              <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                      <Activity className="h-5 w-5 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Ongoing Optimization
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">
                    Continuous monitoring and optimization services
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Real-time monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Monthly optimization reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">24/7 support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700">Predictive maintenance</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-4">$3,000<span className="text-lg text-gray-600">/month</span></div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => setShowImplementationModal(true)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* View Report Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                Your Comprehensive Analysis Report is Ready
              </h3>
              <p className="text-blue-800 mb-8 max-w-2xl mx-auto">
                View your detailed GAC system analysis with specific recommendations, cost breakdowns, and implementation roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium"
                  onClick={() => window.open(`/report/${analysisResults.id}`, '_blank')}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  View Full Report
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-medium"
                  onClick={() => {
                    // Simulate downloading the report
                    const link = document.createElement('a')
                    link.href = `/api/report/${analysisResults.id}/download`
                    link.download = `GAC-Analysis-Report-${analysisResults.companyName.replace(/\s+/g, '-')}.pdf`
                    link.click()
                  }}
                >
                  <Activity className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Schedule a consultation with our engineering team to discuss your specific needs and timeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
                  onClick={() => setShowImplementationModal(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-3">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Questions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Modal */}
      {showImplementationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Schedule Implementation Consultation
              </CardTitle>
              <CardDescription>
                Let&apos;s discuss how we can help you achieve these savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={analysisResults.companyName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      defaultValue={analysisResults.contactName}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={analysisResults.contactEmail}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Implementation Package
                  </label>
                  <select
                    name="package"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Guided Implementation - $10,000</option>
                    <option>Full Implementation - $35,000</option>
                    <option>Ongoing Optimization - $3,000/month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your specific needs or timeline..."
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowImplementationModal(false)}
                    className="border-gray-300 text-gray-700"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={async (e) => {
                      e.preventDefault()
                      setIsSubmitting(true)

                      try {
                        const formElement = e.currentTarget.closest('form') as HTMLFormElement
                        const formData = new FormData(formElement)

                        const response = await fetch('/api/consultation', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            companyName: formData.get('companyName') || analysisResults?.companyName,
                            contactName: formData.get('contactName') || analysisResults?.contactName,
                            contactEmail: formData.get('contactEmail') || analysisResults?.contactEmail,
                            implementationPackage: formData.get('package'),
                            message: formData.get('message'),
                            reportId: analysisResults?.id,
                          }),
                        })

                        if (response.ok) {
                          alert('Consultation request submitted! We will contact you within 24 hours.')
                          setShowImplementationModal(false)
                        } else {
                          const error = await response.json()
                          alert(`Failed to submit: ${error.error || 'Please try again.'}`)
                        }
                      } catch (error) {
                        console.error('Error submitting consultation request:', error)
                        alert('Failed to submit consultation request. Please try again.')
                      } finally {
                        setIsSubmitting(false)
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Consultation'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
