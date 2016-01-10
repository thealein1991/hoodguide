/**
* Chat functionality
*/

if (Meteor.isClient) {

	Session.setDefault('receiver', '');
	Template.messages.helpers({
		messages: function() {
			// return Messages.find({receiver: Session.get('receiver')}, { sort: { time: -1}});

			return Messages.find( {
			    $or : [
			        { $and : [ { receiver: Session.get('receiver') }, { sender: Meteor.user().services.facebook.id } ] },
			        { $and : [ { sender:Session.get('receiver') }, { receiver: Meteor.user().services.facebook.id} ] }
			    ]
			} );
		},
		receiverdata: function(){
			return getUser(Session.get('receiver'));
		}
	});

	Template.chat.helpers({
		receiver: function() {
			return Session.get('receiver');
		},
		receiverdata: function(){
			return getUser(Session.get('receiver'));
		}
	});

	Template.chatlist.events({
		'click .usernames' : function (event) {
				Session.set('receiver', this.userId);
				console.log(Session.get('receiver'));
				Router.go('chat', {receiver: this.userId});
		  }
	});

	Template.yourprofile.events({
		'click .usernames' : function (event) {
				Session.set('receiver', this.userId);
				console.log(Session.get('receiver'));
				Router.go('chat', {receiver: this.userId});
		  }

	});

	Template.input.events = {
	  'click .submit-chat' : function () {
			var userId = Meteor.user().services.facebook.id;

		  var message = document.getElementById('message');
		  if (message.value != '') {
			Messages.insert({
			  sender: userId,
				receiver: Session.get('receiver'),
			  message: message.value,
			  time: new Date(),
			});

			var receiver_email = getUser(Session.get('receiver')).email;

			var receiver_username = getUser(Session.get('receiver')).username;
			var receiver_notifications = getUser(Session.get('receiver')).notifications;
			if(receiver_email == undefined){
				console.log('email undefined');
			} else if(!receiver_notifications || receiver_notifications == 'on'){
				Meteor.call('sendEmail',
	            receiver_email,
	            'noreply@hoodguide.de',
	            'Du hast eine neue Nachricht von ' + getCurrentUser().username,
	            'Hallo '+receiver_username + '\n' +
							'Du hast eine neue Nachricht von ' + getCurrentUser().username + ' : \n' +
							'"' + message.value +'"' +
							'\n dein Hoodguide Team');
			} else {
				console.log('Email Notifications OFF');
			}

			document.getElementById('message').value = '';
			message.value = '';
			}
		}
	}
}
