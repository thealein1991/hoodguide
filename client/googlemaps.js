Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyC3frpblGYNaC8RzIGKRGpWy3Gl0g67nGQ',
      libraries: 'places'  // also accepts an array if you need more than one
    });
  });

Template.home.onRendered(function() {
  GoogleMaps.load();

});


Template.home.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
  });
});

Template.home.onRendered(function(){
  GoogleMaps.load();
});


Session.setDefault('receiverLat', '');
Session.setDefault('receiverLng', '');
Session.setDefault('receiverLatMarker', '');
Session.setDefault('receiverLngMarker', '');
Session.setDefault('receiverSelect','');
Session.setDefault('receiverCoord','');

var location=null;
Template.home.helpers({

  hood : function () {
      return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
  },

  exampleMapOptions: function() {
    Blaze._globalHelpers.googlemaps();
    }
});

Template.home.events({
  'change #selectHood': function(evt) {
      var newValue = $(evt.target).val();
      location = Session.set('receiverSelect', newValue);
      Blaze._globalHelpers.googlemaps();
  }
});
