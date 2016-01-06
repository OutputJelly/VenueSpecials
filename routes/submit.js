var express = require('express');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/users/login');
}

/* GET home page. */
router.get('/submit', isAuthenticated, function(req, res, next) {
    console.log('---username yoyo:', req.user.username);
    res.render('submit',
      {
        title: 'Express',
        username: req.user.username,
        user: req.user
      });
});



module.exports = router;
