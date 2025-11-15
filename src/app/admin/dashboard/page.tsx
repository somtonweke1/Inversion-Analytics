'use client'

import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Users, FileText, DollarSign, Download } from 'lucide-react'

// Dynamically import ProjectMap to avoid SSR issues with Leaflet
const ProjectMap = dynamic(() => import('@/components/ProjectMap'), {
  ssr: false,
  loading: () => (
    <Card>
      <CardHeader>
        <CardTitle>Project Locations</CardTitle>
        <CardDescription>Loading map...</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] flex items-center justify-center">
          <Clock className="h-8 w-8 animate-spin" />
        </div>
      </CardContent>
    </Card>
  )
})

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

interface ProjectLocation {
  id: string
  companyName: string
  city?: string
  state?: string
  latitude: number
  longitude: number
  status: string
  projectedLifespanMonths?: number
  capitalAvoidance?: number
}

export default function AdminDashboard() {
  // const { data: session, status } = useSession()
  const session = null
  const status = 'unauthenticated'
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentReports, setRecentReports] = useState<RecentReport[]>([])
  const [projectLocations, setProjectLocations] = useState<ProjectLocation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated' && (session as any)?.user?.role !== 'admin') { // eslint-disable-line @typescript-eslint/no-explicit-any
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
          // Project locations will be included in dashboard API response
          setProjectLocations(data.projectLocations || [])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'unauthenticated') {
      fetchDashboardData()
    }
  }, [status])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || (session as any)?.user?.role !== 'admin') { // eslint-disable-line @typescript-eslint/no-explicit-any
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">Inversion Analytics Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">Welcome, Admin</span>
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

        {/* Project Map */}
        <div className="mb-8">
          <ProjectMap projects={projectLocations} height="500px" />
        </div>

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


