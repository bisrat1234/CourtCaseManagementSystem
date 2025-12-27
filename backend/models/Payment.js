const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party',
    required: true
  },
  type: {
    type: String,
    enum: ['filing-fee', 'fine', 'damages', 'court-costs', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'ETB'
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue', 'waived'],
    default: 'pending'
  },
  dueDate: Date,
  paidDate: Date,
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank-transfer', 'check', 'online']
  },
  receiptNumber: String,
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);