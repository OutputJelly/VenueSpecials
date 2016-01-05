var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Email: String
});

module.exports = mongoose.model('User', UserSchema, 'accounts');
