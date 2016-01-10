Session.setDefault('tourist_id', '');
Session.setDefault('all', userdata.find().fetch());

Template.search_guide.events({
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
    return Session.get('all');
  }
});
