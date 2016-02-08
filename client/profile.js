Template.editprofile.events({
  'change #selectHood': function(evt) {
      districts = [];
      var newValue = $(evt.target).val();
      console.log('SELECTED VALUE ' + newValue);
      for(var i=0;i<HOODS.length;i++){
           var obj = HOODS[i];
           if(obj.name == newValue){
             districts = obj.districts;
           }
       }
       document.getElementById("checkDistricts").style.display ="block";
       document.getElementById("checkedDistricts").style.display ="none";
       document.getElementById("changeDistrics").style.display ="none";
       console.log(districts);
       Session.set('districts', districts);
  },
  'click #changeDistrics' : function(evt) {
    console.log(document.getElementById("selectHood").value);
    districts = [];
    var newValue = document.getElementById("selectHood").value;
    console.log('SELECTED VALUE ' + newValue);
    for(var i=0;i<HOODS.length;i++){
         var obj = HOODS[i];
         if(obj.name == newValue){
           districts = obj.districts;
         }
     }
     document.getElementById("checkDistricts").style.display ="block";
     document.getElementById("checkedDistricts").style.display ="none";
     document.getElementById("changeDistrics").style.display ="none";
     console.log(districts);
     Session.set('districts', districts);
  },
  'submit .form-group': function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    var type = event.target.type.value;
    var description=  event.target.description.value;
    var birthdate = event.target.birthdate.value;
    var userid = event.target.userId.value;
    console.log(userid);
    console.log(description + birthdate);

    if(type == 'TOURIST'){
      userdata.update(
        {_id: userdata.findOne({userId:userid})['_id']},
        {$set : {
          description: description,
          birthdate : birthdate
        }});
    }
    else{
      var hood = event.target.selectHood.value;
      var districts  = $('input[name="test"]:checked');
      var districtsSelected = [];
      for(var i=0; i<districts.length; i++){
        districtsSelected.push(districts[i].defaultValue);
      }
      if(districtsSelected == ''){
        // if selected districts are empty it means that the user didn't change them
        districtsSelected = getUser(Meteor.user().services.facebook.id).districts;
      }
      userdata.update(
        {_id: userdata.findOne({userId:userid})['_id']},
        {$set : {
          description: description,
          birthdate : birthdate,
          hood: hood,
          districts: districtsSelected
      }});
      FlashMessages.sendSuccess("Profil erfolgreich aktualisiert!");
    }
  }
});
Template.editprofile.helpers({
  specificFormData: function() {
    return {
      user_id: Meteor.user().services.facebook.id
    }
  }
});


Template.yourprofile.helpers({
  reviews: function(){
    // console.log(getReviews(Meteor.user().services.facebook.id));
    return getReviews(Meteor.user().services.facebook.id);
  },
  images: function(){
    // console.log(getImages(Meteor.user().services.facebook.id));
    return getImages(Meteor.user().services.facebook.id);
  },
  routes: function(){
    return Routes.find({user_id:Meteor.user().services.facebook.id}).fetch();
  }
});

Template.profile.events({
  'click .sendMessage' : function (event) {
      Session.set('receiver', Session.get('tourist_id'));
      console.log(Session.get('tourist_id'));
      Router.go('chat', {receiver: Session.get('tourist_id')});
    }
});

Template.profile.helpers({
  touristdata: function(){
    return getUser(Router.current().params.id);
  },
  review: function(){
    console.log(getReviews(Meteor.user().services.facebook.id));
    return getReviews(Router.current().params.id);
  },
  images: function(){
    console.log(getImages(Session.get('tourist_id')));
    return getImages(Router.current().params.id);
  },
  routes: function(){
    return Routes.find({user_id:Router.current().params.id}).fetch();
  }
});

