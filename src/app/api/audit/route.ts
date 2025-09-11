import { NextRequest, NextResponse } from 'next/server'
import { AuditEngine } from '@/lib/audit-engine'
import { RevenueModel } from '@/lib/revenue-model'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.facilityName || !body.facilityType || !body.currentGACSystem) {
      return NextResponse.json(
        { error: 'Missing required fields: facilityName, facilityType, currentGACSystem' },
        { status: 400 }
      )
    }

    // Perform audit using the audit engine
    const auditEngine = AuditEngine.getInstance()
    const auditResults = await auditEngine.performAudit(body)

    // Generate pricing recommendation
    const revenueModel = RevenueModel.getInstance()
    const salesProposal = revenueModel.generateSalesProposal(
      body.facilityType,
      body.facilitySize || 'medium'
    )

    // Calculate ROI
    const roi = revenueModel.calculateCustomerROI(salesProposal.recommendedTier, body.facilityType)

    // Generate comprehensive response
    const response = {
      success: true,
      auditResults,
      salesProposal: {
        ...salesProposal,
        roi,
        nextSteps: [
          "Schedule a technical review call",
          "Provide detailed facility data",
          "Receive custom implementation plan",
          "Begin optimization implementation"
        ]
      },
      marketContext: {
        totalMarket: "$3B water compliance market",
        wastePercentage: "40%+ of water treatment budget wasted",
        ourSolution: "Replace fear with data-driven optimization"
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error performing audit:', error)
    
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
    const revenueModel = RevenueModel.getInstance()
    
    // Return pricing information
    const pricing = revenueModel.getAllPricing()
    const marketOpportunity = revenueModel.getMarketOpportunity()
    const projections = revenueModel.getRevenueProjections()

    return NextResponse.json({
      success: true,
      pricing,
      marketOpportunity,
      projections: projections.slice(0, 3) // Next 3 years
    })

  } catch (error) {
    console.error('Error fetching pricing:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
