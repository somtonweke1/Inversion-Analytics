'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart3, Shield, Clock, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      companyName: formData.get('companyName') as string,
      contactName: formData.get('contactName') as string,
      contactEmail: formData.get('contactEmail') as string,
    }
    
    try {
      // For now, generate a mock response since serverless functions have limitations
      // In production, this would connect to a real database
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const base = typeof window !== 'undefined' ? window.location.origin : ''
      const dataFormUrl = `${base}/data-form/${mockId}`
      
      setIsDialogOpen(false)
      alert(`Thank you! Your secure link: ${dataFormUrl}`)
      
    } catch (error) {
      console.error('Error submitting contact request:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-slate-900" />
              <span className="text-xl font-semibold tracking-tight text-slate-900">Inversion Analytics</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              Contact Sales
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-900">
              Optimize your GAC system with confidence
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Get a comprehensive analysis of your Granular Activated Carbon system with our 
              advanced modeling technology. Reduce costs, extend lifespan, and ensure compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="rounded-full px-7 py-5 text-base">
                    Request your analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-6">
                  <DialogHeader>
                    <DialogTitle>Request your analysis</DialogTitle>
                    <DialogDescription>
                      Get a comprehensive GAC system analysis tailored to your conditions.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        placeholder="Your Company"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Your Name</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending…' : 'Get my analysis'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="rounded-full px-7 py-5 text-base">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">Why Inversion Analytics</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our advanced modeling technology provides insights that traditional methods simply cannot match.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ring-1 ring-slate-200">
                  <BarChart3 className="h-5 w-5 text-slate-900" />
                </div>
                <CardTitle className="text-slate-900">Advanced Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Proprietary Freundlich Isotherm and Monte Carlo simulation models 
                  provide accurate lifespan predictions and cost optimization insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ring-1 ring-slate-200">
                  <Shield className="h-5 w-5 text-slate-900" />
                </div>
                <CardTitle className="text-slate-900">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Get P95 confidence intervals and safety factors to ensure 
                  your system meets regulatory requirements and operational targets.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-4 ring-1 ring-slate-200">
                  <Clock className="h-5 w-5 text-slate-900" />
                </div>
                <CardTitle className="text-slate-900">Time &amp; Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Optimize replacement schedules and reduce unnecessary 
                  maintenance costs while extending your GAC system&apos;s effective life.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get your comprehensive analysis in just a few simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "1",
                title: "Request Analysis",
                description: "Fill out our simple contact form to get started."
              },
              {
                step: "2", 
                title: "Submit Data",
                description: "Complete our detailed technical questionnaire with your system parameters."
              },
              {
                step: "3",
                title: "Advanced Analysis",
                description: "Our AI processes your data using proprietary modeling algorithms."
              },
              {
                step: "4",
                title: "Get Your Report",
                description: "Receive a comprehensive PDF report with actionable insights."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 ring-1 ring-slate-200 text-sm font-medium text-slate-900">
                  {item.step}
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-slate-200 p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-3">
              Ready to optimize your GAC system?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Trusted by leading water treatment teams for critical decisions.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-full px-7 py-5 text-base">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-14 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-5 w-5 text-slate-900" />
                <span className="text-base font-medium tracking-tight text-slate-900">Inversion Analytics</span>
              </div>
              <p className="text-slate-600">
                Advanced GAC system analysis and optimization for water treatment facilities.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-3">Product</h3>
              <ul className="space-y-2 text-slate-600">
                <li>GAC Analysis</li>
                <li>Lifespan Prediction</li>
                <li>Cost Optimization</li>
                <li>Risk Assessment</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-3">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 mb-3">Contact</h3>
              <ul className="space-y-2 text-slate-600">
                <li>admin@axiomanalytics.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-10 pt-8 text-center text-slate-500 text-sm">
            <p>© 2024 Inversion Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}