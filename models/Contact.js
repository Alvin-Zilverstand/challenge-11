const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['phone', 'email', 'in-person', 'other'],
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  followUp: {
    required: Boolean,
    date: Date,
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema); 