Template.logout.events({
  'click .btn-primary': function(event) {
      console.log("click");
      closeAllUserSessions = function(userId) {
        var sessions = _.filter(Meteor.default_server.sessions, function (session) {
        return session_destroy;
    });
      _.each(sessions, function (session) {
      session_destroy;
    });
  }
}
});
