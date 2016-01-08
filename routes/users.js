var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/users/login');
}

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* GET users listing. */
router.get('/', function(req, res){
  res.render('index', {user: req.user});
  User.find(function(err, users) {
    if (err) return (next(err));
    res.json(users);
  });
})

router.get('/login', function(req, res){
  res.render('account', {user: req.user});
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login'}),
  function(req, res) {
    req.session.user = req.user;
    res.redirect('/');
  });

router.post('/register', function(req, res){
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }),
  req.body.password,
  function(err, account){
    if(err) {
      return res.render('account', {user: user});
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

// router.get('/profile/:username', isAuthenticated, function(req, res){
//   if (req.params.username = req.user.username) {
//     res.render('profile', {user: req.user});
//   } else {
//     res.render('profile', {user: req.params.username})
//   }
//
// })

module.exports = router;
