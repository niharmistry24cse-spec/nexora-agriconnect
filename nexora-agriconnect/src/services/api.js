// Lightweight API client for the Nexora AgriConnect backend.
// Backend must be running on http://localhost:5000 (see /backend/README or npm run dev).

const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000/api';

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) throw new Error(`API error ${res.status} on ${endpoint}`);
  const json = await res.json();
  return json.data;
}

export const api = {
  getHealth: () => apiFetch('/health'),

  getFarms: () => apiFetch('/farms'),
  addFarm: (farm) => apiFetch('/farms', { method: 'POST', body: JSON.stringify(farm) }),

  predictCrop: (input) => apiFetch('/crop-prediction', { method: 'POST', body: JSON.stringify(input) }),

  getWeather: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/weather${qs ? `?${qs}` : ''}`);
  },

  getMarketPrices: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/market-prices${qs ? `?${qs}` : ''}`);
  },

  getSchemes: () => apiFetch('/schemes'),
  getAlerts: () => apiFetch('/alerts'),

  getProducts: () => apiFetch('/products'),
  addProduct: (product) => apiFetch('/products', { method: 'POST', body: JSON.stringify(product) })
};
