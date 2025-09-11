// Revenue Model and Pricing Strategy
// Based on Verto's business model

export interface PricingTier {
  name: string
  price: number
  billing: 'one_time' | 'monthly' | 'annually'
  features: string[]
  targetCustomers: string[]
  valueProposition: string
}

export interface RevenueProjection {
  year: number
  auditRevenue: number
  monitoringRevenue: number
  softwareRevenue: number
  totalRevenue: number
  customers: {
    audit: number
    monitoring: number
    software: number
  }
  costs: {
    development: number
    operations: number
    sales: number
    total: number
  }
  profit: number
  margin: number
}

export class RevenueModel {
  private static instance: RevenueModel
  private pricingTiers: PricingTier[] = []
  private revenueProjections: RevenueProjection[] = []

  public static getInstance(): RevenueModel {
    if (!RevenueModel.instance) {
      RevenueModel.instance = new RevenueModel()
      RevenueModel.instance.initializePricing()
      RevenueModel.instance.generateProjections()
    }
    return RevenueModel.instance
  }

  private initializePricing() {
    this.pricingTiers = [
      {
        name: "Audit Service",
        price: 50000,
        billing: "one_time",
        features: [
          "Comprehensive GAC system analysis",
          "Custom optimization recommendations",
          "ROI calculations and payback analysis",
          "Implementation roadmap",
          "Risk assessment and compliance review",
          "Guaranteed $200k+ savings or free"
        ],
        targetCustomers: [
          "Data centers with PFAS compliance requirements",
          "Manufacturing facilities with water treatment",
          "Municipal water treatment plants",
          "Industrial facilities with GAC systems"
        ],
        valueProposition: "Save at least $200,000 in CapEx/OpEx or it's free"
      },
      {
        name: "Monitoring Service",
        price: 3000,
        billing: "monthly",
        features: [
          "Real-time sorbent exhaustion monitoring",
          "Predictive maintenance alerts",
          "Monthly optimization reports",
          "IoT sensor installation and maintenance",
          "24/7 system monitoring",
          "Guaranteed $50k+ annual savings"
        ],
        targetCustomers: [
          "Data centers with existing GAC systems",
          "Facilities with high sorbent costs",
          "Operations requiring compliance monitoring",
          "Companies wanting to optimize maintenance"
        ],
        valueProposition: "Prevent premature sorbent changes, save $50k+ annually"
      },
      {
        name: "Software Platform",
        price: 25000,
        billing: "annually",
        features: [
          "Self-service GAC optimization tools",
          "Advanced modeling and simulation",
          "Scenario planning and what-if analysis",
          "Compliance reporting and documentation",
          "Integration with existing systems",
          "Training and support"
        ],
        targetCustomers: [
          "Large facilities with multiple GAC systems",
          "Engineering consulting firms",
          "Water treatment service providers",
          "Facilities with in-house expertise"
        ],
        valueProposition: "In-house optimization capability with expert-level tools"
      },
      {
        name: "Enterprise Suite",
        price: 100000,
        billing: "annually",
        features: [
          "Everything in Software Platform",
          "Custom model development",
          "Dedicated account management",
          "Priority support and training",
          "Custom integrations",
          "Multi-facility management",
          "Advanced analytics and reporting"
        ],
        targetCustomers: [
          "Fortune 500 companies",
          "Large data center operators",
          "Multi-facility industrial companies",
          "Government agencies"
        ],
        valueProposition: "Complete water treatment optimization solution"
      }
    ]
  }

  private generateProjections() {
    // 5-year revenue projections based on Verto's model
    for (let year = 1; year <= 5; year++) {
      const projection = this.calculateYearProjection(year)
      this.revenueProjections.push(projection)
    }
  }

  private calculateYearProjection(year: number): RevenueProjection {
    // Base projections following Verto's growth model
    let auditRevenue = 0
    let monitoringRevenue = 0
    let softwareRevenue = 0
    let auditCustomers = 0
    let monitoringCustomers = 0
    let softwareCustomers = 0

    switch (year) {
      case 1:
        auditRevenue = 550000 // $550k in audit contracts (Verto's target)
        monitoringRevenue = 180000 // 5 customers × $3k × 12 months
        softwareRevenue = 0 // Not launched yet
        auditCustomers = 11 // $550k ÷ $50k per audit
        monitoringCustomers = 5 // 60% conversion from audits
        softwareCustomers = 0
        break
      case 2:
        auditRevenue = 800000 // Growth in audit business
        monitoringRevenue = 720000 // 20 customers × $3k × 12 months
        softwareRevenue = 250000 // 10 customers × $25k
        auditCustomers = 16
        monitoringCustomers = 20
        softwareCustomers = 10
        break
      case 3:
        auditRevenue = 1200000 // Continued growth
        monitoringRevenue = 1800000 // 50 customers × $3k × 12 months
        softwareRevenue = 750000 // 30 customers × $25k
        auditCustomers = 24
        monitoringCustomers = 50
        softwareCustomers = 30
        break
      case 4:
        auditRevenue = 1500000 // Market expansion
        monitoringRevenue = 3600000 // 100 customers × $3k × 12 months
        softwareRevenue = 1500000 // 60 customers × $25k
        auditCustomers = 30
        monitoringCustomers = 100
        softwareCustomers = 60
        break
      case 5:
        auditRevenue = 2000000 // Market leadership
        monitoringRevenue = 7200000 // 200 customers × $3k × 12 months
        softwareRevenue = 3000000 // 120 customers × $25k
        auditCustomers = 40
        monitoringCustomers = 200
        softwareCustomers = 120
        break
    }

    const totalRevenue = auditRevenue + monitoringRevenue + softwareRevenue

    // Cost projections
    const development = this.calculateDevelopmentCosts(year)
    const operations = this.calculateOperationsCosts(year, monitoringCustomers)
    const sales = this.calculateSalesCosts(year, totalRevenue)
    const totalCosts = development + operations + sales

    const profit = totalRevenue - totalCosts
    const margin = (profit / totalRevenue) * 100

    return {
      year,
      auditRevenue,
      monitoringRevenue,
      softwareRevenue,
      totalRevenue,
      customers: {
        audit: auditCustomers,
        monitoring: monitoringCustomers,
        software: softwareCustomers
      },
      costs: {
        development,
        operations,
        sales,
        total: totalCosts
      },
      profit,
      margin
    }
  }

