// In-memory mock data store for Nexora AgriConnect backend

let farms = [
  {
    id: 'parcel-1',
    name: 'North Field',
    khasraNumber: '45/2',
    acres: 12.5,
    currentCrop: 'Wheat',
    soilType: 'Alluvial Loam',
    status: 'VERIFIED',
    verifiedBy: 'Punjab Land Revenue Board',
    lastUpdated: '10 mins ago'
  },
  {
    id: 'parcel-2',
    name: 'River Side',
    khasraNumber: '12/1',
    acres: 5.2,
    currentCrop: 'Mustard',
    soilType: 'Sandy Loam',
    status: 'PENDING VERIFICATION',
    verifiedBy: 'Pending District Revenue Officer Review',
    lastUpdated: '2 hours ago'
  }
];

let products = [
  {
    id: 'prod-wheat-seeds',
    name: 'Premium Wheat Seeds (Gold Variety)',
    category: 'Seeds',
    price: 2400,
    priceUnit: 'Bag (50kg)',
    currency: '₹',
    rating: 4.8,
    reviewsCount: 120,
    isCertified: true,
    certType: 'Certified',
    certAuthority: 'National Seed Certification Agency',
    availableQty: 100,
    unit: 'Bags',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    description: 'High-germination rate certified seeds treated for pest resistance and optimal winter tillering.',
    seller: 'Punjab Certified Seed Corporation',
    sellerRating: '4.8 (145 Ratings)',
    lastUpdated: '15 mins ago'
  },
  {
    id: 'prod-golden-wheat',
    name: 'Premium Golden Wheat',
    category: 'Crops',
    price: 2450,
    priceUnit: 'Quintal',
    currency: '₹',
    rating: 4.8,
    reviewsCount: 124,
    isCertified: true,
    certType: 'Certified Organic',
    certAuthority: 'National Organic Standards Board',
    availableQty: 50,
    unit: 'Quintals',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    description: 'High-yield, drought-resistant golden wheat harvested this season.',
    seller: 'Ramesh Singh',
    sellerRating: '4.7 (88 Ratings)',
    lastUpdated: '30 mins ago'
  }
];

const marketPrices = [
  { crop: 'Wheat', market: 'Ludhiana Mandi', minPrice: 2150, maxPrice: 2320, modalPrice: 2275, unit: '₹/quintal', trend: 'up', changePercent: 5, lastUpdated: '15 mins ago' },
  { crop: 'Mustard', market: 'Ludhiana Mandi', minPrice: 5200, maxPrice: 5450, modalPrice: 5350, unit: '₹/quintal', trend: 'stable', changePercent: 0.5, lastUpdated: '20 mins ago' },
  { crop: 'Rice (Basmati)', market: 'Amritsar Mandi', minPrice: 3800, maxPrice: 4200, modalPrice: 4050, unit: '₹/quintal', trend: 'up', changePercent: 2.1, lastUpdated: '25 mins ago' },
  { crop: 'Maize', market: 'Patiala Mandi', minPrice: 1850, maxPrice: 1980, modalPrice: 1920, unit: '₹/quintal', trend: 'down', changePercent: -1.4, lastUpdated: '10 mins ago' },
  { crop: 'Cotton', market: 'Bathinda Mandi', minPrice: 6200, maxPrice: 6600, modalPrice: 6450, unit: '₹/quintal', trend: 'up', changePercent: 3.2, lastUpdated: '5 mins ago' },
  { crop: 'Sugarcane', market: 'Jalandhar Mandi', minPrice: 350, maxPrice: 380, modalPrice: 365, unit: '₹/quintal', trend: 'stable', changePercent: 0, lastUpdated: '1 hour ago' }
];

const schemes = [
  {
    id: 'schm-pmkisan',
    name: 'PM-Kisan Samman Nidhi Yojana',
    category: 'Direct Income Support',
    benefit: '₹6,000 / year in 3 installments',
    status: 'Enrolled & Verified',
    statusVariant: 'success',
    nextInstallmentDate: '15 Nov 2024',
    sourceAuthority: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Income support to all landholding farmer families in the country to supplement their financial needs.',
    lastUpdated: '1 hour ago'
  },
  {
    id: 'schm-soil-health',
    name: 'National Soil Health Card Scheme',
    category: 'Soil Testing & Fertility',
    benefit: 'Free soil test & customized nutrient recommendation',
    status: 'Eligible - Apply Now',
    statusVariant: 'info',
    sourceAuthority: 'Department of Agriculture & Cooperation',
    description: 'Issuance of soil health cards to farmers every 2 years with nutrient deficiency indicators.',
    lastUpdated: '3 hours ago'
  },
  {
    id: 'schm-subsidized-drip',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
    category: 'Micro-Irrigation Subsidy',
    benefit: 'Up to 55% subsidy on Drip & Sprinkler systems',
    status: 'Application Submitted',
    statusVariant: 'warning',
    sourceAuthority: 'National Water Mission & PMKSY',
    description: 'Expanding cultivable area under assured irrigation, improving on-farm water use efficiency.',
    lastUpdated: 'Yesterday'
  }
];

const alerts = {
  priorityAlerts: [
    {
      id: 'alert-fall-armyworm',
      category: 'Pest Outbreak',
      timeAgo: '2 hrs ago',
      headline: 'High Risk of Fall Armyworm',
      body: 'Reports of Fall Armyworm spreading in neighboring district. Inspect maize crops immediately.',
      read: false,
      severity: 'Emergency',
      sourceAuthority: 'District Agricultural Extension Office',
      lastUpdated: '10 mins ago'
    }
  ],
  weatherUpdates: [
    {
      id: 'weather-rainfall',
      headline: 'Heavy Rainfall Expected',
      time: 'Today, 4:00 PM',
      body: 'Delay pesticide application. Ensure drainage channels are clear.',
      read: true,
      resolved: false,
      sourceAuthority: 'India Meteorological Department (IMD)',
      lastUpdated: '20 mins ago'
    },
    {
      id: 'weather-frost',
      headline: 'Frost Warning Lifted',
      time: 'Yesterday',
      body: 'Temperatures returning to normal seasonal levels.',
      read: true,
      resolved: true,
      sourceAuthority: 'Regional Agromet Advisory Service',
      lastUpdated: '1 day ago'
    }
  ],
  marketShifts: [
    {
      id: 'market-wheat-surge',
      market: 'Local Mandi',
      timeAgo: '3 hrs ago',
      headline: 'Wheat Prices Up 5%',
      body: 'Current rate: ₹2,275/qtl. Consider selling stored stock.',
      read: false,
      sourceAuthority: 'Punjab Mandi Board (eNAM)',
      lastUpdated: '15 mins ago'
    }
  ]
};

const weather = {
  location: 'Village Pratappur, Ludhiana, Punjab',
  current: {
    tempC: 29,
    condition: 'Partly Cloudy',
    humidity: 62,
    windKph: 14,
    rainfallMm: 0,
    icon: 'partly-cloudy'
  },
  forecast: [
    { day: 'Today', high: 32, low: 24, condition: 'Partly Cloudy', rainChance: 20 },
    { day: 'Tomorrow', high: 30, low: 23, condition: 'Rain', rainChance: 75 },
    { day: 'Wed', high: 28, low: 22, condition: 'Thunderstorms', rainChance: 85 },
    { day: 'Thu', high: 31, low: 23, condition: 'Sunny', rainChance: 5 },
    { day: 'Fri', high: 33, low: 25, condition: 'Sunny', rainChance: 0 }
  ],
  lastUpdated: '5 mins ago'
};

module.exports = { farms, products, marketPrices, schemes, alerts, weather };
