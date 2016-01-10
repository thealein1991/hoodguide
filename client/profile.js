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


    var username = event.target.username.value;
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
    }
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
    return getUser(Session.get('tourist_id'));
  }
});
