export const initialAlerts = {
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
