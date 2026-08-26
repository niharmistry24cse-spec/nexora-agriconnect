// weatherService.js
// Uses Open-Meteo (free, no API key required) for real weather.
// Falls back to mock data if the location can't be resolved or the API fails.

const { weather: mockWeather } = require('./data');

const WEATHER_CODES = {
  0: 'Sunny', 1: 'Mostly Sunny', 2: 'Partly Cloudy', 3: 'Cloudy',
  45: 'Fog', 48: 'Fog', 51: 'Light Drizzle', 53: 'Drizzle', 55: 'Heavy Drizzle',
  61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain', 71: 'Light Snow', 73: 'Snow',
  75: 'Heavy Snow', 80: 'Rain Showers', 81: 'Rain Showers', 82: 'Violent Showers',
  95: 'Thunderstorms', 96: 'Thunderstorms', 99: 'Thunderstorms'
};

function codeToCondition(code) {
  return WEATHER_CODES[code] || 'Clear';
}

async function geocode(place) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Geocoding failed');
  const json = await res.json();
  if (!json.results || json.results.length === 0) throw new Error('Location not found');
  const { latitude, longitude, name, admin1, country } = json.results[0];
  return { latitude, longitude, label: [name, admin1, country].filter(Boolean).join(', ') };
}

async function getWeather({ location, lat, lon } = {}) {
  try {
    let latitude = lat;
    let longitude = lon;
    let label = location || 'Your location';

    if ((!latitude || !longitude) && location) {
      const geo = await geocode(location);
      latitude = geo.latitude;
      longitude = geo.longitude;
      label = geo.label;
    }

    // default to Ludhiana, Punjab if nothing provided (matches demo farmer profile)
    if (!latitude || !longitude) {
      latitude = 30.901;
      longitude = 75.857;
      label = label === 'Your location' ? 'Ludhiana, Punjab' : label;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code` +
      `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max` +
      `&timezone=auto&forecast_days=5`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Open-Meteo error ${res.status}`);
    const json = await res.json();

    const dayLabels = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'];

    return {
      location: label,
      current: {
        tempC: json.current.temperature_2m,
        condition: codeToCondition(json.current.weather_code),
        humidity: json.current.relative_humidity_2m,
        windKph: json.current.wind_speed_10m,
        rainfallMm: json.current.precipitation,
        icon: codeToCondition(json.current.weather_code).toLowerCase().replace(/\s+/g, '-')
      },
      forecast: json.daily.time.map((date, i) => ({
        day: dayLabels[i] || date,
        high: json.daily.temperature_2m_max[i],
        low: json.daily.temperature_2m_min[i],
        condition: codeToCondition(json.daily.weather_code[i]),
        rainChance: json.daily.precipitation_probability_max[i]
      })),
      source: 'Open-Meteo (live)',
      lastUpdated: new Date().toISOString()
    };
  } catch (err) {
    console.warn('Weather API failed, falling back to mock data:', err.message);
    return { ...mockWeather, source: 'mock (fallback)' };
  }
}

module.exports = { getWeather };
