var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// TODO --- update this with Jason's model
var Special = require('../models/Special');
var Venue = require('../models/Venue');

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
  console.log('----POST request');
  console.log(req.body);
  var objToSave = req.body;
  // objToSave.geo.lat = parseFloat(req.body.geo.lat);

  Venue.create(req.body, function(err, venue){
    if (err) {
      console.log(err);
      return(next(err));
    }
    console.log("whats up");
    req.body.VenueID = venue._id;
    Special.create(req.body, function(err, special) {
      console.log('special create');
      if (err) return (next(err));
      res.json(special);
      //    res.json(venue);

    });
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
