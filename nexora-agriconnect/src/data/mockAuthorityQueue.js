export const initialAuthorityQueue = {
  stats: {
    pendingCertifications: 142,
    waterRequests: 38,
    avgReviewTime: '2.4 Days',
    schemeUptake: '+12% this week',
    activeAlerts: '3 Critical',
    lastUpdated: '5 mins ago'
  },
  recentItems: [
    {
      id: 'CERT-8902',
      type: 'Organic Certification',
      applicant: 'R. Sharma (Farm ID: 442)',
      status: 'Approved',
      statusVariant: 'success',
      actionDate: 'Oct 24, 09:15 AM'
    },
    {
      id: 'WTR-4410',
      type: 'Borewell Request',
      applicant: 'Green Valley Coop',
      status: 'Denied',
      statusVariant: 'danger',
      actionDate: 'Oct 23, 16:45 PM'
    },
    {
      id: 'SCHM-112',
      type: 'Subsidy Disbursal',
      applicant: 'Multiple (Batch 12)',
      status: 'Processed',
      statusVariant: 'warning',
      actionDate: 'Oct 23, 14:00 PM'
    }
  ],
  activeReviewDoc: {
    id: 'DOC-8892-REV',
    documentTitle: 'Certificate of Organic Compliance',
    filename: 'Organic Farming Certificate.pdf',
    totalPages: 3,
    currentPage: 1,
    issuingAuthority: 'Regional Agricultural Authority',
    farmerName: 'Rajinder Singh',
    farmId: 'FRM-2024-8892',
    location: 'Sector 4, North Fields',
    certificationPeriod: 'Oct 2023 - Oct 2024',
    docType: 'Organic Cert Renewal',
    authorityName: 'Regional Board',
    submittedTimeAgo: 'Submitted 2 days ago',
    inspectorNotes: 'Soil samples taken on 12-Sep-2023 show zero trace of synthetic pesticides. Crop rotation logs are well-maintained. Recommended for renewal.',
    status: 'Pending',
    statusVariant: 'warning'
  }
};
