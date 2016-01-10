Template.settings.events({
  'click #clickSave': function(event) {

      if($('input[name="notificationMessages"]:checked').length == 0){
        console.log('email notification off');
        var userid = Meteor.user().services.facebook.id;
        userdata.update(
          {_id: userdata.findOne({userId:userid})['_id']},
          {$set : {
            notifications : 'off'
        }});
      } else{
        console.log('email notification on');
        var userid = Meteor.user().services.facebook.id;
        userdata.update(
          {_id: userdata.findOne({userId:userid})['_id']},
          {$set : {
            notifications : 'on'
        }});
      }
  }
});
