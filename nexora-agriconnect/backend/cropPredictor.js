// cropPredictor.js
// Mock AI crop-recommendation engine.
//
// TO SWAP IN A REAL PYTHON AI MODEL LATER:
// Replace the body of `predictCrop` with an HTTP call to your Python model
// service (e.g. via fetch/axios to http://localhost:8000/predict) and
// return the same shaped response. No changes needed in routes/frontend.

const CROP_LIBRARY = [
  { crop: 'Wheat', idealSoil: ['Alluvial Loam', 'Loamy'], idealSeason: ['Rabi', 'Winter'] },
  { crop: 'Rice', idealSoil: ['Clay', 'Clay Loam'], idealSeason: ['Kharif', 'Monsoon'] },
  { crop: 'Maize', idealSoil: ['Sandy Loam', 'Loamy'], idealSeason: ['Kharif', 'Summer'] },
  { crop: 'Mustard', idealSoil: ['Sandy Loam', 'Alluvial Loam'], idealSeason: ['Rabi', 'Winter'] },
  { crop: 'Cotton', idealSoil: ['Black Soil', 'Clay Loam'], idealSeason: ['Kharif', 'Summer'] },
  { crop: 'Sugarcane', idealSoil: ['Loamy', 'Clay Loam'], idealSeason: ['Kharif', 'Monsoon'] }
];

function simpleHashScore(seedString) {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 31 + seedString.charCodeAt(i)) % 1000;
  }
  return hash;
}

async function predictCrop(input) {
  const {
    soilType = 'Loamy',
    season = 'Rabi',
    waterAvailability = 'Medium',
    rainfall = 0,
    temperature = 28,
    marketPreference
  } = input;

  // naive scoring against the mock crop library
  const scored = CROP_LIBRARY.map((entry) => {
    let score = 50;
    if (entry.idealSoil.some((s) => s.toLowerCase() === String(soilType).toLowerCase())) score += 25;
    if (entry.idealSeason.some((s) => s.toLowerCase() === String(season).toLowerCase())) score += 20;
    if (marketPreference && entry.crop.toLowerCase() === String(marketPreference).toLowerCase()) score += 10;

    const variability = simpleHashScore(entry.crop + soilType + season) % 10;
    score = Math.min(97, score + variability);

    return { ...entry, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored[0];
  const alternatives = scored.slice(1, 3);

  return {
    recommendedCrop: top.crop,
    suitabilityScore: top.score,
    confidence: top.score >= 80 ? 'High' : top.score >= 60 ? 'Medium' : 'Low',
    reason: `${top.crop} is well-suited for ${soilType} soil during the ${season} season with ${waterAvailability.toLowerCase()} water availability. Expected rainfall (${rainfall}mm) and average temperature (${temperature}°C) support healthy growth for this crop.`,
    alternatives: alternatives.map((a) => ({ crop: a.crop, suitabilityScore: a.score })),
    inputsUsed: { soilType, season, waterAvailability, rainfall, temperature, marketPreference: marketPreference || null },
    modelVersion: 'mock-v0.1',
    generatedAt: new Date().toISOString()
  };
}

module.exports = { predictCrop };
