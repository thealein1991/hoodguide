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
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});

Template.home.onRendered(function(){
  GoogleMaps.load();
});



Session.setDefault('receiverLat', '');
Session.setDefault('receiverLng', '');
Session.setDefault('receiverSelect','');
var location=null;

Template.home.helpers({

  hood : function () {
      return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
  },

  exampleMapOptions: function() {
    var map1 = Blaze._globalHelpers.googlemaps();

    }

});

Template.home.events({
  'change #selectHood': function(evt) {
      var newValue = $(evt.target).val();
      location = Session.set('receiverSelect', newValue);
      console.log('SELECTED VALUE ' + newValue);
      var map2 = Blaze._globalHelpers.googlemaps();
  }
});
