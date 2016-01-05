var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// TODO --- update this with Jason's model
var Specials = require('../models/Specials');

/* GET /api */
router.get('/', function(req, res, next) {
  console.log(req.body);
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
router.put('/', function(req, res, next) {
  console.log(req.body);
  Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* PATCH /api/id */
router.patch('/', function(req, res, next) {
  console.log(req.body);
  Special.findByIdAndUpdate(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

/* DELETE /api/id */
router.detete('/', function(req, res, next) {
  console.log(req.body);
  Special.findByIdAndRemove(req.params.id, req.body, function(err, special) {
    if (err) return (next(err));
    res.json(special);
  });
});

module.exports = router;
