var app = app || {};
var active = active || {};

$(document).ready(function(){

  console.log("JS file linked");

  var autocomplete;

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
        placeNumber = place.place_id;
        console.log('---------');
        console.log(autocomplete);
        console.log('---------');
        idObject.whatever=placeNumber;
      };

    initialize();

});
