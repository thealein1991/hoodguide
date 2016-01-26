Template.registerHelper("hood", function () {
  return _.map(HOODS, function(val,key){return {name: key, hoodValue: val}});
});

Template.registerHelper("districts", function () {
  return Session.get('districts');
});

Template.registerHelper("dataUser", function () {
  return userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0];
});

Template.registerHelper("allUsers", function () {
  return userdata.find().fetch();
});

Template.registerHelper("age", function () {
  var date = userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0].birthdate;
  return getAge(date);
});


Template.registerHelper("equals", function (v1, v2) {
  return (v1 === v2);
});


getUser = function(id){
  return userdata.find({userId: id}).fetch()[0];
}

getCurrentUser = function(){
  return userdata.find({userId: Meteor.user().services.facebook.id}).fetch()[0];
}

getReviews = function(id){
  return Reviews.find({tourist_id: id}).fetch();
}

getImages = function(id){
  return Images.find({user_id: id}).fetch();
}

getAge = function (dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}
