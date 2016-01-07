var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// TODO --- update this with Jason's model
var Models = require('../models/Venue');
var Verification = require('../models/Verification');

/* GET /api */
router.get('/', function(req, res, next) {
  console.log(req.body);
  Models.Venue.find(function(err, specials) {
    if (err) return (next(err));
    // res.json(specials);
  });
  Models.Special.find(function(err, specials) {
    if (err) return (next(err));
    res.json(specials);
  });
});

/* GET /api/id */
router.get('/:id', function(req, res, next) {
  console.log(req.body);
  Models.Venue.findById(function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* POST /api */
router.post('/', function(req, res, next) {
  var geo = JSON.parse(req.body.Geoposition);

  Models.Venue.findOne({ 'Address': req.body.Address}, function(err, venue){
    if (err) console.log(err);
    console.log('Does the venue exist?', venue);
    var special = {
      Username: req.user.username,
      Description: req.body.Description
    };
    if (!venue) {
      console.log('venue doesnst exist, creating new one.');

      Models.Venue.create({
        Name:  req.body.Name,
        Address: req.body.Address || 'None',
        PhoneNumber: req.body.PhoneNumber || 'None',
        Geoposition: [geo.latitude, geo.longitude],
        children: [special]
      }, function(err, venue) {
        if (err) console.log('ERROR', err);
        console.log('Created new Venue', venue);
      });
    }
    else {
      Models.Venue.findOneAndUpdate({
        'Address': req.body.Address
      },
      {},
      function(err, venue) {
        if (err) return (next(err));
        console.log('---pushing---');
        venue.children.push(special);
        venue.save();
        res.json(special);
      });
    }
  });
});

router.get('/special/:username', function(req, res, next){
 console.log(req.params.username);
 var user = req.params.username;
 Models.Venue.find({
   'children.Username': req.params.username
 },
 function(err, venues) {
   console.log(err);
   console.log('venues.length: ', venues.length);
   for (var i=0; i < venues.length; i++) {
     var tmpSpecials = [];
     for (var j=0; j < venues[i].children.length; j++) {
       if (venues[i].children[j].Username == req.params.username) {
         tmpSpecials.push(venues[i].children[j]);
       }
     }
     venues[i].children = tmpSpecials;
   }
   console.log(venues);
   res.json(venues);
 })
});

/* PUT /api/id */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Models.Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* PATCH /api/id */
router.patch('/:id', function(req, res, next) {
  console.log(req.body);
  Models.Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* DELETE /api/id */
router.delete('/:id', function(req, res, next) {
  console.log(req.body);
  Models.Special.findByIdAndRemove(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

router.get('/special/:username', function(req, res, next){
  console.log(req.params.username);
  var user = req.params.username;
  Models.Venue.find({
    'children.Username': req.params.username
  },
  function(err, venues) {
   console.log(err);
   console.log('venues.length: ', venues.length);
   for (var i=0; i < venues.length; i++) {
     var tmpSpecials = [];
     for (var j=0; j < venues[i].children.length; j++) {
       if (venues[i].children[j].Username == req.params.username) {
         tmpSpecials.push(venues[i].children[j]);
       }
     }
     venues[i].children = tmpSpecials;
   }
   console.log(venues);
   res.json(venues);
 })
});

router.get('/venue/:address', function(req, res, next){
  console.log(req.params.address);
  Models.Venue.find({
    'Address': req.params.address
  },
  function(err, specials) {
    console.log(err);
    console.log(specials);
    res.json(specials);
  })
});

router.get('/verifications/:address', function(req, res, next){
  console.log(req.params.address);
  Verification.find({
    'Venue': req.params.address
  },
function(err, specials){
    console.log(err);
    console.log(specials)
    res.json(specials);
  })
});

/* GET /api/venues/geo/.... */
router.get('/venues/geo/:lat,:long,:radius', function(req, res, next) {
  Models.Venue.find({ Geoposition: { $geoWithin : { $center : [[req.params.lat, req.params.long], req.params.radius] }}}, function(err, venues) {
    if (err) console.log(err);
    res.json(venues);
  });
});

module.exports = router;