  private calculateDevelopmentCosts(year: number): number {
    // Development costs scale with team size
    const baseCost = 600000 // Initial $600k investment
    const teamGrowth = Math.min(year * 0.5, 2) // 50% team growth per year, max 2x
    return baseCost * (1 + teamGrowth)
  }

  private calculateOperationsCosts(year: number, monitoringCustomers: number): number {
    // Operations costs scale with customer base
    const baseCost = 100000 // Base operations
    const customerCost = monitoringCustomers * 500 // $500 per monitoring customer
    const infrastructure = monitoringCustomers * 200 // $200 per customer for infrastructure
    return baseCost + customerCost + infrastructure
  }

  private calculateSalesCosts(year: number, revenue: number): number {
    // Sales costs as percentage of revenue
    const salesPercentage = Math.max(0.15 - (year * 0.02), 0.05) // 15% decreasing to 5%
    return revenue * salesPercentage
  }

  // Get pricing for a specific tier
  getPricing(tierName: string): PricingTier | undefined {
    return this.pricingTiers.find(tier => tier.name === tierName)
  }

  // Get all pricing tiers
  getAllPricing(): PricingTier[] {
    return this.pricingTiers
  }

  // Get revenue projections
  getRevenueProjections(): RevenueProjection[] {
    return this.revenueProjections
  }

  // Calculate ROI for a customer
  calculateCustomerROI(tierName: string, customerType: string): {
    investment: number
    annualSavings: number
    paybackPeriod: number
    fiveYearROI: number
  } {
    const tier = this.getPricing(tierName)
    if (!tier) throw new Error('Pricing tier not found')

    let annualSavings = 0
    let investment = tier.price

    switch (tierName) {
      case "Audit Service":
        annualSavings = 200000 // Guaranteed minimum savings
        break
      case "Monitoring Service":
        annualSavings = 50000 // Guaranteed minimum savings
        investment = tier.price * 12 // Annual cost
        break
      case "Software Platform":
        annualSavings = 100000 // Estimated annual savings
        break
      case "Enterprise Suite":
        annualSavings = 500000 // Estimated annual savings
        break
    }

    const paybackPeriod = investment / annualSavings
    const fiveYearROI = ((annualSavings * 5) - investment) / investment * 100

    return {
      investment,
      annualSavings,
      paybackPeriod,
      fiveYearROI
    }
  }

  // Generate sales proposal
  generateSalesProposal(customerType: string, facilitySize: string): {
    recommendedTier: string
    proposal: string
    valueProposition: string
    pricing: number
    expectedSavings: number
  } {
    let recommendedTier = "Audit Service"
    let proposal = ""
    let valueProposition = ""
    let pricing = 50000
    let expectedSavings = 200000

    if (customerType === "data_center" && facilitySize === "large") {
      recommendedTier = "Enterprise Suite"
      pricing = 100000
      expectedSavings = 500000
      proposal = `For your large data center facility, we recommend our Enterprise Suite. This comprehensive solution includes everything needed to optimize your GAC systems across multiple facilities.`
      valueProposition = `Expected annual savings of $500,000+ with complete water treatment optimization.`
    } else if (customerType === "data_center") {
      recommendedTier = "Monitoring Service"
      pricing = 3000
      expectedSavings = 50000
      proposal = `For your data center, we recommend starting with our Monitoring Service. This will provide immediate savings by optimizing your sorbent change schedule.`
      valueProposition = `Guaranteed $50,000+ annual savings with real-time monitoring and optimization.`
    } else if (facilitySize === "large") {
      recommendedTier = "Software Platform"
      pricing = 25000
      expectedSavings = 100000
      proposal = `For your large facility, we recommend our Software Platform. This gives you in-house optimization capabilities with expert-level tools.`
      valueProposition = `Expected annual savings of $100,000+ with self-service optimization tools.`
    } else {
      proposal = `We recommend starting with our Audit Service. This comprehensive analysis will identify exactly how much you can save on your GAC system.`
      valueProposition = `Guaranteed $200,000+ savings or it's free.`
    }

    return {
      recommendedTier,
      proposal,
      valueProposition,
      pricing,
      expectedSavings
    }
  }

  // Calculate market opportunity
  getMarketOpportunity(): {
    totalAddressableMarket: number
    serviceableAddressableMarket: number
    serviceableObtainableMarket: number
    marketDescription: string
  } {
    // Based on Verto's market analysis
    const totalAddressableMarket = 3000000000 // $3B water compliance market
    const serviceableAddressableMarket = 300000000 // 10% of TAM
    const serviceableObtainableMarket = 30000000 // 1% of TAM (realistic 5-year target)

    return {
      totalAddressableMarket,
      serviceableAddressableMarket,
      serviceableObtainableMarket,
      marketDescription: "Data centers and industrial facilities spending $3B annually on water compliance, with 40%+ wasted on overbuilt systems and premature sorbent changes."
    }
  }
}
