'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Plus,
  Eye,
  Edit
} from 'lucide-react'

interface Project {
  id: string
  clientId: string
  companyName: string
  contactName: string
  contactEmail: string
  package: 'guided' | 'full'
  status: 'planning' | 'implementation' | 'optimization' | 'completed'
  startDate: string
  targetCompletion: string
  expectedSavings: number
  currentPhase: string
  progress: number
  lastUpdate: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    totalSavings: 0
  })

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/client-projects')
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.projects)
        calculateStats(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const calculateStats = (projectList: Project[]) => {
    const totalProjects = projectList.length
    const activeProjects = projectList.filter(p => p.status !== 'completed').length
    const completedProjects = projectList.filter(p => p.status === 'completed').length
    
    // Calculate revenue based on package type
    const totalRevenue = projectList.reduce((sum, project) => {
      const baseRevenue = project.package === 'full' ? 35000 : 10000
      return sum + baseRevenue
    }, 0)
    
    const totalSavings = projectList.reduce((sum, project) => project.expectedSavings + sum, 0)
    
    setStats({
      totalProjects,
      activeProjects,
      completedProjects,
      totalRevenue,
      totalSavings
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'implementation': return 'bg-yellow-100 text-yellow-800'
      case 'optimization': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Clock className="h-4 w-4" />
      case 'implementation': return <AlertCircle className="h-4 w-4" />
      case 'optimization': return <TrendingUp className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-600 mt-2">Track implementation projects and client success</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProjects} active, {stats.completedProjects} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSavings)}</div>
            <p className="text-xs text-muted-foreground">
              Annual savings delivered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
        
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">
                Start by converting analysis leads into implementation projects
              </p>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{project.companyName}</CardTitle>
                    <CardDescription>
                      {project.contactName} • {project.contactEmail}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusIcon(project.status)}
                      <span className="ml-1 capitalize">{project.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Project Details */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Package</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {project.package} Implementation
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Current Phase</h4>
                      <p className="text-sm text-gray-600">{project.currentPhase}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Timeline</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(project.startDate)} - {formatDate(project.targetCompletion)}
                      </p>
                    </div>
                  </div>

                  {/* Progress & Metrics */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Progress</h4>
                      <Progress value={project.progress} className="h-2" />
                      <p className="text-sm text-gray-600 mt-1">{project.progress}% complete</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Expected Savings</h4>
                      <p className="text-sm font-medium text-green-600">
                        {formatCurrency(project.expectedSavings)}/year
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">Last Update</h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(project.lastUpdate)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Update Progress
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Next Phase
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Convert Lead</h3>
                  <p className="text-sm text-gray-600">Turn analysis into project</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Track ROI</h3>
                  <p className="text-sm text-gray-600">Monitor client savings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Client Communication</h3>
                  <p className="text-sm text-gray-600">Send updates and reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

