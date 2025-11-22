// models/Link.js
// Mongoose model for storing shortened URLs and their analytics.

const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  // Unique short code used in the URL (e.g., tiny.link/abc123)
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 20
  },

  // The original long URL that users will be redirected to
  originalUrl: {
    type: String,
    required: true,
    trim: true
  },

  // Total number of times the short link has been clicked
  clicks: {
    type: Number,
    default: 0
  },

  // Timestamp of the most recent click
  lastClicked: {
    type: Date,
    default: null
  },

  // Auto-set timestamp when the link record is created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Mongoose model
module.exports = mongoose.model('Link', linkSchema);
