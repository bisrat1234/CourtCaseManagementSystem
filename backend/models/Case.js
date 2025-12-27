const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  caseType: {
    type: String,
    enum: ['civil', 'criminal', 'family', 'commercial', 'administrative'],
    required: true
  },
  plaintiff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  defendant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'pending', 'in-progress', 'resolved', 'dismissed', 'appealed'],
    default: 'registered'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  nextHearing: {
    type: Date
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  clerk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  filingFee: {
    amount: Number,
    paid: { type: Boolean, default: false },
    paidDate: Date
  },
  courtRoom: String,
  estimatedDuration: Number, // in days
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);