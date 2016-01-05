var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  Name: String,
  Address: String,
  PhoneNumber: String
});

module.exports = mongoose.model('Venue', VenueSchema, 'venues');
