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
  Zap
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Form data is used for validation but not stored in this mock implementation
    new FormData(e.currentTarget)

    try {
      // Generate a mock response that works in both local and production
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
      <nav className="border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-semibold text-slate-900 tracking-tight">Inversion Analytics</span>
            </div>
            <div className="flex items-center space-x-8">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 font-medium" asChild>
                <Link href="/enterprise">Enterprise</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 font-medium" asChild>
                <Link href="/investors">Investors</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-24 px-8">
        <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
          <header className="mb-32 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium mb-8">
                <Zap className="h-4 w-4 mr-2 text-slate-600" />
                Advanced GAC System Optimization
              </div>
            </div>
            <h1 className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Optimize Your GAC System
              <span className="block text-slate-600 font-normal">Performance</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Advanced analytics and predictive modeling for granular activated carbon systems. 
              Reduce costs, extend bed life, and ensure compliance with our proprietary Freundlich Isotherm modeling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 text-lg font-medium rounded-xl">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Request Analysis</DialogTitle>
                    <DialogDescription className="text-slate-600">
                      Enter your details to receive a secure link for data submission.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name</Label>
                      <Input id="companyName" name="companyName" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName" className="text-sm font-medium text-slate-700">Contact Name</Label>
                      <Input id="contactName" name="contactName" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail" className="text-sm font-medium text-slate-700">Email</Label>
                      <Input id="contactEmail" name="contactEmail" type="email" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                    </div>
                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 font-medium" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="px-10 py-4 text-lg font-medium rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50">
                Learn More
              </Button>
            </div>
          </header>

      {/* Features Section */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Key Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Advanced capabilities designed for enterprise-grade GAC system optimization
            </p>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <Shield className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Guaranteed Savings</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">$200k+ or it&apos;s free</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Our proprietary analysis guarantees significant cost savings through optimized GAC system performance and bed life extension.
                  </p>
              </CardContent>
            </Card>

              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Predictive Analytics</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">Monte Carlo simulation</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Advanced Monte Carlo simulation predicts bed exhaustion with 95% accuracy, enabling proactive maintenance scheduling.
                  </p>
              </CardContent>
            </Card>

              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <Target className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Compliance Assurance</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">EPA standards</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                  <p className="text-slate-700 leading-relaxed text-base">
                    Ensure full compliance with EPA regulations and industry standards through continuous monitoring and optimization.
                  </p>
              </CardContent>
            </Card>
        </div>
      </section>

      {/* CTA Section */}
          <section className="mb-24">
            <div className="bg-slate-900 rounded-3xl p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                  Ready to Optimize Your GAC System?
            </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Join leading data centers and manufacturing facilities in achieving unprecedented GAC system efficiency.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 text-lg font-medium rounded-xl">
                      Start Your Analysis
                      <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold">Request Analysis</DialogTitle>
                      <DialogDescription className="text-slate-600">
                        Enter your details to receive a secure link for data submission.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">Company Name</Label>
                        <Input id="companyName" name="companyName" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-sm font-medium text-slate-700">Contact Name</Label>
                        <Input id="contactName" name="contactName" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail" className="text-sm font-medium text-slate-700">Email</Label>
                        <Input id="contactEmail" name="contactEmail" type="email" required className="border-slate-200 focus:border-slate-400 focus:ring-slate-400" />
                      </div>
                      <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 font-medium" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
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
      </section>

          <footer className="text-center text-slate-500 py-8">
            <p>&copy; 2024 Inversion Analytics. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}