export const initialAdvisories = {
  current: {
    id: 'adv-dry-spell',
    badge: 'Urgent Action',
    badgeVariant: 'danger',
    title: 'Irrigation Alert: Dry Spell',
    issuedDate: 'Issued Today, 08:00 AM',
    body: 'A dry spell is expected over the next 5 days with temperatures exceeding 35°C. Immediate deep irrigation is recommended for wheat crops currently in the booting stage to prevent yield loss.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80',
    sourceAuthority: 'Punjab Agricultural University (PAU) Extension',
    lastUpdated: 'Today at 08:00 AM'
  },
  past: [
    {
      id: 'adv-aphid',
      category: 'Pest Control',
      timeAgo: '3 days ago',
      title: 'Aphid Sighting Warning',
      body: 'Monitor outer rows for aphid clusters. Apply neem oil spray if threshold exceeds 10 per leaf.',
      sourceAuthority: 'Central Integrated Pest Management Centre',
      lastUpdated: '3 days ago'
    },
    {
      id: 'adv-urea',
      category: 'Fertilizer',
      timeAgo: '1 week ago',
      title: 'Urea Application Window',
      body: 'Optimal window for second urea top dressing is approaching. Wait for forecasted light showers before applying.',
      sourceAuthority: 'Soil & Fertilizer Research Board',
      lastUpdated: '7 days ago'
    }
  ]
};
