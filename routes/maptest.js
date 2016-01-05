var express = require('express');
var router = express.Router();

var key = 'AIzaSyCvdnNCYTGGgcaTh5iWshOMrkS5nPJzzr8';
router.get('/', function(req, res) {
  res.render('map');
});

module.exports = router;
