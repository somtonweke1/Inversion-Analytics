'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  BarChart3, 
  Shield, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  Loader2, 
  CheckCircle,
  Activity,
  Award,
  Briefcase,
  Users,
  Clock,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successData, setSuccessData] = useState<{
    companyName: string
    dataFormUrl: string
  } | null>(null)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const companyName = formData.get('companyName') as string
    const contactName = formData.get('contactName') as string
    const contactEmail = formData.get('contactEmail') as string

    try {
      const response = await fetch('/api/contact-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          contactName,
          contactEmail,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        setSuccessData({
          companyName,
          dataFormUrl: result.dataFormUrl
        })
        setShowSuccess(true)
        setIsDialogOpen(false)
      } else {
        console.error('Failed to create contact request')
      }
    } catch (error) {
      console.error('Error creating contact request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailMeThisLink = async () => {
    if (!successData) return

    try {
      const response = await fetch('/api/send-data-form-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataFormUrl: successData.dataFormUrl,
          companyName: successData.companyName,
        }),
      })

      if (response.ok) {
        alert('Email sent successfully! Check your inbox.')
      } else {
        alert('Email could not be sent. Please copy the link manually.')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Email could not be sent. Please copy the link manually.')
    }
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
            <div className="flex items-center space-x-6">
              <Link href="/enterprise" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Enterprise
              </Link>
              <Link href="/investors" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Investors
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium mb-8">
              <Activity className="h-4 w-4 mr-2 text-gray-600" />
              Advanced GAC System Optimization
            </div>
            
            <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
              Optimize Your GAC System
              <span className="block text-gray-600 font-normal mt-2">Performance</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Advanced analytics and predictive modeling for granular activated carbon systems. 
              Reduce costs, extend bed life, and ensure compliance with our proprietary Freundlich Isotherm modeling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Request Analysis</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Enter your details to receive a secure link for data submission.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</Label>
                      <Input 
                        id="companyName" 
                        name="companyName" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">Contact Name</Label>
                      <Input 
                        id="contactName" 
                        name="contactName" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input 
                        id="contactEmail" 
                        name="contactEmail" 
                        type="email" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="px-8 py-4 text-lg font-medium border-gray-200 text-gray-700 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced capabilities designed for enterprise-grade GAC system optimization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Guaranteed Savings</h3>
                    <p className="text-sm text-gray-600">$200k+ or it's free</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our proprietary analysis guarantees significant cost savings through optimized GAC system performance and bed life extension.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Predictive Analytics</h3>
                    <p className="text-sm text-gray-600">Monte Carlo simulation</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Advanced Monte Carlo simulation predicts bed exhaustion with 95% accuracy, enabling proactive maintenance scheduling.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Compliance Assurance</h3>
                    <p className="text-sm text-gray-600">EPA standards</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Ensure full compliance with EPA regulations and industry standards through continuous monitoring and optimization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900 rounded-2xl p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold text-white mb-6">
                Ready to Optimize Your GAC System?
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Join leading data centers and manufacturing facilities in achieving unprecedented GAC system efficiency.
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium">
                    Start Your Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Request Analysis</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Enter your details to receive a secure link for data submission.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName2" className="text-sm font-medium text-gray-700">Company Name</Label>
                      <Input 
                        id="companyName2" 
                        name="companyName" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName2" className="text-sm font-medium text-gray-700">Contact Name</Label>
                      <Input 
                        id="contactName2" 
                        name="contactName" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail2" className="text-sm font-medium text-gray-700">Email Address</Label>
                      <Input 
                        id="contactEmail2" 
                        name="contactEmail" 
                        type="email" 
                        required 
                        className="border-gray-200 focus:border-gray-400 focus:ring-gray-400" 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500">
            © 2024 Inversion Analytics. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-900 mb-4">
              Analysis Request Ready
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
              <CheckCircle className="h-8 w-8 text-gray-900" />
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you, <span className="font-semibold text-gray-900">{successData?.companyName}</span>! 
              Your secure data submission link has been generated.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-3">Your secure data submission link:</p>
              <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
                <code className="text-sm text-gray-800 break-all">
                  {successData?.dataFormUrl}
                </code>
              </div>
              <Button 
                onClick={handleEmailMeThisLink}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me This Link
              </Button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">What Happens Next:</h3>
              <ul className="text-left text-blue-800 space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Submit your GAC system data through the secure form</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Our AI analyzes your system performance and optimization opportunities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Receive a comprehensive optimization report within 24 hours</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Get guaranteed savings of $200k+ or the analysis is free</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
