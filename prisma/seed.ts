import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test projects with geographic locations
  const projects = [
    {
      companyName: 'Flint Water Treatment Facility',
      contactName: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@flintwtp.gov',
      latitude: 43.0125,
      longitude: -83.6875,
      city: 'Flint',
      state: 'Michigan',
      status: 'REPORT_GENERATED'
    },
    {
      companyName: 'Philadelphia Water Department',
      contactName: 'Michael Chen',
      contactEmail: 'michael.chen@phila.gov',
      latitude: 39.9526,
      longitude: -75.1652,
      city: 'Philadelphia',
      state: 'Pennsylvania',
      status: 'DATA_SUBMITTED'
    },
    {
      companyName: 'Denver Water',
      contactName: 'Jessica Martinez',
      contactEmail: 'jmartinez@denverwater.org',
      latitude: 39.7392,
      longitude: -104.9903,
      city: 'Denver',
      state: 'Colorado',
      status: 'PENDING'
    },
    {
      companyName: 'Seattle Public Utilities',
      contactName: 'David Kim',
      contactEmail: 'd.kim@seattle.gov',
      latitude: 47.6062,
      longitude: -122.3321,
      city: 'Seattle',
      state: 'Washington',
      status: 'REPORT_GENERATED'
    },
    {
      companyName: 'Miami-Dade Water & Sewer',
      contactName: 'Roberto Garcia',
      contactEmail: 'roberto.garcia@miamidade.gov',
      latitude: 25.7617,
      longitude: -80.1918,
      city: 'Miami',
      state: 'Florida',
      status: 'DATA_SUBMITTED'
    }
  ]

  for (const project of projects) {
    const contact = await prisma.contactRequest.create({
      data: project
    })

    console.log(`✓ Created contact request: ${contact.companyName}`)

    // Add data submission for non-pending projects
    if (project.status !== 'PENDING') {
      const dataSubmission = await prisma.dataSubmissionForm.create({
        data: {
          contactRequestId: contact.id,
          systemType: 'Fixed Bed',
          vesselDiameter: 3.5,
          vesselHeight: 12.0,
          flowRate: project.companyName === 'Flint Water Treatment Facility' ? 1000 : 800,
          bedHeight: 2.5,
          vesselVolume: 115.45,
          bedVolume: 24.05,
          ebct: 1.44,
          toc: 2.5,
          sulfate: 45.0,
          chloride: 25.0,
          alkalinity: 120.0,
          hardness: 150.0,
          ph: 7.2,
          temperature: 15.0,
          pfoaConcentration: 0.08,
          pfosConcentration: 0.12,
          pfnaConcentration: 0.04,
          pfhxaConcentration: 0.06,
          pfhxsConcentration: 0.03,
          pfdaConcentration: 0.02,
          pfbsConcentration: 0.01,
          pfhpaConcentration: 0.00,
          pfundaConcentration: 0.00,
          pfdoaConcentration: 0.00,
          totalPfasConcentration: 0.36,
          gacType: 'Coconut Shell - Activated Carbon',
          gacDensity: 480.0,
          gacParticleSize: 1.5,
          gacIodineNumber: 1050.0,
          gacSurfaceArea: 1200.0,
          gacCostPerKg: 2.50,
          replacementCost: 15000.0,
          laborCost: 5000.0,
          disposalCost: 3000.0,
          operatingDaysPerYear: 365.0,
          operatingHoursPerDay: 24.0,
          targetRemovalEfficiency: 99.0,
          safetyFactor: 1.5
        }
      })

      console.log(`  ✓ Added data submission for ${contact.companyName}`)

      // Add report for completed projects
      if (project.status === 'REPORT_GENERATED') {
        const lifespanMonths = project.companyName === 'Flint Water Treatment Facility' ? 18.5 : 15.2
        const capitalAvoidance = project.companyName === 'Flint Water Treatment Facility' ? 35000 : 28000

        await prisma.report.create({
          data: {
            contactRequestId: contact.id,
            pdfUrl: `/reports/${contact.id}.pdf`,
            projectedLifespanMonths: lifespanMonths,
            capitalAvoidance,
            p95SafeLifeMonths: lifespanMonths * 1.15
          }
        })

        console.log(`  ✓ Generated report for ${contact.companyName}`)
      }
    }
  }

  console.log('✅ Seeding complete!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
