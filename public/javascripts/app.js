var app = app || {};
var active = active || {};
Backbone.Model.prototype.idAttribute = '_id';

var autocomplete;
var placeNumber;
var venueName;
var venueAddress;
var venuePhone;
var placeId;
var venueLatitude;
var venueLongitude;

var specialSubmitObject = {};


var specialPost = {
  type: 'POST',
  url: '/api',
  dataType: 'json',
  data: specialSubmitObject,
  success: function(dataType){
    console.log(dataType, 'look im an object');
  },
  error: function(err){
    console.log('This did\'t work', err);
  }
}

$(document).ready(function(){
  if (window.location.pathname == '/') {
    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos);
      var url = '/api/venues/geo/'+pos.coords.latitude+','+pos.coords.longitude+','+10
      active.collection = new app.Venues({url: url});
    }, function(err) {
      console.log('error', err);
    }, {
      timeout: 10 * 1000,
      maximumAge: 5 * 60 * 1000
    });

    slider();
    function slider() {
      var slideCount = $('.slide-reel ul li').length;
      var slideWidth = $('.slide-reel').width();
      var slideHeight = '200px';
      var sliderUlWidth = slideCount * slideWidth;

      $('.slide-reel ul').css({
          width: sliderUlWidth
      });

      $('.slide-reel ul li:last-child').prependTo('.slider ul');

      function moveRight() {
          $('.slide-reel ul').animate({
              left: -slideWidth
          }, 1000, function() {
              $('.slide-reel ul li:first-child').appendTo('.slide-reel ul');
              $('.slide-reel ul').css('left', '');
          });
      };
      setInterval(function() {
          moveRight();
      }, 5000);
    }

    pageSharedFunctionality();

    $('#search').on('click', function() {
      console.log(venueLongitude);
      console.log(venueLatitude);
      var url = '/api/venues/geo/'+venueLatitude+','+venueLongitude+','+10
      active.collection = new app.Venues({url: url});
    });

  } else if (window.location.pathname == '/submit') {

    pageSharedFunctionality();

  console.log("JS file linked");

    var submitSpecialButton = document.getElementById('submitSpecial');
    submitSpecialButton.addEventListener('click', addSpecialData);

    function addSpecialData() {
      console.log('ajax call function initialized');
      specialSubmitObject.Name = venueName;
      specialSubmitObject.Address = venueAddress;
      specialSubmitObject.PhoneNumber = venuePhone;
      specialSubmitObject.Geoposition = JSON.stringify({latitude: venueLatitude, longitude: venueLongitude});
      specialSubmitObject.Username = $('#username').val();
      specialSubmitObject.Description = $('#special_description').val();
      console.log(specialSubmitObject);
      $.ajax(specialPost);
    };

  }
});// end of document ready

function pageSharedFunctionality() {
  var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-90, -180),
        new google.maps.LatLng(90, 180)
  );

  var input = document.getElementById("autocomplete")  //Specify textbox
    var options = {              //Set options for search bar
        bounds: defaultBounds
  };

  function initialize(){
      autocomplete = new google.maps.places.Autocomplete(input,options);
      autocomplete.addListener('place_changed',getPlaceId);
  };

  function getPlaceId(){
        var place = autocomplete.getPlace();
        venueName = place.name;
        // console.log('---------');
        // console.log(venueName);
        // console.log('---------');
        venueAddress = place.formatted_address;
        // console.log('---------');
        // console.log(venueAddress);
        // console.log('---------');
        venuePhone = place.formatted_phone_number;
        // console.log('---------');
        // console.log(venuePhone);
        // console.log('---------');
        var placeId = place.place_id;
        // console.log(placeId);
        // console.log('---------');
        // console.log(place);
        // console.log('---------');
        venueLongitude = place.geometry.location.lng();
        // console.log(venueLongitude);
        venueLatitude = place.geometry.location.lat();
        // console.log(venueLatitude);
    };
  initialize();
}



app.Venue = Backbone.Model.extend({
});

app.Special = Backbone.Model.extend({
});

app.Venues = Backbone.Collection.extend({
  model: app.Venue,
  initialize: function(props) {
    this.url = props.url;
    console.log('Creating collection');
    var self = this;

    this.on('sync', function() {
      var view = new app.VenuesView({
        collection: self
      });
    });

    this.fetch();
  }
});

app.Specials = Backbone.Collection.extend({
  model: app.Special,
  initialize: function(prop) {
    this.models = props.models;
    var self = this;

    var view = new app.SpecialsView({
      collection: self
    });
  }
});

app.SpecialsView = Backbone.View.extend({

});

app.VenuesView = Backbone.View.extend({
  el: '#venue-list',
  initialize: function() {
    console.log("LETS GO!");
    this.render();
  },
  render: function() {
    this.$el.html('');
    var models = this.collection.models;
    for (var m in models) {
      new app.VenueView({
        model: models[m],
        el: this.el
      });
    }
  }
});

app.VenueView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template($('#venue-template').html());
    var data = this.model.attributes;
    var children = data.children.map(function(child) {
      var view = new app.SpecialView({data: child});
      return view.render();
    }).join('');
    data.children = children;
    this.render();
  },
  render: function() {
    var data = this.model.attributes;
    this.$el.append(this.template(data)).hide().fadeIn(500);;
  }
});

app.SpecialView = Backbone.View.extend({
  initialize: function(prop) {
    this.data = prop.data;
    this.template = _.template($('#special-template').html());
  },
  render: function() {
    return this.template(this.data);
  }
});
