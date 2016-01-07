var mongoose = require('mongoose');

var FlagSchema = new mongoose.Schema({
  Username: String,
  SpecialId: String,
  Date: { type: Date, default: Date.now }
});

var VerificationSchema = new mongoose.Schema({
  Username: String,
  SpecialId: String,
  Date: { type: Date, default: Date.now }
});

var SpecialSchema = new mongoose.Schema({
  Username: String,
  Description: String,
  Date: { type: Date, default: Date.now },
  flags: [FlagSchema],
  verifications: [VerificationSchema]
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

module.exports.Flag = mongoose.model('Flag', FlagSchema, 'flags');
module.exports.Verification = mongoose.model('Verification', VerificationSchema, 'verifications');
module.exports.Special = mongoose.model('Special', SpecialSchema, 'specials');
module.exports.Venue = mongoose.model('Venue', VenueSchema, 'venues');
