// Meteor.call('getUserData', function(err, data) {
// //      $('#result').text(JSON.stringify(data, undefined, 4));
//   console.log(JSON.stringify(data, undefined, 4));
//  });


Template.fb.events({
    'click #btn-user-data': function(e) {
        Meteor.call('postFB', function(err, data) {
             $('#result').text(JSON.stringify(data, undefined, 4));
         });
    }
});
