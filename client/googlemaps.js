Meteor.startup(function() {
    GoogleMaps.load({
      key: 'AIzaSyC3frpblGYNaC8RzIGKRGpWy3Gl0g67nGQ',
      libraries: 'places'  // also accepts an array if you need more than one
    });
  });

Template.home.onRendered(function() {
GoogleMaps.load();
});

Template.home.helpers({
  hood : function () {
      return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
  },
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(52.5167, 13.3833),
        zoom: 13
      };
    }
  }
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

Template.home.events({
  'change #selectHood': function(evt) {
      var newValue = $(evt.target).val();
      console.log('SELECTED VALUE ' + newValue);


     }
  });
