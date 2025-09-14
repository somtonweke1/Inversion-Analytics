import { NextRequest, NextResponse } from 'next/server'

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

// Mock data - in production, this would come from a database
const projects: Project[] = [
  {
    id: 'proj_001',
    clientId: 'contact_1757785446652_qo5ebn498',
    companyName: 'Water Treatment Solutions Inc',
    contactName: 'John Smith',
    contactEmail: 'somtonweke1@gmail.com',
    package: 'guided',
    status: 'planning',
    startDate: new Date().toISOString(),
    targetCompletion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    expectedSavings: 250000,
    currentPhase: 'Project Kickoff',
    progress: 15,
    lastUpdate: new Date().toISOString()
  }
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      projects: projects
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newProject: Project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      clientId: body.clientId,
      companyName: body.companyName,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      package: body.package,
      status: 'planning',
      startDate: new Date().toISOString(),
      targetCompletion: new Date(Date.now() + (body.package === 'full' ? 365 : 90) * 24 * 60 * 60 * 1000).toISOString(),
      expectedSavings: body.expectedSavings || 200000,
      currentPhase: 'Project Kickoff',
      progress: 0,
      lastUpdate: new Date().toISOString()
    }

    projects.push(newProject)

    return NextResponse.json({
      success: true,
      project: newProject
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    const projectIndex = projects.findIndex(p => p.id === id)
    if (projectIndex === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updates,
      lastUpdate: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      project: projects[projectIndex]
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

