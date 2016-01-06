var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// TODO --- update this with Jason's model
var Models = require('../models/Venue');

/* GET /api */
router.get('/', function(req, res, next) {
  console.log(req.body);
  Venue.find(function(err, specials) {
    if (err) return (next(err));
    // res.json(specials);
  });
  Special.find(function(err, specials) {
    if (err) return (next(err));
    res.json(specials);
  });
});

/* GET /api/id */
router.get('/:id', function(req, res, next) {
  console.log(req.body);
  Special.findById(function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* POST /api */
router.post('/', function(req, res, next) {
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
        Longitude: req.body.Longitude,
        Latitude: req.body.Latitude,
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
  Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* PATCH /api/id */
router.patch('/:id', function(req, res, next) {
  console.log(req.body);
  Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* DELETE /api/id */
router.delete('/:id', function(req, res, next) {
  console.log(req.body);
  Special.findByIdAndRemove(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

module.exports = router;
