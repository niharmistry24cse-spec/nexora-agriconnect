const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  category: String,
  price: Number,
  priceUnit: String,
  currency: String,
  rating: Number,
  reviewsCount: Number,
  isCertified: Boolean,
  certType: String,
  certAuthority: String,
  availableQty: Number,
  unit: String,
  image: String,
  description: String,
  seller: String,
  sellerRating: String,
  lastUpdated: String
});

module.exports = mongoose.model('Product', productSchema);