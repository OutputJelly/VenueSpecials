var express = require('express');
var router = express.Router();
var https = require('https');

var mongoose = require('mongoose');
var session = require('express-session');

// TODO --- update this with Jason's model
var Models = require('../models/Venue');

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/users/login');
}

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

  https.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+req.body.placeId+'&key=AIzaSyDz0IVOUlwIaZdq5zsKUaNqkEBjdDCqqQc', function(res) {
    var data = '';

    res.on('data', function(chunk)  {
      data += chunk;
    });

    res.on('error', function(e) {
      console.error('error', e);
    });

    res.on('end', function() {
      data = JSON.parse(data);

      photoRequest((data.result.photos) ? data.result.photos[0].photo_reference : '');
    });
  });

  function photoRequest(photoRef) {
    if (!photoRef) {
      return createModel()
    }
    https.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photoRef+'&key=AIzaSyDz0IVOUlwIaZdq5zsKUaNqkEBjdDCqqQc', function(res) {
      var data = '';

      res.on('data', function(chunk)  {
        data += chunk;
      });

      res.on('error', function(e) {
        console.error('error', e);
      });

      res.on('end', function() {
        createModel(res.headers.location);
      });
    });
  }

  function createModel(photoLink) {
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
          Photo: photoLink,
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
  }
});

router.post('/:address/:specialid/verification', function(req, res, next){
  var verification = {
    Username: 'username',
    SpecialId: req.params.specialid
  };
  Models.Venue.findOne({'Address': req.params.address}, function(err, venue){
    if(err) console.log(err);
    for (var i = 0; i < venue.children.length; i++) {
      if (venue.children[i]._id = req.params.specialid){
        venue.children[i].verifications.push(verification);
        venue.save();
        res.json(venue);
        break;
      }
    }
  })
});

router.post('/:address/:specialid/flag', function(req, res, next){
  var flag = {
    Username: 'username',
    SpecialId: req.params.specialid
  };
  Models.Venue.findOne({'Address': req.params.address}, function(err, venue){
    if(err) console.log(err);
    for (var i = 0; i < venue.children.length; i++) {
      if (venue.children[i]._id = req.params.specialid){
        venue.children[i].flags.push(flag);
        venue.save();
        res.json(venue);
        break;
      }
    }
  })
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
