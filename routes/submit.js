var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/submit', function(req, res, next) {
    console.log('---username yoyo:', req.user.username);
    res.render('submit',
      {
        title: 'Express',
        username: req.user.username
      });
});

module.exports = router;
