var mongoose = require('mongoose');

var SpecialSchema = new mongoose.Schema({
  VenueID: String,
  Username: String,
  Description: String
});

module.exports = mongoose.model('Special', SpecialSchema, 'specials');
