Template.registerHelper("hood", function () {
  return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
});

Template.registerHelper("districts", function () {
  return Session.get('districts');
});

Template.registerHelper("dataUser", function () {
  return userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0];
});

Template.registerHelper("allUsers", function () {
  return userdata.find().fetch();
});

Template.registerHelper("age", function () {
  var date = userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0].birthdate;
  return getAge(date);
});

var location=null;
var map1;
Template.registerHelper("googlemaps", function(){
    // Make sure the maps API has loaded
    if(location==null){
      location='Potsdamer Platz, ';
    } else {
      location=Session.get('receiverSelect');
    }

    if (GoogleMaps.loaded()) {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': location + ' Berlin, Deutschland'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $(jQuery.parseJSON(JSON.stringify(results))).each(function() {
         Session.set('receiverLat', this.geometry.location.lat);
         Session.set('receiverLng', this.geometry.location.lng);
         var latlng = new google.maps.LatLng(Session.get('receiverLat'), Session.get('receiverLng'));
                  var mapOptions = {
                      zoom: 13,
                      center: latlng
                  }
         console.log(Session.get('receiverLat'),Session.get('receiverLng'));
         map1 = new google.maps.Map(document.getElementById('map'), mapOptions);

                    var latlng = new google.maps.LatLng(Session.get('receiverLat'), Session.get('receiverLng'));
                    map1.setCenter(latlng);
                    var marker = new google.maps.Marker({
                      position: latlng,
                      map: map1
                    });
                    // marker.setMap(map);

       });
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }


  });
      return map1;
      };

});


Template.registerHelper("equals", function (v1, v2) {
  return (v1 === v2);
});

getUser = function(id){
  return userdata.find({userId: id}).fetch()[0];
}

getCurrentUser = function(){
  return userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0];
}

getReviews = function(id){
  return Reviews.find({tourist_id: id}).fetch();
}

getImages = function(id){
  return Images.find({user_id: id}).fetch();
}

getAge = function (dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}
