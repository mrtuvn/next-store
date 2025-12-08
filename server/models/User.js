const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  status: {
    type: String,
    enum: ['active', 'unverified', 'banned'],
    default: 'unverified'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  telephone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  refresh_token: {
    type: String,
    default: null
  },
  joined_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

