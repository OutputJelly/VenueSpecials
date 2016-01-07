var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// TODO --- update this with Jason's model
var Models = require('../models/Venue');

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
  Models.Special.findById(function(err, special) {
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
    if (!venue) {
      console.log('venue doesnst exist, creating new one.');

      var special = {
        Username: 'bob',
        Description: req.body.Description
      };

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
  });
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

router.get('/venues/geo/:lat,:long,:radius', function(req, res, next) {
  console.log('wtf?');
  Models.Venue.find({ Geoposition: { $geoWithin : { $center : [[req.params.lat, req.params.long], req.params.radius] }}}, function(err, venues) {
    if (err) console.log(err);
    res.json(venues);
  });
});

module.exports = router;
