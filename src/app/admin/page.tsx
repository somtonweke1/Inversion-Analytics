'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Mail, 
  TrendingUp, 
  BarChart3,
  Activity,
  DollarSign,
  Target,
  ArrowRight,
  Eye,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

interface ContactRequest {
  id: string
  companyName: string
  contactName: string
  contactEmail: string
  createdAt: string
  status: 'pending' | 'completed' | 'converted'
}

export default function AdminDashboard() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    setContactRequests([
      {
        id: 'contact_1757783330652_ifjbceg45',
        companyName: 'Water Treatment Solutions Inc',
        contactName: 'John Smith',
        contactEmail: 'john@watertreatment.com',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        id: 'contact_1757783330653_abc123def',
        companyName: 'Industrial Water Systems',
        contactName: 'Sarah Johnson',
        contactEmail: 'sarah@industrialwater.com',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'converted'
      },
      {
        id: 'contact_1757783330654_xyz789ghi',
        companyName: 'Municipal Water Authority',
        contactName: 'Michael Chen',
        contactEmail: 'mchen@municipalwater.gov',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      }
    ])
    setLoading(false)
  }, [])

  const stats = {
    totalLeads: contactRequests.length,
    completedAnalyses: contactRequests.filter(r => r.status === 'completed').length,
    converted: contactRequests.filter(r => r.status === 'converted').length,
    conversionRate: contactRequests.length > 0 ? 
      (contactRequests.filter(r => r.status === 'converted').length / contactRequests.length * 100).toFixed(1) : '0',
    totalRevenue: contactRequests.filter(r => r.status === 'converted').length * 35000
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>
      case 'converted':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Converted</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
              <span className="text-xl font-semibold text-gray-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Projects
              </Link>
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Monitor client engagement and track conversion metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Leads</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalLeads}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed Analyses</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.completedAnalyses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Converted</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.converted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Rate */}
          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Avg. Time to Convert</p>
                  <p className="text-3xl font-bold text-gray-900">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Requests Table */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Contact Requests</CardTitle>
              <CardDescription>
                Track client engagement and follow up on pending requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Contact</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactRequests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{request.companyName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-700">{request.contactName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-gray-600">{request.contactEmail}</div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            {request.status === 'completed' && (
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Convert
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gray-900 hover:bg-gray-800 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Follow-up Emails
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Client Calls
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-200 text-gray-700 hover:bg-gray-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New analysis completed</p>
                    <p className="text-xs text-gray-500">Water Treatment Solutions Inc • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Client converted to Full Implementation</p>
                    <p className="text-xs text-gray-500">Industrial Water Systems • 1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New contact request received</p>
                    <p className="text-xs text-gray-500">Municipal Water Authority • 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
