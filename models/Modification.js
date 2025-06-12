const mongoose = require('mongoose');

const modificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  icon: { type: String }, // optional: path to SVG/icon
  createdAt: { type: Date, default: Date.now }
});

const Modification = mongoose.model('Modification', modificationSchema);

module.exports = Modification; 