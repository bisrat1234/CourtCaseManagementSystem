const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'organization', 'government'],
    required: true
  },
  address: {
    street: String,
    city: String,
    region: String,
    country: { type: String, default: 'Ethiopia' }
  },
  phone: String,
  email: String,
  idNumber: String,
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Party', partySchema);