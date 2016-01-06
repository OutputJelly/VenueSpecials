var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
  Name: String,
  Address: String,
  PhoneNumber: String,
  Geoposition: {
    latitude : Number,
    longitude : Number
  }
});

module.exports = mongoose.model('Venue', VenueSchema, 'venues');
