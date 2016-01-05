var mongoose = require('mongoose');

var SpecialSchema = new mongoose.Schema({
  VenueID: String,
  Username: String,
  Description: String,
  Date: Timestamp
});

module.exports = mongoose.model('Special', SpecialSchema, 'specials');
