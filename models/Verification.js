var mongoose = require('mongoose');

var VerificationSchema = new mongoose.Schema({
  Username: String,
  Venue: String,
  Date: Date
});

module.exports = mongoose.model('Verification', VerificationSchema, 'verifications');
