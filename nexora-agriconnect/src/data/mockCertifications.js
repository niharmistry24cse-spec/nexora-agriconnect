export const initialCertifications = [
  {
    id: 'cert-org-active',
    title: 'Organic Produce Cert.',
    regNumber: 'ORG-IN-2024-8832',
    issuingAuthority: 'National Organic Standards Board',
    crop: 'Wheat & Mustard',
    validity: 'Valid until Dec 2025',
    status: 'Active',
    statusVariant: 'success',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'REQ-2024-089A',
    title: 'Organic Produce Cert.',
    requestId: 'REQ-2024-089A',
    crop: 'Wheat Harvest',
    submittedDate: 'Oct 12',
    status: 'Under Review',
    statusVariant: 'warning',
    issuingAuthority: 'Regional Agricultural Authority',
    currentStep: 2,
    steps: [
      { id: 1, name: 'Submitted', date: 'Oct 12', status: 'completed' },
      { id: 2, name: 'Review', date: 'In Progress', status: 'current' },
      { id: 3, name: 'Approved', date: 'Pending', status: 'upcoming' }
    ],
    lastUpdated: '30 mins ago'
  }
];
