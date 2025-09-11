'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  Zap
} from 'lucide-react'

interface RevenueProjection {
  year: number
  auditRevenue: number
  monitoringRevenue: number
  softwareRevenue: number
  totalRevenue: number
  customers: {
    audit: number
    monitoring: number
    software: number
  }
  profit: number
  margin: number
}

interface PricingTier {
  name: string
  price: number
  billing: 'one_time' | 'monthly' | 'annually'
  features: string[]
  valueProposition: string
}

export default function EnterprisePage() {
  const [revenueProjections, setRevenueProjections] = useState<RevenueProjection[]>([])
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([])
  const [marketOpportunity, setMarketOpportunity] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/audit')
        const data = await response.json()
        
        if (data.success) {
          setPricingTiers(data.pricing)
          setMarketOpportunity(data.marketOpportunity)
          setRevenueProjections(data.projections)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading enterprise data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Inversion Analytics Enterprise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your water treatment operations with data-driven optimization. 
              Save millions while ensuring compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="container mx-auto px-6 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Market Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(marketOpportunity?.totalAddressableMarket || 0)}
                </div>
                <div className="text-sm text-gray-600">Total Addressable Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {formatCurrency(marketOpportunity?.serviceableAddressableMarket || 0)}
                </div>
                <div className="text-sm text-gray-600">Serviceable Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {formatCurrency(marketOpportunity?.serviceableObtainableMarket || 0)}
                </div>
                <div className="text-sm text-gray-600">5-Year Target</div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 text-center">
              {marketOpportunity?.marketDescription}
            </p>
          </CardContent>
        </Card>

        {/* Revenue Projections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Revenue Projections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Year</th>
                    <th className="text-right py-2">Audit Revenue</th>
                    <th className="text-right py-2">Monitoring Revenue</th>
                    <th className="text-right py-2">Software Revenue</th>
                    <th className="text-right py-2">Total Revenue</th>
                    <th className="text-right py-2">Profit</th>
                    <th className="text-right py-2">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueProjections.map((projection) => (
                    <tr key={projection.year} className="border-b">
                      <td className="py-2 font-medium">Year {projection.year}</td>
                      <td className="text-right py-2">{formatCurrency(projection.auditRevenue)}</td>
                      <td className="text-right py-2">{formatCurrency(projection.monitoringRevenue)}</td>
                      <td className="text-right py-2">{formatCurrency(projection.softwareRevenue)}</td>
                      <td className="text-right py-2 font-bold">{formatCurrency(projection.totalRevenue)}</td>
                      <td className="text-right py-2 text-green-600">{formatCurrency(projection.profit)}</td>
                      <td className="text-right py-2">{projection.margin.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Tiers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              Pricing Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingTiers.map((tier) => (
                <Card key={tier.name} className="relative">
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(tier.price)}
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        /{tier.billing === 'one_time' ? 'audit' : tier.billing}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{tier.valueProposition}</p>
                    <ul className="space-y-2">
                      {tier.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {tier.features.length > 4 && (
                        <li className="text-sm text-gray-500">
                          +{tier.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                    <Button className="w-full mt-4">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Total Customers</span>
              </div>
              <div className="text-2xl font-bold">360+</div>
              <div className="text-sm text-gray-500">By Year 5</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Avg. Savings</span>
              </div>
              <div className="text-2xl font-bold">$200K+</div>
              <div className="text-sm text-gray-500">Per facility annually</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Compliance Rate</span>
              </div>
              <div className="text-2xl font-bold">99.8%</div>
              <div className="text-sm text-gray-500">Guaranteed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-600">Payback Period</span>
              </div>
              <div className="text-2xl font-bold">90 days</div>
              <div className="text-sm text-gray-500">Average</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Water Treatment?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join the data centers and facilities already saving millions with our optimization platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Audit
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                View Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
