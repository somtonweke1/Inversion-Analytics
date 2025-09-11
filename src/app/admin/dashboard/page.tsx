'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, FileText, Download, Clock, DollarSign } from 'lucide-react'

interface DashboardStats {
  totalRequests: number
  completedReports: number
  pendingRequests: number
  totalCapitalAvoidance: number
}

interface RecentReport {
  id: string
  companyName: string
  contactName: string
  projectedLifespanMonths: number
  capitalAvoidance: number
  generatedAt: string
  pdfUrl: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentReports, setRecentReports] = useState<RecentReport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated' && (session?.user as { role?: string })?.role !== 'admin') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard')
        if (response.ok) {
          const data = await response.json()
          setStats(data.stats)
          setRecentReports(data.recentReports)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchDashboardData()
    }
  }, [status])

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || (session?.user as { role?: string })?.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">Inversion Analytics Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome, {session?.user?.name}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/')}
              >
                View Site
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Overview of GAC analysis requests and reports</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRequests}</div>
                <p className="text-xs text-muted-foreground">
                  All time requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completedReports}</div>
                <p className="text-xs text-muted-foreground">
                  Reports generated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting data submission
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Capital Avoidance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalCapitalAvoidance.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Annual savings identified
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>
              Latest completed GAC system analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentReports.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No reports available</p>
            ) : (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{report.companyName}</h3>
                      <p className="text-sm text-slate-600">{report.contactName}</p>
                      <p className="text-xs text-slate-500">
                        Generated: {new Date(report.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">
                          {report.projectedLifespanMonths.toFixed(1)}m
                        </p>
                        <p className="text-xs text-slate-500">Lifespan</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600">
                          ${report.capitalAvoidance.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">Savings</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/report/${report.id}`, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


