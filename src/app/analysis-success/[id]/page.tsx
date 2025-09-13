'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  ArrowLeft, 
  BarChart3, 
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Phone,
  Mail,
  Calendar
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

  useEffect(() => {
    // In a real app, you'd fetch the analysis results from the API
    // For now, we'll use mock data
    const mockResults: AnalysisResults = {
      id: 'analysis_001',
      companyName: 'Water Treatment Solutions Inc',
      contactName: 'John Smith',
      contactEmail: 'john@example.com',
      potentialSavings: 250000,
      currentEfficiency: 60,
      optimalEfficiency: 85,
      bedLifeDays: 180,
      paybackPeriod: 8,
      roi: 400
    }
    
    setTimeout(() => {
      setAnalysisResults(mockResults)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your analysis results...</p>
        </div>
      </div>
    )
  }

  if (!analysisResults) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Analysis results not found.</p>
          <Link href="/" className="text-slate-600 hover:text-slate-900 mt-4 inline-block">
            Return to Home
          </Link>
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
        <div className="max-w-6xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Analysis Complete!
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Your GAC system analysis has been completed and sent to your email. 
              Here are your key optimization opportunities:
            </p>
          </div>

          {/* Key Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  ${analysisResults.potentialSavings.toLocaleString()}
                </h3>
                <p className="text-slate-600 font-medium">Annual Savings Potential</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {analysisResults.roi}%
                </h3>
                <p className="text-slate-600 font-medium">ROI on Investment</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">
                  {analysisResults.paybackPeriod} months
                </h3>
                <p className="text-slate-600 font-medium">Payback Period</p>
              </CardContent>
            </Card>
          </div>

          {/* Efficiency Improvement */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-slate-700" />
                Efficiency Improvement Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600">Current Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900">{analysisResults.currentEfficiency}%</p>
                </div>
                <ArrowRight className="h-6 w-6 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Optimal Efficiency</p>
                  <p className="text-2xl font-bold text-green-600">{analysisResults.optimalEfficiency}%</p>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-slate-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(analysisResults.currentEfficiency / analysisResults.optimalEfficiency) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {analysisResults.optimalEfficiency - analysisResults.currentEfficiency}% improvement potential
              </p>
            </CardContent>
          </Card>

          {/* Implementation Support Offer */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Ready to Capture These Savings?</CardTitle>
              <CardDescription className="text-slate-300">
                Our implementation support ensures you achieve the full potential of your GAC system optimization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Implementation Support Includes:
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Expert project management and coordination
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Vendor selection and negotiation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Technical guidance and optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      ROI tracking and performance monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Guaranteed results or money back
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white/10 rounded-2xl p-6 mb-4">
                    <h4 className="text-3xl font-bold mb-2">$35,000</h4>
                    <p className="text-slate-300">Full Implementation Support</p>
                    <Badge className="mt-2 bg-green-500 text-white">7x ROI Guaranteed</Badge>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-medium rounded-xl"
                    onClick={() => setShowImplementationModal(true)}
                  >
                    Get Implementation Support
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Guided Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Perfect for teams with some technical expertise who need guidance and validation.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-600">• Weekly check-ins and guidance</p>
                  <p className="text-sm text-slate-600">• Vendor evaluation support</p>
                  <p className="text-sm text-slate-600">• Technical specifications review</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">$10,000</span>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Ongoing Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Continuous monitoring and optimization to ensure sustained performance improvements.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-600">• Monthly performance reviews</p>
                  <p className="text-sm text-slate-600">• Optimization recommendations</p>
                  <p className="text-sm text-slate-600">• ROI tracking and reporting</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">$3,000/month</span>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">What Our Clients Say</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-2">
                    "Inversion Analytics helped us save $300K annually. Their implementation support was invaluable."
                  </p>
                  <p className="text-sm font-medium text-slate-900">Sarah Johnson, Water Treatment Solutions</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-2">
                    "The ROI was incredible - 400% return in just 8 months. Highly recommended!"
                  </p>
                  <p className="text-sm font-medium text-slate-900">Mike Chen, Industrial Facility</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-2">
                    "Professional, thorough, and delivered exactly what they promised. Great investment!"
                  </p>
                  <p className="text-sm font-medium text-slate-900">Lisa Rodriguez, Municipal Authority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Start Saving?
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Don't let this opportunity slip away. Every month you wait is money left on the table. 
              Let's discuss how we can help you achieve these savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 text-lg font-medium rounded-xl"
                onClick={() => setShowImplementationModal(true)}
              >
                Schedule Implementation Call
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-4 text-lg font-medium rounded-xl"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Modal */}
      {showImplementationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Schedule Implementation Consultation</CardTitle>
              <CardDescription>
                Let's discuss how we can help you achieve these savings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    defaultValue={analysisResults.companyName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    defaultValue={analysisResults.contactName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    defaultValue={analysisResults.contactEmail}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Package</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500">
                    <option>Full Implementation Support ($35,000)</option>
                    <option>Guided Implementation ($10,000)</option>
                    <option>Ongoing Optimization ($3,000/month)</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      // Handle form submission
                      alert('Consultation scheduled! We\'ll contact you within 24 hours.')
                      setShowImplementationModal(false)
                    }}
                  >
                    Schedule Call
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowImplementationModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
