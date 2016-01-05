// daten, wie vom server an den client weitergegeben werden dürfen
Meteor.publish('userdata', function(){
  return userdata.find();
});
