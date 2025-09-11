'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BarChart3, Shield, TrendingUp, Target, ArrowRight, Loader2 } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900 tracking-tight">Inversion Analytics</span>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-slate-900 hover:bg-slate-100" asChild>
              <a href="/enterprise">Enterprise</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
            Optimize Your GAC System Performance
          </h1>
          <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            Advanced analytics and optimization for Granular Activated Carbon systems. 
            Reduce costs, improve efficiency, and ensure compliance.
          </p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Get My Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-900">Request Your Analysis</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Provide your contact information to receive a secure link for data collection.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-slate-700 font-medium">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-slate-700 font-medium">Contact Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    type="text"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-slate-700 font-medium">Email Address</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Get Analysis Link'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
              Advanced GAC System Optimization
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Our proprietary modeling platform combines advanced analytics with real-world expertise 
              to deliver measurable results for your water treatment systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-slate-50/50">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Advanced Monte Carlo simulations and Freundlich Isotherm modeling 
                  to predict GAC bed life and optimize replacement schedules.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-slate-50/50">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-7 w-7 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Compliance Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Ensure regulatory compliance with real-time monitoring and 
                  automated reporting for PFAS removal and water quality standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-slate-50/50">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-slate-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600 leading-relaxed">
                  Reduce operational costs by up to 40% through optimized sorbent 
                  change schedules and improved system efficiency.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
            Ready to Optimize Your GAC System?
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join leading data centers and manufacturing facilities who trust our platform 
            for their water treatment optimization needs.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Start Your Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-slate-900">Inversion Analytics</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 Inversion Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}