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
			return Router.current().params.id;
		},
		receiverdata: function(){
			return getUser(Router.current().params.id);
		}

	});
	console.log(Session.get("infosIMG"));
	Template.input.helpers({
		specificFormDataChat: function() {
			return {
				user_id: Meteor.user().services.facebook.id,
				chat: true
			}
		},
		myCallbacks: function() {
        return {
            finished: function(index, fileInfo, context) {
							console.log(context);
							Session.set("infosIMG",fileInfo);
						}
        }
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
	Template.input.onRendered(function () {
		console.log(Session.get("infosIMG"));
		(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
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
				image: Session.get("infosIMG").path
			});

			Session.set("infosIMG",'');
			var receiver_email = getUser(Router.current().params.id).email;

			var receiver_username = getUser(Session.get('receiver')).username;
			var receiver_notifications = getUser(Session.get('receiver')).notifications;
			if(receiver_email == undefined){
				console.log('email undefined');
			} else if(!receiver_notifications || receiver_notifications == 'on'){
				Meteor.call('sendEmail',
	            receiver_email,
	            'noreply@hoodguide.de',
	            'Du hast eine neue Nachricht von ' + getCurrentUser().username,
	            'Hallo '+ receiver_username +
							'Du hast eine neue Nachricht von ' + getCurrentUser().username + ' : ' +
							'"' + message.value +'"' +
							' dein Hoodguide Team');
			} else {
				console.log('Email Notifications OFF');
			}

			document.getElementById('message').value = '';
			message.value = '';
			}
		}
	}
}
