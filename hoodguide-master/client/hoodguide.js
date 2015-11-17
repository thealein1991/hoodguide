if (Meteor.isClient) {
  // counter starts at 0
  // set language of login
  accountsUIBootstrap3.setLanguage('de');
  Session.setDefault('districts', []);
  // districts = new Array();



  Template.login.events({
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
         document.getElementById("checkDistricts").style.visibility ="visible";
         console.log(districts);
         Session.set('districts', districts);
    },

    'submit .form-group': function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var description=  event.target.description.value;
      var type = event.target.description.value;
      var birthdate = event.target.birthdate.value;
      var radio = $('input:radio[name="optradio"]:checked').val().toUpperCase();
      var hood = event.target.selectHood.value;
      var districts = $('input[name="test"]:checked');
      // TODO: Districts
    },

    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
  });


  Template.login.helpers({
    hood : function () {
        return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
    },
    districts : function () {
        return Session.get('districts');
    },
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

}
