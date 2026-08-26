// marketService.js
// Uses the Government of India's open data portal (data.gov.in) Agmarknet
// resource for real daily mandi (market) prices.
//
// Requires a free API key from https://data.gov.in (sign up -> "My Account"
// -> generate API key), set as AGMARKNET_API_KEY in backend/.env
//
// Resource used: "Current Daily Price of Various Commodities from Various
// Markets (Mandi)" — resource id 9ef84268-d588-465a-a308-a864a43d0070
//
// If no key is configured, or the request fails, falls back to mock data
// so the app never breaks.

const { marketPrices: mockPrices } = require('./data');

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

async function getMarketPrices({ state, commodity, market, limit = 20 } = {}) {
  const apiKey = process.env.AGMARKNET_API_KEY;

  if (!apiKey) {
    console.warn('AGMARKNET_API_KEY not set — serving mock market prices. See marketService.js for setup.');
    return { data: mockPrices, source: 'mock (no API key configured)' };
  }

  try {
    const params = new URLSearchParams({
      'api-key': apiKey,
      format: 'json',
      limit: String(limit)
    });
    if (state) params.append('filters[state]', state);
    if (commodity) params.append('filters[commodity]', commodity);
    if (market) params.append('filters[market]', market);

    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Agmarknet API error ${res.status}`);
    const json = await res.json();

    if (!json.records || json.records.length === 0) {
      throw new Error('No records returned');
    }

    const mapped = json.records.map((r) => ({
      crop: r.commodity,
      market: `${r.market}, ${r.district}`,
      minPrice: Number(r.min_price),
      maxPrice: Number(r.max_price),
      modalPrice: Number(r.modal_price),
      unit: '₹/quintal',
      trend: 'n/a',
      changePercent: null,
      arrivalDate: r.arrival_date,
      lastUpdated: 'live'
    }));

    return { data: mapped, source: 'data.gov.in Agmarknet (live)' };
  } catch (err) {
    console.warn('Market price API failed, falling back to mock data:', err.message);
    return { data: mockPrices, source: 'mock (fallback)' };
  }
}

module.exports = { getMarketPrices };
