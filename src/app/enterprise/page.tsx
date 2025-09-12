'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { BarChart3, DollarSign, TrendingUp, Users, Factory, Gauge, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { AUDIT_PRICE, MONITORING_PRICE_PER_MONTH, SOFTWARE_LICENSE_PRICE_ANNUAL } from '@/lib/revenue-model'
import { Button } from '@/components/ui/button'

export default function EnterpriseDashboard() {

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
          <header className="mb-24 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium mb-8">
                <Factory className="h-4 w-4 mr-2 text-slate-600" />
                Enterprise Solutions
              </div>
            </div>
            <h1 className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
              Enterprise Suite
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Unlock unparalleled GAC system optimization, predictive monitoring, and significant cost savings for data centers and manufacturing facilities.
            </p>
          </header>

          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Revenue-Generating Services</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive solutions designed for enterprise-scale GAC system optimization
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <DollarSign className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Audit Service</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">Comprehensive GAC system analysis and optimization</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-900">${AUDIT_PRICE.toLocaleString()}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Guaranteed $200k+ savings or it&apos;s free</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Proprietary Freundlich Isotherm modeling</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Monte Carlo simulation for lifespan prediction</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Detailed ROI and payback analysis</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 font-medium rounded-xl">Request Audit</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <Gauge className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Monitoring Service</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">Real-time GAC system performance monitoring</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-900">${MONITORING_PRICE_PER_MONTH.toLocaleString()}</span>
                    <span className="text-slate-600 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">IoT sensor integration and data collection</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Predictive analytics for bed exhaustion</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Automated alerts and notifications</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Performance dashboards and reporting</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 font-medium rounded-xl">Start Monitoring</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none hover:shadow-xl transition-all duration-500 bg-white rounded-2xl p-8">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="h-7 w-7 text-slate-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 font-semibold">Software Platform</CardTitle>
                      <CardDescription className="text-slate-600 font-medium">Self-service GAC optimization software</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-900">${SOFTWARE_LICENSE_PRICE_ANNUAL.toLocaleString()}</span>
                    <span className="text-slate-600 ml-2">/year</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Self-service analysis tools</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Customizable reporting and dashboards</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">API access for system integration</span>
                    </li>
                    <li className="flex items-start space-x-3 text-slate-700">
                      <div className="w-2 h-2 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base">Training and support included</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 font-medium rounded-xl">Get License</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Enterprise Suite</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Complete solution combining all services with dedicated support and custom integrations
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-xl bg-slate-900 rounded-3xl p-12 text-white">
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-white">Enterprise Suite</CardTitle>
                      <CardDescription className="text-slate-300 text-lg">Complete GAC optimization solution</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">$50,000</span>
                    <span className="text-slate-300 ml-2 text-xl">/year</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-white mb-4">Included Services</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Annual comprehensive audit</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>24/7 monitoring service</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Full software platform access</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Dedicated account manager</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-semibold text-white mb-4">Premium Features</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Custom integrations</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Priority support</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>Training and onboarding</span>
                        </li>
                        <li className="flex items-center space-x-3 text-slate-300">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>SLA guarantees</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-10 py-4 text-lg font-medium rounded-xl">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
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