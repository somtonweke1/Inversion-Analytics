#!/usr/bin/env node

/**
 * Email Stress Test for Inversion Analytics
 * Tests all email functionality end-to-end
 */

const BASE_URL = process.env.BASE_URL || 'https://axiom-mvp.vercel.app'
const TEST_EMAIL = 'somtonweke1@gmail.com' // Your working email for testing

console.log('🚀 Starting Email Stress Test for Inversion Analytics')
console.log(`📧 Testing with email: ${TEST_EMAIL}`)
console.log(`🌐 Base URL: ${BASE_URL}`)
console.log('=' * 60)

// Test data
const testContactData = {
  companyName: 'Test Water Solutions Inc',
  contactName: 'Test User',
  contactEmail: TEST_EMAIL
}

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
    
    const data = await response.json()
    return { success: response.ok, status: response.status, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function testContactRequest() {
  console.log('\n📝 Test 1: Contact Request (Should trigger data form email)')
  console.log('-'.repeat(50))
  
  const result = await makeRequest(`${BASE_URL}/api/contact-request`, {
    method: 'POST',
    body: JSON.stringify(testContactData)
  })
  
  if (result.success) {
    console.log('✅ Contact request created successfully')
    console.log(`📋 Contact ID: ${result.data.id}`)
    console.log(`🔗 Data Form URL: ${result.data.dataFormUrl}`)
    return result.data
  } else {
    console.log('❌ Contact request failed:', result.error || result.data)
    return null
  }
}

async function testDataFormEmail(contactData) {
  console.log('\n📧 Test 2: Data Form Email (Email Me This Link)')
  console.log('-'.repeat(50))
  
  const result = await makeRequest(`${BASE_URL}/api/send-data-form-email`, {
    method: 'POST',
    body: JSON.stringify({
      dataFormUrl: contactData.dataFormUrl,
      companyName: contactData.companyName || testContactData.companyName
    })
  })
  
  if (result.success) {
    console.log('✅ Data form email sent successfully')
    console.log(`📨 Email ID: ${result.data.emailId}`)
    console.log('📬 Check your inbox for the data form link!')
    return true
  } else {
    console.log('❌ Data form email failed:', result.error || result.data)
    return false
  }
}

async function testDataSubmission(contactData) {
  console.log('\n📊 Test 3: Data Submission (Should trigger analysis email)')
  console.log('-'.repeat(50))
  
  // Use the test data we created earlier
  const submissionData = {
    contactRequestId: contactData.id,
    systemType: 'Fixed Bed',
    vesselDiameter: 2.5,
    vesselHeight: 4.0,
    flowRate: 150,
    bedHeight: 3.0,
    vesselVolume: 19.63,
    bedVolume: 14.73,
    ebct: 5.89,
    toc: 5.0,
    sulfate: 50,
    chloride: 30,
    alkalinity: 100,
    hardness: 120,
    ph: 7.5,
    temperature: 20,
    pfoaConcentration: 50,
    pfosConcentration: 30,
    pfnaConcentration: 10,
    pfhxaConcentration: 5,
    pfhxsConcentration: 2,
    pfdaConcentration: 1,
    pfbsConcentration: 0.5,
    pfhpaConcentration: 0.2,
    pfundaConcentration: 0.1,
    pfdoaConcentration: 0.05,
    totalPfasConcentration: 99.85,
    gacType: 'Bituminous Coal',
    gacDensity: 450,
    gacParticleSize: 0.8,
    gacIodineNumber: 1000,
    gacSurfaceArea: 1000,
    gacCostPerKg: 2.5,
    replacementCost: 5000,
    laborCost: 15000,
    disposalCost: 2000,
    operatingDaysPerYear: 365,
    operatingHoursPerDay: 24,
    targetRemovalEfficiency: 99.9,
    safetyFactor: 1.2
  }
  
  const result = await makeRequest(`${BASE_URL}/api/data-submission`, {
    method: 'POST',
    body: JSON.stringify(submissionData)
  })
  
  if (result.success) {
    console.log('✅ Data submission successful')
    console.log(`📈 Report ID: ${result.data.reportId}`)
    console.log('📬 Check your inbox for the analysis report!')
    return true
  } else {
    console.log('❌ Data submission failed:', result.error || result.data)
    return false
  }
}

async function testAdminNotification() {
  console.log('\n🔔 Test 4: Admin Notification Email')
  console.log('-'.repeat(50))
  
  const result = await makeRequest(`${BASE_URL}/api/admin/notify`, {
    method: 'POST',
    body: JSON.stringify({
      companyName: testContactData.companyName,
      contactName: testContactData.contactName,
      contactEmail: testContactData.contactEmail,
      reportUrl: `${BASE_URL}/analysis-success/test_report_123`,
      projectedLifespanMonths: 12.5
    })
  })
  
  if (result.success) {
    console.log('✅ Admin notification sent successfully')
    console.log(`📨 Email ID: ${result.data.emailId}`)
    return true
  } else {
    console.log('❌ Admin notification failed:', result.error || result.data)
    return false
  }
}

async function runStressTest() {
  console.log('🎯 Running comprehensive email stress test...\n')
  
  let passedTests = 0
  let totalTests = 4
  
  // Test 1: Contact Request
  const contactData = await testContactRequest()
  if (contactData) passedTests++
  
  // Test 2: Data Form Email
  if (contactData) {
    const emailSent = await testDataFormEmail(contactData)
    if (emailSent) passedTests++
  }
  
  // Test 3: Data Submission
  if (contactData) {
    const submissionSuccess = await testDataSubmission(contactData)
    if (submissionSuccess) passedTests++
  }
  
  // Test 4: Admin Notification
  const adminNotified = await testAdminNotification()
  if (adminNotified) passedTests++
  
  // Results Summary
  console.log('\n' + '=' * 60)
  console.log('📊 STRESS TEST RESULTS')
  console.log('=' * 60)
  console.log(`✅ Tests Passed: ${passedTests}/${totalTests}`)
  console.log(`❌ Tests Failed: ${totalTests - passedTests}/${totalTests}`)
  console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL EMAIL TESTS PASSED!')
    console.log('📬 Check your inbox for all test emails:')
    console.log('   1. Data form link email')
    console.log('   2. Analysis report email')
    console.log('   3. Admin notification email')
  } else {
    console.log('\n⚠️  Some tests failed. Check the logs above for details.')
  }
  
  console.log('\n🔍 Next Steps:')
  console.log('   1. Check your email inbox for test emails')
  console.log('   2. Verify email content and links work')
  console.log('   3. Test the data form link if received')
  console.log('   4. Check admin email for notifications')
}

// Run the stress test
runStressTest().catch(console.error)
