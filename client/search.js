Session.setDefault('tourist_id', '');
Session.setDefault('all', '');

Template.guides.onCreated(function () {
  Session.set('all', userdata.find().fetch());
});

Template.guides.events({
  'click .showprofile' : function (event) {
      Session.set('tourist_id', this.userId);
      Router.go('profile', {tourist_id: this.userId});
    },
    'change #selectHood': function(evt) {
        var selectedHood = $(evt.target).val();
        console.log(selectedHood);
        if(selectedHood === 'Nach Bezirk filtern'){
          Session.set('all', userdata.find().fetch());
        } else{
          Session.set('all', userdata.find({hood: selectedHood}).fetch());
        }
    }
});


Template.guides.helpers({
  allTourists: function(){
    console.log(Session.get('all'));
    return Session.get('all');
  }
});
