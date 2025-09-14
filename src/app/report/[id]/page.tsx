'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  BarChart3, 
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  Download,
  Printer,
  Gauge,
  Shield,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

interface AnalysisReport {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  generatedAt: string
  potentialSavings: number
  currentEfficiency: number
  optimalEfficiency: number
  bedLifeDays: number
  paybackPeriod: number
  roi: number
  recommendations: {
    priority: 'high' | 'medium' | 'low'
    category: string
    title: string
    description: string
    impact: string
    cost: number
    timeline: string
  }[]
  costBreakdown: {
    currentAnnualCost: number
    projectedAnnualCost: number
    implementationCost: number
    annualSavings: number
  }
  technicalDetails: {
    systemType: string
    gacType: string
    flowRate: number
    bedVolume: number
    emptyBedContactTime: number
    hydraulicLoadingRate: number
  }
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [report, setReport] = useState<AnalysisReport | null>(null)

  useEffect(() => {
    // Mock data for demonstration
    const mockReport: AnalysisReport = {
      id: 'analysis_001',
      companyName: 'Water Treatment Solutions Inc',
      contactName: 'John Smith',
      contactEmail: 'john@example.com',
      generatedAt: new Date().toISOString(),
      potentialSavings: 250000,
      currentEfficiency: 60,
      optimalEfficiency: 85,
      bedLifeDays: 180,
      paybackPeriod: 8,
      roi: 400,
      recommendations: [
        {
          priority: 'high',
          category: 'System Optimization',
          title: 'Increase Empty Bed Contact Time',
          description: 'Extend EBCT from 15 to 20 minutes to improve adsorption efficiency',
          impact: '15% efficiency improvement',
          cost: 15000,
          timeline: '2-3 weeks'
        },
        {
          priority: 'high',
          category: 'GAC Replacement',
          title: 'Upgrade to High-Performance GAC',
          description: 'Replace current GAC with premium coconut shell activated carbon',
          impact: '25% longer bed life',
          cost: 45000,
          timeline: '4-6 weeks'
        },
        {
          priority: 'medium',
          category: 'Process Control',
          title: 'Implement Automated Monitoring',
          description: 'Install real-time monitoring system for optimal operation',
          impact: '10% operational efficiency gain',
          cost: 25000,
          timeline: '6-8 weeks'
        },
        {
          priority: 'medium',
          category: 'Maintenance',
          title: 'Optimize Regeneration Schedule',
          description: 'Implement predictive maintenance based on performance data',
          impact: '20% reduction in downtime',
          cost: 12000,
          timeline: '3-4 weeks'
        }
      ],
      costBreakdown: {
        currentAnnualCost: 450000,
        projectedAnnualCost: 200000,
        implementationCost: 97000,
        annualSavings: 250000
      },
      technicalDetails: {
        systemType: 'Fixed Bed',
        gacType: 'Coal Based',
        flowRate: 100,
        bedVolume: 9.42,
        emptyBedContactTime: 15,
        hydraulicLoadingRate: 10
      }
    }
    
    setTimeout(() => {
      setReport(mockReport)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Priority</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low Priority</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{priority}</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Report not found.</p>
          <Link href="/" className="text-gray-600 hover:text-gray-900 mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    )
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
              <span className="text-xl font-semibold text-gray-900">Analysis Report</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = `/api/report/${report.id}/download`
                  link.download = `GAC-Analysis-Report-${report.companyName.replace(/\s+/g, '-')}.pdf`
                  link.click()
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          {/* Report Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                GAC System Optimization Analysis Report
              </h1>
              <p className="text-lg text-gray-600">
                Prepared for <span className="font-semibold text-gray-900">{report.companyName}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Generated on {new Date(report.generatedAt).toLocaleDateString()} at {new Date(report.generatedAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-green-900">${report.potentialSavings.toLocaleString()}</p>
                  <p className="text-sm text-green-700">Annual Savings Potential</p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-blue-900">{report.roi}%</p>
                  <p className="text-sm text-blue-700">Return on Investment</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-purple-900">{report.paybackPeriod}</p>
                  <p className="text-sm text-purple-700">Month Payback</p>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <Gauge className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-orange-900">{report.optimalEfficiency - report.currentEfficiency}%</p>
                  <p className="text-sm text-orange-700">Efficiency Gain</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cost Analysis */}
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Cost Analysis</CardTitle>
              <CardDescription>Current vs. projected operational costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Annual Costs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Sorbent Costs</span>
                      <span className="font-semibold">$180,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Labor Costs</span>
                      <span className="font-semibold">$120,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Energy Costs</span>
                      <span className="font-semibold">$80,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Disposal Costs</span>
                      <span className="font-semibold">$70,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-semibold text-lg">
                      <span>Total Annual Cost</span>
                      <span>${report.costBreakdown.currentAnnualCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Projected Annual Costs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Optimized Sorbent Costs</span>
                      <span className="font-semibold text-green-600">$90,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Reduced Labor Costs</span>
                      <span className="font-semibold text-green-600">$60,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Optimized Energy Costs</span>
                      <span className="font-semibold text-green-600">$30,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Reduced Disposal Costs</span>
                      <span className="font-semibold text-green-600">$20,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 font-semibold text-lg">
                      <span>Total Projected Cost</span>
                      <span className="text-green-600">${report.costBreakdown.projectedAnnualCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">System Specifications</CardTitle>
              <CardDescription>Current GAC system configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">System Type</span>
                    <span className="font-semibold">{report.technicalDetails.systemType}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">GAC Type</span>
                    <span className="font-semibold">{report.technicalDetails.gacType}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Flow Rate</span>
                    <span className="font-semibold">{report.technicalDetails.flowRate} m³/h</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bed Volume</span>
                    <span className="font-semibold">{report.technicalDetails.bedVolume} m³</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">EBCT</span>
                    <span className="font-semibold">{report.technicalDetails.emptyBedContactTime} min</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Hydraulic Loading</span>
                    <span className="font-semibold">{report.technicalDetails.hydraulicLoadingRate} m/h</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Current Efficiency</span>
                    <span className="font-semibold">{report.currentEfficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Optimal Efficiency</span>
                    <span className="font-semibold text-green-600">{report.optimalEfficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bed Life</span>
                    <span className="font-semibold">{report.bedLifeDays} days</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Optimization Recommendations</CardTitle>
              <CardDescription>Prioritized recommendations for maximum impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{rec.title}</h4>
                          {getPriorityBadge(rec.priority)}
                        </div>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-600">Impact: <span className="font-semibold text-blue-600">{rec.impact}</span></span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-gray-600">Cost: <span className="font-semibold text-green-600">${rec.cost.toLocaleString()}</span></span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span className="text-gray-600">Timeline: <span className="font-semibold text-purple-600">{rec.timeline}</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Implementation Timeline</CardTitle>
              <CardDescription>Recommended project schedule for optimal results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Phase 1: System Assessment (Weeks 1-2)</h4>
                    <p className="text-sm text-gray-600">Detailed system evaluation and baseline measurements</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Phase 2: High-Priority Optimizations (Weeks 3-8)</h4>
                    <p className="text-sm text-gray-600">Implement EBCT improvements and GAC upgrades</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Phase 3: Advanced Features (Weeks 9-16)</h4>
                    <p className="text-sm text-gray-600">Install monitoring systems and optimize maintenance schedules</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Phase 4: Performance Validation (Weeks 17-20)</h4>
                    <p className="text-sm text-gray-600">Monitor results and fine-tune operations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guarantee */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-900 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Performance Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold mb-2">
                    We guarantee $200,000+ in annual cost savings or your analysis and implementation is completely free.
                  </p>
                  <p className="text-green-700">
                    Our proprietary optimization algorithms have been validated across hundreds of installations, 
                    delivering consistent results for clients ranging from municipal water authorities to Fortune 500 manufacturers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}