
  // counter starts at 0
  // set language of login
  accountsUIBootstrap3.setLanguage('de');
  Session.setDefault('districts', []);
  Session.setDefault('userdataExists', false);
  // districts = new Array();


  Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({requestPermissions: ['email']}, function(err){
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

  Template.login_first_time.events({
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
         console.log(districts);
         Session.set('districts', districts);
    },

    'click #radioTourist': function(evt) {
         document.getElementById("showTourist").style.display ="block";
         document.getElementById("showGuide").style.display ="none";
    },
    'click #radioGuide': function(evt) {
         document.getElementById("showGuide").style.display ="block";
         document.getElementById("showTourist").style.display ="none";
    },

    'submit .form-group': function (event) {
      // Prevent default browser form submit
      event.preventDefault();
      var description;
      var birthdate;
      var radio = $('input:radio[name="optradio"]:checked').val().toUpperCase();
      var username = event.target.username.value;
      var userId = event.target.userId.value;

      if(radio == 'TOURIST'){
        description=  event.target.description_tourist.value;
        birthdate = event.target.birthdate_tourist.value;
        // save to db userdata
        userdata.insert({
          type: radio,
          username: username,
          userId : userId,
          description : description,
          birthdate : birthdate,
          email: Meteor.user().services.facebook.email
        });

      } else{
        description=  event.target.description_guide.value;
        birthdate = event.target.birthdate_guide.value;
        var hood = event.target.selectHood.value;
        var districts  = $('input[name="test"]:checked');
        var districtsSelected = [];
        for(var i=0; i<districts.length; i++){
          districtsSelected.push(districts[i].defaultValue);
        }
        // save to db userdata
        userdata.insert({
          type: radio,
          username: username,
          userId : userId,
          description : description,
          birthdate : birthdate,
          hood: hood,
          districts: districtsSelected,
          email: Meteor.user().services.facebook.email
        });
      }
    }
  });


  Template.login_first_time.helpers({
    districts : function () {
        return Session.get('districts');
    }
  });

  Template.login.helpers({
    userdataExists: function(){
        if(userdata.find({userId: Meteor.user().services.facebook.id}).fetch() != ''){
          return true;
        } else{
          return false;
        }
    }
  });
