'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Mail, TrendingUp, CheckCircle } from 'lucide-react'

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
    // In a real app, this would fetch from your database
    // For now, we'll show mock data
    setContactRequests([
      {
        id: 'contact_1757783330652_ifjbceg45',
        companyName: 'Test Company',
        contactName: 'Test User',
        contactEmail: 'somtonweke1@gmail.com',
        createdAt: new Date().toISOString(),
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
      (contactRequests.filter(r => r.status === 'converted').length / contactRequests.length * 100).toFixed(1) : '0'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
          <p className="text-slate-600 mt-2">Track leads, analyses, and conversions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Leads</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalLeads}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Analyses Completed</p>
                <p className="text-2xl font-bold text-slate-900">{stats.completedAnalyses}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Converted</p>
                <p className="text-2xl font-bold text-slate-900">{stats.converted}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Requests Table */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Contact Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {contactRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {request.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {request.contactName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {request.contactEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'converted' ? 'bg-green-100 text-green-800' :
                        request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`https://axiom-mvp.vercel.app/data-form/${request.id}`, '_blank')}
                        >
                          View Form
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`mailto:${request.contactEmail}`, '_blank')}
                        >
                          Email
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => window.open('https://axiom-mvp.vercel.app', '_blank')}
                className="bg-slate-900 hover:bg-slate-800"
              >
                View Live Site
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('mailto:somtonweke1@gmail.com', '_blank')}
              >
                Send Test Email
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const testUrl = 'https://axiom-mvp.vercel.app/api/test-email'
                  fetch(testUrl).then(r => r.json()).then(console.log)
                }}
              >
                Test Email Config
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
