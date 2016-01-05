/**
* Templates
*/
if (Meteor.isClient) {
	Template.messages.helpers({
		messages: function() {
			return Messages.find({}, { sort: { time: -1}});
		}
	});

	Template.input.events = {
	  'keydown input#message' : function (event) {
		if (event.which == 13) { // 13 is the enter key event
		  if (Meteor.user())
			var name = Meteor.user().profile.name;
		  else
			var name = 'Anonymous';
		  var message = document.getElementById('message');
		  if (message.value != '') {
			Messages.insert({
			  name: name,
			  message: message.value,
			  time: new Date(),
			});

			document.getElementById('message').value = '';
			message.value = '';
		  }
		}
  },
  'click .submit-chat': function () {
      var message = document.getElementById('message');
      if (Meteor.user())
			var name = Meteor.user().profile.name;
		  else
			var name = 'Anonymous';
      Messages.insert({
			  name: name,
			  message: message.value,
			  time: new Date(),
			});
      document.getElementById('message').value = '';
			message.value = '';
    },
	}
}
