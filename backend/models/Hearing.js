const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  courtRoom: {
    type: String,
    required: true
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['initial', 'preliminary', 'main', 'final', 'appeal'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-session', 'completed', 'postponed', 'cancelled'],
    default: 'scheduled'
  },
  attendees: [{
    party: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party'
    },
    attended: {
      type: Boolean,
      default: false
    }
  }],
  notes: String,
  decision: String,
  nextHearingDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Hearing', hearingSchema);