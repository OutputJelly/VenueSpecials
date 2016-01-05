var mongoose = require('mongoose');

var VerificationSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String
});

module.exports = mongoose.model('Verification', VerificationSchema, 'verifications');
