var mongoose = require('mongoose');

var FlagSchema = new mongoose.Schema({
  Username: String,
  SpecialID: String,


  // Date: Timestamp

  Date: Date
});

module.exports = mongoose.model('Flag', FlagSchema, 'flags');
