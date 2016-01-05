var app = app || {};
var active = active || {};

var autocomplete;
var placeNumber;
var venueName;
var venueAddress;
var venuePhone;

var specialSubmitObject = {};


var specialPost = {
  type: "POST",
  url: 'http://localhost:3000/api',
  data: specialSubmitObject,
  success: function(dataType){
    console.log(specialSubmitObject)
  },
  error: function(err){
    console.log('This did\'t work')
  }
}

$(document).ready(function(){

  console.log("JS file linked");



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
        console.log('---------');
        console.log(venueName);
        console.log('---------');
        venueAddress = place.formatted_address;
        console.log('---------');
        console.log(venueAddress);
        console.log('---------');
        venuePhone = place.formatted_phone_number;
        console.log('---------');
        console.log(venuePhone);
        console.log('---------');
        var placeNumber = place.place_id;
        console.log(placeNumber);
        console.log('---------');
        console.log(place);
        console.log('---------');
        // idObject.whatever=placeNumber;
    };

    var submitSpecialButton = document.getElementById('submitSpecial');
    submitSpecialButton.addEventListener('click', addSpecialData);

    function addSpecialData() {
      console.log('ajax call function initialized');
      specialSubmitObject.Name = venueName;
      specialSubmitObject.Address = venueAddress;
      specialSubmitObject.PhoneNumber = venuePhone;
      specialSubmitObject.VenueID = '';
      specialSubmitObject.Username = 'Bill';
      specialSubmitObject.Description = $('#special_description').val();
      $.ajax(specialPost);
    };

    initialize();
});// end of document ready
