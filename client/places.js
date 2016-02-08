FlashMessages.configure({
  autoHide: true,
  hideDelay: 1000,
  autoScroll: true
});



Template.editRoute.onRendered(function() {
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
    var myOptions= {
        zoom: 10,
        center: {lat: 52.51, lng: 13.38}
      }
    console.log(document.getElementById("map"));
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    $("#placeInput").geocomplete({
      map: $("#map"),
      details: "form"
    })
    .bind("geocode:result", function(event, result){
      console.log(result);
      Session.set("actualPlace", result.name);
    });
    }
  });
  Session.set("userId", Meteor.user().services.facebook.id);

});


Session.set("resultYelp", 'hi');

Template.editRoute.helpers({
  addedPoints: function(){
    return Routes.find({user_id:Session.get("userId") }).fetch();
  }
});

Template.editRoute.events({
  'click #clickYelp': function(evt) {
      var term = $("#yelpInput")[0].value;

      Meteor.call('getLocation', term, function(err, res){
        if(!err) Session.set("resultYelp", res);
        Routes.insert({
          user_id: Session.get("userId"),
          place: term,
          lat: Session.get("resultYelp").latitude,
          lon:Session.get("resultYelp").longitude,
          type: 'yelp'
        });
        FlashMessages.sendSuccess("Ort hinzugefügt!");
        $("#yelpInput")[0].value= '';
      });


  },
  'click #clickPlaces': function(evt) {
      console.log(Session.get("actualPlace"));
      console.log($("#latPlaces")[0].value);
      console.log($("#lonPlaces")[0].value);

      var place = Session.get("actualPlace");
      var lat = $("#latPlaces")[0].value;
      var lon = $("#lonPlaces")[0].value;
      Routes.insert({
        user_id: Session.get("userId"),
        place: place,
        lat: lat,
        lon:lon,
        type: 'places'
      });
      FlashMessages.sendSuccess("Ort hinzugefügt!");
      $("#placeInput")[0].value= '';
  },
  'click #deletePlaces': function(evt) {
      var place = evt.currentTarget.outerText;
      var toDeleteID = Routes.findOne({user_id:Session.get("userId"), place: place})['_id'];
      console.log(toDeleteID);
      Routes.remove({_id: toDeleteID});
  },
  'click #saveRoute': function(evt) {
      Router.go('yourprofile');
  }

});
