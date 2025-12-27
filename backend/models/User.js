const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'judge', 'clerk', 'registrar', 'lawyer', 'public'],
    default: 'public'
  },
  fullName: {
    type: String,
    required: true
  },
  phone: String,
  address: String,
  bio: String,
  department: {
    type: String,
    enum: ['civil', 'criminal', 'commercial', 'family', 'administrative']
  },
  specialization: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);