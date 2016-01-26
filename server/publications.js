// daten, wie vom server an den client weitergegeben werden dürfen
Meteor.publish('userdata', function(){
  return userdata.find();
});

// CurrentUserId = null;
// Meteor.publish(null, function() {
//     CurrentUserId = Meteor.users.find({_id: this.userId}).fetch()[0].services.facebook.id;
//     // console.log(CurrentUserId);
// });
