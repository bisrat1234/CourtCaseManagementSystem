const mongoose = require('mongoose');

const judgmentSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['interim', 'final', 'default', 'summary'],
    required: true
  },
  decision: {
    type: String,
    enum: ['granted', 'dismissed', 'partially-granted', 'settled'],
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  fullText: {
    type: String,
    required: true
  },
  dateIssued: {
    type: Date,
    default: Date.now
  },
  damages: {
    amount: Number,
    currency: { type: String, default: 'ETB' },
    payableTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party'
    }
  },
  appealDeadline: Date,
  isAppealed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Judgment', judgmentSchema);