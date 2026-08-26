require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { schemes, alerts, farms: mockFarms, products: mockProducts } = require('./data');
const { predictCrop } = require('./cropPredictor');
const { getWeather } = require('./weatherService');
const { getMarketPrices } = require('./marketService');

const connectDB = require('./db');
const Farm = require('./models/Farm');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---------- Health ----------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Nexora AgriConnect Backend',
    timestamp: new Date().toISOString()
  });
});

// ---------- Farms ----------
app.get('/api/farms', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const farms = await Farm.find();
      return res.json({
        success: true,
        data: farms
      });
    }
    return res.json({
      success: true,
      data: mockFarms
    });
  } catch (error) {
    res.json({
      success: true,
      data: mockFarms
    });
  }
});

app.post('/api/farms', async (req, res) => {
  try {
    let farm;
    try {
      farm = await Farm.create({
        id: `parcel-${Date.now()}`,
        name: req.body.name || 'Unnamed Field',
        khasraNumber: req.body.khasraNumber || '',
        acres: req.body.acres || 0,
        currentCrop: req.body.currentCrop || '',
        soilType: req.body.soilType || '',
        status: 'PENDING VERIFICATION',
        verifiedBy: 'Pending District Revenue Officer Review',
        lastUpdated: 'Just now'
      });
    } catch (dbErr) {
      farm = {
        id: `parcel-${Date.now()}`,
        name: req.body.name || 'Unnamed Field',
        khasraNumber: req.body.khasraNumber || '',
        acres: req.body.acres || 0,
        currentCrop: req.body.currentCrop || '',
        soilType: req.body.soilType || '',
        status: 'PENDING VERIFICATION',
        verifiedBy: 'Pending District Revenue Officer Review',
        lastUpdated: 'Just now'
      };
      mockFarms.push(farm);
    }

    res.status(201).json({
      success: true,
      data: farm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create farm',
      details: error.message
    });
  }
});

// ---------- Crop Prediction ----------
app.post('/api/crop-prediction', async (req, res) => {
  try {
    const result = await predictCrop(req.body || {});

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Prediction failed',
      details: err.message
    });
  }
});

// ---------- Weather ----------
app.get('/api/weather', async (req, res) => {
  try {
    const { location, lat, lon } = req.query;

    const data = await getWeather({
      location,
      lat,
      lon
    });

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather'
    });
  }
});

// ---------- Market Prices ----------
app.get('/api/market-prices', async (req, res) => {
  try {
    const { state, commodity, market } = req.query;

    const result = await getMarketPrices({
      state,
      commodity,
      market
    });

    res.json({
      success: true,
      data: result.data,
      source: result.source
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market prices'
    });
  }
});

// ---------- Schemes ----------
app.get('/api/schemes', (req, res) => {
  res.json({
    success: true,
    data: schemes
  });
});

// ---------- Alerts ----------
app.get('/api/alerts', (req, res) => {
  res.json({
    success: true,
    data: alerts
  });
});

// ---------- Products ----------
app.get('/api/products', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await Product.find();
      return res.json({
        success: true,
        data: products
      });
    }
    return res.json({
      success: true,
      data: mockProducts
    });
  } catch (error) {
    res.json({
      success: true,
      data: mockProducts
    });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    let product;
    try {
      product = await Product.create({
        id: `prod-${Date.now()}`,
        name: req.body.name || 'Unnamed Product',
        category: req.body.category || 'Other',
        price: req.body.price || 0,
        priceUnit: req.body.priceUnit || 'Unit',
        currency: '₹',
        rating: 0,
        reviewsCount: 0,
        isCertified: req.body.isCertified || false,
        certType: req.body.certType || null,
        certAuthority: req.body.certAuthority || null,
        availableQty: req.body.availableQty || 0,
        unit: req.body.unit || 'Units',
        image: req.body.image || '',
        description: req.body.description || '',
        seller: req.body.seller || 'Unknown Seller',
        sellerRating: req.body.sellerRating || 'No ratings yet',
        lastUpdated: 'Just now'
      });
    } catch (dbErr) {
      product = {
        id: `prod-${Date.now()}`,
        name: req.body.name || 'Unnamed Product',
        category: req.body.category || 'Other',
        price: req.body.price || 0,
        priceUnit: req.body.priceUnit || 'Unit',
        currency: '₹',
        rating: 0,
        reviewsCount: 0,
        isCertified: req.body.isCertified || false,
        certType: req.body.certType || null,
        certAuthority: req.body.certAuthority || null,
        availableQty: req.body.availableQty || 0,
        unit: req.body.unit || 'Units',
        image: req.body.image || '',
        description: req.body.description || '',
        seller: req.body.seller || 'Unknown Seller',
        sellerRating: req.body.sellerRating || 'No ratings yet',
        lastUpdated: 'Just now'
      };
      mockProducts.push(product);
    }

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
      details: error.message
    });
  }
});

// ---------- 404 ----------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found'
  });
});

// ---------- Start Server ----------
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(
      `Nexora AgriConnect backend running on http://localhost:${PORT}`
    );
  });
});