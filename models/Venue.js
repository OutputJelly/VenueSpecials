var mongoose = require('mongoose');

var SpecialSchema = new mongoose.Schema({
  Username: String,
  Description: String,
  Date: { type: Date, default: Date.now }
});

var VenueSchema = new mongoose.Schema({
  Name: String,
  Address: String,
  PhoneNumber: String,
  Geoposition: {
    type: [Number],
    index: '2d'
  },
  Photo: { type: String, default: '/images/special.png' },
  children: [SpecialSchema]


});

module.exports.Special = mongoose.model('Special', SpecialSchema, 'specials');
module.exports.Venue = mongoose.model('Venue', VenueSchema, 'venues');
