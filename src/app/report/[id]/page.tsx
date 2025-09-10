'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, CheckCircle, Clock, DollarSign, Shield } from 'lucide-react'

interface ReportData {
  id: string
  pdfUrl: string
  projectedLifespanMonths: number
  capitalAvoidance: number
  p95SafeLifeMonths: number
  generatedAt: string
  contactRequest: {
    companyName: string
    contactName: string
    contactEmail: string
  }
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const [reportId, setReportId] = useState<string>('')
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { id } = await params
        setReportId(id)
        const response = await fetch(`/api/report/${id}`)
        if (response.ok) {
          const data = await response.json()
          setReportData(data)
        } else {
          console.error('Failed to fetch report')
        }
      } catch (error) {
        console.error('Error fetching report:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [params])

  const handleDownload = async () => {
    if (!reportData) return
    
    setIsDownloading(true)
    try {
      const response = await fetch(reportData.pdfUrl)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `axiom-report-${reportData.contactRequest.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading report:', error)
      alert('Failed to download report. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading your report...</p>
        </div>
      </div>
    )
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Report Not Found</CardTitle>
            <CardDescription>
              The requested report could not be found or has expired.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Success Header */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Your Analysis is Ready!</CardTitle>
            <CardDescription className="text-green-700">
              Comprehensive GAC system analysis for {reportData.contactRequest.companyName}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Report Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-600">
                {reportData.projectedLifespanMonths.toFixed(1)}
              </CardTitle>
              <CardDescription>Projected Lifespan (months)</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                ${reportData.capitalAvoidance.toLocaleString()}
              </CardTitle>
              <CardDescription>Annual Capital Avoidance</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-purple-600">
                {reportData.p95SafeLifeMonths.toFixed(1)}
              </CardTitle>
              <CardDescription>95% Confidence Interval (months)</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Report Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>
              Your comprehensive GAC system analysis report
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Company</p>
                <p className="font-semibold">{reportData.contactRequest.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Contact</p>
                <p className="font-semibold">{reportData.contactRequest.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Generated</p>
                <p className="font-semibold">
                  {new Date(reportData.generatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Report ID</p>
                <p className="font-mono text-sm">{reportData.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Download Your Report</CardTitle>
            <CardDescription>
              Get your comprehensive PDF analysis with detailed findings and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Inversion Analytics GAC System Report</h3>
                <p className="text-sm text-slate-600 mb-4">
                  This report contains detailed analysis of your GAC system performance, 
                  lifespan projections, cost optimization opportunities, and actionable recommendations.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Advanced Freundlich Isotherm modeling</li>
                  <li>• Monte Carlo uncertainty analysis</li>
                  <li>• Economic optimization insights</li>
                  <li>• Risk assessment and safety factors</li>
                </ul>
              </div>
              <Button 
                onClick={handleDownload}
                disabled={isDownloading}
                size="lg"
                className="w-full sm:w-auto"
              >
                {isDownloading ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Download...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Review Your Report</h4>
                  <p className="text-sm text-slate-600">
                    Download and carefully review the detailed analysis and recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Implement Recommendations</h4>
                  <p className="text-sm text-slate-600">
                    Follow the specific recommendations to optimize your GAC system performance.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Contact Our Team</h4>
                  <p className="text-sm text-slate-600">
                    Reach out to our experts at admin@axiomanalytics.com for additional support or questions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
