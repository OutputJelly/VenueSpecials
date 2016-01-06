var express = require('express');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/submit', isAuthenticated, function(req, res, next) {
  res.render('submit', { title: 'Express', user: req.user });
});



module.exports = router;
