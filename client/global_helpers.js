Template.registerHelper("hood", function() {
  return _.map(HOODS, function(val, key) {
    return {
      name: key,
      hoodValue: val
    }
  });
});

Template.registerHelper("districts", function() {
  return Session.get('districts');
});

Template.registerHelper("dataUser", function() {
  return userdata.find({
    userId: Meteor.user().services.facebook.id
  }).fetch()[0];
});

Template.registerHelper("allUsers", function() {
  return userdata.find().fetch();
});

Template.registerHelper("age", function() {
  var date = userdata.find({
    userId: Meteor.user().services.facebook.id
  }).fetch()[0].birthdate;
  return getAge(date);
});
var coord = [];
var location = null;
var map1;
Template.registerHelper("googlemaps", function() {
  if (location != null) {
    location = Session.get('receiverSelect');
  } else {
    location = 'Potsdamer Platz, ';
  }

  var hoods = [];
  var allGuides = userdata.find({
    type: 'GUIDE'
  }).fetch();
  console.log('HALLO?');
  $.each(allGuides, function(key, value) {
    hoods.push(value.userId + "!" + value.hood);
  });
  console.log(hoods);

  if (GoogleMaps.loaded()) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': location + ' Berlin, Deutschland'
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $(jQuery.parseJSON(JSON.stringify(results))).each(function() {
          Session.set('receiverLat', this.geometry.location.lat);
          Session.set('receiverLng', this.geometry.location.lng);
          var latlng = new google.maps.LatLng(Session.get('receiverLat'), Session.get('receiverLng'));
          var mapOptions = {
            zoom: 13,
            center: latlng
          }
          map1 = new google.maps.Map(document.getElementById('map'), mapOptions);
          $.each(hoods, function(key, value) {
            var username = value.split("!")[0];
            var latlong = value.split("!")[1]
            Blaze._globalHelpers.marker(latlong, username);
          });

          var coordinates = Session.get('receiverCoord');
          $.each(coordinates, function(key, value) {
            var name = value.split("!")[1];
            var latlong = value.split("!")[0];
            console.log(value.split("#")[0] + value.split("#")[1]);
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(latlong.split("#")[0], latlong.split("#")[1]),
              map: map1,
              icon: "http://graph.facebook.com/" + name + "/picture/?type=square"
            });
            marker.addListener('click', function() {
              Router.go('/profile/' + name);
            });
          });
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    return map1;
  };
});

var lat;
var lng;
var marker;
Template.registerHelper("marker", function(value, username) {
  var toreturn = {};
  if (GoogleMaps.loaded()) {
    var geocoder1 = new google.maps.Geocoder();
    geocoder1.geocode({
      'address': value
    }, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        Session.set('receiverLatMarker', (parseFloat(results[0].geometry.location.lat())));
        Session.set('receiverLngMarker', (parseFloat(results[0].geometry.location.lng())));
        toreturn = {
          lat: Session.get('receiverLatMarker'),
          lng: Session.get('receiverLngMarker')
        };
        coord.push(toreturn.lat + "#" + toreturn.lng + "!" + username);
        Session.set('receiverCoord', coord);

        return toreturn;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
});

getMarkerPoints = function() {
  return {
    lat: Session.get('receiverLatMarker'),
    lng: Session.get('receiverLngMarker')
  };
}

Template.registerHelper("equals", function(v1, v2) {
  return (v1 === v2);
});

getUser = function(id) {
  return userdata.find({
    userId: id
  }).fetch()[0];
}

getCurrentUser = function() {
  return userdata.find({
    userId: Meteor.user().services.facebook.id
  }).fetch()[0];
}

getReviews = function(id) {
  return Reviews.find({
    tourist_id: id
  }).fetch();
}

getImages = function(id) {
  return Images.find({
    user_id: id
  }).fetch();
}

getAge = function(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
