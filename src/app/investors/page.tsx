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
  Zap
} from 'lucide-react'
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
      icon: Award,
      highlight: "Real-world expertise"
    },
    {
      title: "Guaranteed ROI",
      description: "We guarantee significant savings for our audit clients, or the service is free. This removes risk and builds trust immediately.",
      icon: Shield,
      highlight: "Risk-free guarantee"
    },
    {
      title: "Scalable Technology",
      description: "Proprietary environmental engineering algorithms that can be deployed across thousands of facilities worldwide.",
      icon: Zap,
      highlight: "Proprietary algorithms"
    }
  ]

  const financialHighlights = [
    { metric: "Year 1 Revenue", value: "$50,000", growth: "0%" },
    { metric: "5-Year Cumulative", value: "$250,000", growth: "0%" },
    { metric: "Market Share Target", value: "1%", growth: "New" },
    { metric: "TAM Opportunity", value: "$3B", growth: "Massive" }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IA</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">Inversion Analytics</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors">Home</a>
              <a href="/enterprise" className="text-slate-600 hover:text-slate-900 transition-colors">Enterprise</a>
              <a href="/investors" className="text-slate-900 font-medium">Investors</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Investment Opportunity
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transforming the $3B water compliance market through environmental engineering expertise and guaranteed ROI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                <DollarSign className="w-5 h-5 mr-2" />
                View Financial Model
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                <Users className="w-5 h-5 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Revenue Projections</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Conservative 5-year revenue projections based on market penetration and service adoption
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Interactive Revenue Projection Tool */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-slate-600" />
                  Projection Inputs
                </CardTitle>
                <CardDescription>Adjust parameters to see revenue projections</CardDescription>
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
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-slate-600" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueProjections.map((projection) => (
                    <div key={projection.year} className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {projection.year}
                        </div>
                        <span className="font-medium text-slate-900">Year {projection.year} Total Revenue</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">${projection.totalRevenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200">
                    <span className="font-semibold text-slate-900">5-Year Cumulative Revenue</span>
                    <span className="text-xl font-bold text-slate-900">
                      ${revenueProjections.reduce((sum: number, p: any) => sum + p.totalRevenue, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Market Opportunity</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Massive untapped market with clear path to significant revenue growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {marketMetrics.map((metric, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center`}>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{metric.value}</h3>
                <h4 className="text-lg font-semibold text-slate-700 mb-2">{metric.title}</h4>
                <p className="text-slate-600">{metric.description}</p>
              </Card>
            ))}
          </div>

          {/* Market Analysis */}
          <Card className="p-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Total Addressable Market</h4>
                  <p className="text-slate-600 mb-4">
                    The global water compliance market for data centers and manufacturing facilities represents a $3 billion opportunity. This market is characterized by:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      High regulatory pressure driving compliance spending
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Inefficient current practices with 40%+ waste
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Growing PFAS regulations increasing demand
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Our 5-Year Target</h4>
                  <p className="text-slate-600 mb-4">
                    Achieving $30 million in revenue within 5 years by capturing just 1% of the total addressable market. This conservative target is achievable through:
                  </p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Proven environmental engineering expertise
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Guaranteed ROI removing customer risk
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Scalable software platform approach
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Competitive Advantage */}
      <div className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Competitive Advantage</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Unique positioning that creates sustainable competitive moats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <advantage.icon className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{advantage.title}</h3>
                <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                  {advantage.highlight}
                </div>
                <p className="text-slate-600 leading-relaxed">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Highlights */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Investment Highlights</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Why Inversion Analytics represents a compelling investment opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Proven Expertise</h3>
              <p className="text-sm text-slate-600">Built on real environmental engineering knowledge</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Risk-Free Model</h3>
              <p className="text-sm text-slate-600">Guaranteed ROI or free service</p>
            </Card>
            <Card className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Scalable Platform</h3>
              <p className="text-sm text-slate-600">Software that scales across thousands of facilities</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-8 h-8 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Massive Market</h3>
              <p className="text-sm text-slate-600">$3B TAM with clear growth drivers</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Invest?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join us in transforming the water compliance industry with guaranteed returns and proven expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              <DollarSign className="w-5 h-5 mr-2" />
              View Detailed Financials
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Users className="w-5 h-5 mr-2" />
              Schedule Investor Call
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-600">
            <p>&copy; 2024 Inversion Analytics. All rights reserved.</p>
            <p className="mt-2">Transforming water compliance through environmental engineering expertise</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
