var mongoose = require('mongoose');

var FlagSchema = new mongoose.Schema({
  Username: String,
  SpecialID: String,
<<<<<<< HEAD
  // Date: Timestamp
=======
  Date: Date
>>>>>>> fd9524654b5fb1f73b5e49ced99943fda8e8d1c7
});

module.exports = mongoose.model('Flag', FlagSchema, 'flags');
