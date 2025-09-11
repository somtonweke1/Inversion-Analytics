'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { BarChart3, DollarSign, TrendingUp, Users, Factory, Gauge, Clock, ShieldCheck, ArrowLeft } from 'lucide-react'
import { calculateRevenueProjections, getMarketAnalysis, AUDIT_PRICE, MONITORING_PRICE_PER_MONTH, SOFTWARE_LICENSE_PRICE_ANNUAL } from '@/lib/revenue-model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EnterpriseDashboard() {
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900" asChild>
                <a href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </a>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900 tracking-tight">Inversion Analytics</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Enterprise Suite</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Unlock unparalleled GAC system optimization, predictive monitoring, and significant cost savings for data centers and manufacturing facilities.
            </p>
          </header>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center tracking-tight">Revenue-Generating Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-white">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Audit Service</CardTitle>
                      <CardDescription className="text-slate-600">Comprehensive GAC system analysis and optimization</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">${AUDIT_PRICE.toLocaleString()}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Guaranteed $200k+ savings or it's free</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Proprietary Freundlich Isotherm modeling</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Monte Carlo simulation for lifespan prediction</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Detailed ROI and payback analysis</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Request Audit</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-white">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Gauge className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Monitoring Service</CardTitle>
                      <CardDescription className="text-slate-600">Real-time sorbent exhaustion prediction</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">${MONITORING_PRICE_PER_MONTH.toLocaleString()}</span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Prevents premature sorbent changes</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>IoT sensor integration (pressure, flow, pH, temp)</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Predictive analytics for optimal change timing</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Guaranteed $50k+ annual savings</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Learn More</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-white">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Software Platform</CardTitle>
                      <CardDescription className="text-slate-600">Self-service GAC optimization tools</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">${SOFTWARE_LICENSE_PRICE_ANNUAL.toLocaleString()}</span>
                    <span className="text-slate-600 ml-2">/year</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Advanced modeling & simulation</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Scenario planning & what-if analysis</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Compliance reporting & dashboards</span>
                    </li>
                    <li className="flex items-start space-x-2 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Multi-facility management</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Get Demo</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center tracking-tight">Revenue Projections</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Projection Inputs</CardTitle>
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

              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-900">Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueProjections.map((proj) => (
                      <div key={proj.year} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-b-0">
                        <span className="font-medium text-slate-700">Year {proj.year} Total Revenue</span>
                        <span className="text-lg font-bold text-slate-900">${proj.totalRevenue.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-200">
                      <span className="font-semibold text-slate-900">5-Year Cumulative Revenue</span>
                      <span className="text-xl font-bold text-slate-900">
                        ${revenueProjections.reduce((sum: number, p: any) => sum + p.totalRevenue, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center tracking-tight">Market Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Factory className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Total Addressable Market</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-slate-900 mb-4">${marketAnalysis.totalAddressableMarket} Billion</div>
                  <p className="text-slate-600">The global water compliance market for data centers and manufacturing.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Our 5-Year Target</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-slate-900 mb-4">${marketAnalysis.targetRevenue5Years} Million</div>
                  <p className="text-slate-600">Achieving {marketAnalysis.targetMarketShare}% market share within 5 years.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center tracking-tight">Competitive Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Expertise-Driven</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">Our models are built on deep, real-world water treatment expertise, not just generic AI. We turn expert knowledge into scalable software.</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none bg-white">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900">Guaranteed ROI</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">We guarantee significant savings for our audit clients, or the service is free. This removes risk and builds trust immediately.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <footer className="text-center text-slate-500">
            <p>&copy; 2024 Inversion Analytics. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}