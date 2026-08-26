const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  khasraNumber: String,
  acres: Number,
  currentCrop: String,
  soilType: String,
  status: String,
  verifiedBy: String,
  lastUpdated: String
});

module.exports = mongoose.model('Farm', farmSchema);