Template.profile.onRendered(function () {
  //load Reviews
    $('#gallery').justifiedGallery({
    // option: default,
      rowHeight: 120,
      maxRowHeight: 0,
      lastRow: 'nojustify',
      fixedHeight: false,
      captions: true,
      margins: 1,
      randomize: false,
      extension: /.[^.]+$/,
      refreshTime: 250,
      waitThumbnailsLoad: true,
      justifyThreshold: 0.35,
      cssAnimation: true,
      imagesAnimationDuration: 300
    }).on('jg.complete', function (e) {
      // this callback runs after the gallery layout is created
    }).on('jg.resize', function (e) {
      // this callback runs after the gallery is resized
    }).on('jq.rowflush', function (e) {
      // this callback runs when a new row is ready
  });

  if (GoogleMaps.loaded() && document.getElementById("mapRoute")) {
    this.autorun(function () {
      console.log('huhu');

      var myOptions= {
        zoom: 10,
        center: {lat: 52.51, lng: 13.38}
      };
      console.log(document.getElementById("mapRoute"));
      var map = new google.maps.Map(document.getElementById("mapRoute"), myOptions);

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsDisplay, false);
    });
  }
});

Template.yourprofile.events({
  'click #likeButton' : function (event) {
    var post_id= document.getElementById('fb_post').value;
    Meteor.call('likeFB', post_id , function(err, data) {
      console.log('Liked post.');
    });
    }
});


Template.yourprofile.onRendered(function () {

  //load Reviews
    $('#gallery').justifiedGallery({
    // option: default,
      rowHeight: 120,
      maxRowHeight: 0,
      lastRow: 'nojustify',
      fixedHeight: false,
      captions: true,
      margins: 1,
      randomize: false,
      extension: /.[^.]+$/,
      refreshTime: 250,
      waitThumbnailsLoad: true,
      justifyThreshold: 0.35,
      cssAnimation: true,
      imagesAnimationDuration: 300
    }).on('jg.complete', function (e) {
      // this callback runs after the gallery layout is created
    }).on('jg.resize', function (e) {
      // this callback runs after the gallery is resized
    }).on('jq.rowflush', function (e) {
      // this callback runs when a new row is ready
  });

  if (GoogleMaps.loaded()) {
    this.autorun(function () {
      console.log('huhu');

      var myOptions= {
        zoom: 10,
        center: {lat: 52.51, lng: 13.38}
      };
      var map = new google.maps.Map(document.getElementById("mapRoute"), myOptions);
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      calculateAndDisplayRoute(directionsService, directionsDisplay,true);
    });
  }


});




function calculateAndDisplayRoute(directionsService, directionsDisplay, user) {

  var waypts = [];
  if(user){
    var points = Routes.find({user_id:Meteor.user().services.facebook.id }).fetch();
  } else{
    var points = Routes.find({user_id:Router.current().params.id}).fetch();
  }

  if(points[points.length-1].type =='places'){
    var lastPoint = points[points.length-1].place;
  } else{
  var lastPoint = new google.maps.LatLng(points[points.length-1].lat, points[points.length-1].lon);
  }

  if(points[0].type =='places'){
    var firstPoint = points[0].place;
  } else{
    var firstPoint = new google.maps.LatLng(points[0].lat, points[0].lon);
  }

  console.log("Origin: " + firstPoint + ", Destination: "+ lastPoint);

  var pointsSliced = points.slice(1,-1);

  for (var i = 0; i < pointsSliced.length; i++) {
    if(pointsSliced[i].type == 'places'){
      waypts.push({
        location: pointsSliced[i].place,
        stopover: true
      });
    } else{
      waypts.push({
        location: new google.maps.LatLng(pointsSliced[i].lat, pointsSliced[i].lon),
        stopover: true
      });
    }
  }
  console.log(waypts);
  directionsService.route({
    origin: firstPoint,
    destination: lastPoint,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      // console.log(response.routes[0]);
      var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.

      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Routensegment ' + routeSegment +
            ':</b><br>Von ';
        summaryPanel.innerHTML += route.legs[i].start_address + ' nach ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>Strecke: ';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
