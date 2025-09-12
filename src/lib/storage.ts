// Shared in-memory storage for all APIs
// This ensures data persistence across different API routes

export const contactRequests = new Map()
export const dataSubmissions = new Map()
export const reports = new Map()

// Helper functions for data management
export function createContactRequest(data: Record<string, unknown>) {
  const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const contactRequest = {
    id: contactId,
    companyName: data.companyName,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  }
  
  contactRequests.set(contactId, contactRequest)
  return contactRequest
}

export function getContactRequest(id: string) {
  return contactRequests.get(id)
}

export function createDataSubmission(contactRequestId: string, data: Record<string, unknown>) {
  const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const dataSubmission = {
    id: submissionId,
    contactRequestId,
    ...data,
    createdAt: new Date().toISOString()
  }
  
  dataSubmissions.set(submissionId, dataSubmission)
  return dataSubmission
}

export function getDataSubmission(id: string) {
  return dataSubmissions.get(id)
}

export function createReport(data: Record<string, unknown>) {
  const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const report = {
    id: reportId,
    ...data,
    createdAt: new Date().toISOString()
  }
  
  reports.set(reportId, report)
  return report
}

export function getReport(id: string) {
  return reports.get(id)
}
