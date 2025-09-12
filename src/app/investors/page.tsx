'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Globe, 
  Shield, 
  Users, 
  BarChart3, 
  ArrowUpRight,
  CheckCircle,
  Star,
  Award,
  Zap,
  ArrowLeft,
  Factory
} from 'lucide-react'
import Link from 'next/link'
import { calculateRevenueProjections, getMarketAnalysis } from '@/lib/revenue-model'

export default function InvestorsPage() {
  const [initialAudits, setInitialAudits] = useState(1)
  const [auditConversionToMonitoring, setAuditConversionToMonitoring] = useState(60) // %
  const [auditConversionToSoftware, setAuditConversionToSoftware] = useState(10) // %
  const [growthRateAudits, setGrowthRateAudits] = useState(50) // %
  const [growthRateMonitoring, setGrowthRateMonitoring] = useState(75) // %
  const [growthRateSoftware, setGrowthRateSoftware] = useState(50) // %

  const revenueProjections = calculateRevenueProjections(
    initialAudits,
    auditConversionToMonitoring,
    auditConversionToSoftware,
    growthRateAudits,
    growthRateMonitoring,
    growthRateSoftware
  )
  const marketAnalysis = getMarketAnalysis()

  const marketMetrics = [
    {
      title: "Total Addressable Market",
      value: `$${marketAnalysis.totalAddressableMarket}B`,
      description: "Global water compliance market",
      icon: Globe,
      color: "text-blue-600"
    },
    {
      title: "5-Year Target",
      value: `$${marketAnalysis.targetRevenue5Years}M`,
      description: `${marketAnalysis.targetMarketShare}% market share goal`,
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Revenue Multiple",
      value: "120x",
      description: "TAM to target ratio",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  const competitiveAdvantages = [
    {
      title: "Expertise-Driven",
      description: "Our models are built on deep, real-world water treatment expertise, not just generic AI. We turn expert knowledge into scalable software.",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Guaranteed ROI",
      description: "We guarantee significant savings for our audit clients, or the service is free. This removes risk and builds trust immediately.",
      icon: Award,
      color: "text-green-600"
    }
  ]

  const investmentHighlights = [
    {
      title: "Proven Technology",
      description: "Freundlich Isotherm modeling with 95% accuracy",
      icon: CheckCircle
    },
    {
      title: "Market Ready",
      description: "Immediate deployment in data centers and manufacturing",
      icon: Factory
    },
    {
      title: "Scalable Model",
      description: "Software-as-a-Service with recurring revenue",
      icon: TrendingUp
    },
    {
      title: "Expert Team",
      description: "Deep domain expertise in water treatment",
      icon: Users
    }
  ]

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
          {/* Hero Section */}
          <header className="mb-24 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium mb-8">
                <TrendingUp className="h-4 w-4 mr-2 text-slate-600" />
                Investment Opportunity
              </div>
            </div>
            <h1 className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Investment Opportunity
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Join us in revolutionizing GAC system optimization with cutting-edge analytics and guaranteed ROI for enterprise clients.
            </p>
          </header>

          {/* Revenue Projections */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Revenue Projections</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Conservative 5-year revenue projections based on market penetration and service adoption
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Interactive Revenue Projection Tool */}
              <Card className="p-8 rounded-2xl border-0 shadow-none bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold">
                    <BarChart3 className="w-6 h-6 mr-3 text-slate-700" />
                    Projection Inputs
                  </CardTitle>
                  <CardDescription className="text-slate-600">Adjust parameters to see revenue projections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="initialAudits" className="text-slate-700 font-medium">Initial Audit Contracts (Year 1)</Label>
                    <Input 
                      id="initialAudits" 
                      type="number" 
                      value={initialAudits} 
                      onChange={(e) => setInitialAudits(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auditConversionToMonitoring" className="text-slate-700 font-medium">Audit Conversion to Monitoring (%)</Label>
                    <Input 
                      id="auditConversionToMonitoring" 
                      type="number" 
                      value={auditConversionToMonitoring} 
                      onChange={(e) => setAuditConversionToMonitoring(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auditConversionToSoftware" className="text-slate-700 font-medium">Audit Conversion to Software (%)</Label>
                    <Input 
                      id="auditConversionToSoftware" 
                      type="number" 
                      value={auditConversionToSoftware} 
                      onChange={(e) => setAuditConversionToSoftware(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="growthRateAudits" className="text-slate-700 font-medium">Annual Audit Growth Rate (%)</Label>
                    <Input 
                      id="growthRateAudits" 
                      type="number" 
                      value={growthRateAudits} 
                      onChange={(e) => setGrowthRateAudits(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="growthRateMonitoring" className="text-slate-700 font-medium">Annual Monitoring Growth Rate (%)</Label>
                    <Input 
                      id="growthRateMonitoring" 
                      type="number" 
                      value={growthRateMonitoring} 
                      onChange={(e) => setGrowthRateMonitoring(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="growthRateSoftware" className="text-slate-700 font-medium">Annual Software Growth Rate (%)</Label>
                    <Input 
                      id="growthRateSoftware" 
                      type="number" 
                      value={growthRateSoftware} 
                      onChange={(e) => setGrowthRateSoftware(parseInt(e.target.value))} 
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card className="p-8 rounded-2xl border-0 shadow-none bg-white">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl font-semibold">
                    <DollarSign className="w-6 h-6 mr-3 text-slate-700" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueProjections.map((projection) => (
                      <div key={projection.year} className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center text-sm font-medium">
                            {projection.year}
                          </div>
                          <span className="font-medium text-slate-900">Year {projection.year} Total Revenue</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-slate-900">${projection.totalRevenue.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200">
                      <span className="font-semibold text-slate-900 text-lg">5-Year Cumulative Revenue</span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${revenueProjections.reduce((sum: number, p: { totalRevenue: number }) => sum + p.totalRevenue, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Market Opportunity */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Market Opportunity</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Massive addressable market with clear path to significant market share
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {marketMetrics.map((metric, index) => (
                <Card key={index} className="p-8 rounded-2xl border-0 shadow-none bg-white text-center">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                        <metric.icon className={`h-8 w-8 ${metric.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-slate-900 mb-2">{metric.value}</div>
                    <p className="text-slate-600">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Competitive Advantage */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Competitive Advantage</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Unique positioning in the market with defensible moats
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {competitiveAdvantages.map((advantage, index) => (
                <Card key={index} className="p-8 rounded-2xl border-0 shadow-none bg-white">
                  <CardHeader className="pb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                        <advantage.icon className={`h-7 w-7 ${advantage.color}`} />
                      </div>
                      <CardTitle className="text-xl font-semibold text-slate-900">{advantage.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 leading-relaxed text-base">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Investment Highlights */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Investment Highlights</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Key factors that make this an attractive investment opportunity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {investmentHighlights.map((highlight, index) => (
                <Card key={index} className="p-6 rounded-2xl border-0 shadow-none bg-white text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                        <highlight.icon className="h-6 w-6 text-slate-700" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{highlight.title}</h3>
                    <p className="text-slate-600 text-sm">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-24">
            <div className="bg-slate-900 rounded-3xl p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                  Ready to Invest?
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Join us in revolutionizing GAC system optimization and capturing a significant share of the $3B water compliance market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 text-lg font-medium rounded-xl">
                    Schedule Meeting
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="px-10 py-4 text-lg font-medium rounded-xl border-slate-300 text-white hover:bg-white/10">
                    Download Deck
                  </Button>
                </div>
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