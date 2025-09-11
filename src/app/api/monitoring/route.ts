import { NextRequest, NextResponse } from 'next/server'
import { MonitoringEngine } from '@/lib/monitoring-engine'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.facilityId || !body.sensorData) {
      return NextResponse.json(
        { error: 'Missing required fields: facilityId, sensorData' },
        { status: 400 }
      )
    }

    // Process sensor data
    const monitoringEngine = MonitoringEngine.getInstance()
    const prediction = await monitoringEngine.processSensorData(body.sensorData)

    // Get current status
    const status = await monitoringEngine.getCurrentStatus(body.facilityId)

    return NextResponse.json({
      success: true,
      prediction,
      status,
      message: "Sensor data processed successfully"
    })

  } catch (error) {
    console.error('Error processing sensor data:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facilityId = searchParams.get('facilityId')
    const month = searchParams.get('month')
    const year = searchParams.get('year')

    if (!facilityId) {
      return NextResponse.json(
        { error: 'Missing required parameter: facilityId' },
        { status: 400 }
      )
    }

    const monitoringEngine = MonitoringEngine.getInstance()

    if (month && year) {
      // Generate monthly report
      const report = await monitoringEngine.generateMonthlyReport(
        facilityId,
        parseInt(month),
        parseInt(year)
      )
      
      return NextResponse.json({
        success: true,
        report
      })
    } else {
      // Get current status
      const status = await monitoringEngine.getCurrentStatus(facilityId)
      
      return NextResponse.json({
        success: true,
        status
      })
    }

  } catch (error) {
    console.error('Error fetching monitoring data:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
