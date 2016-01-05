Router.route('/', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('login');
  }
});


Router.route('/chat', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('chat');
  }
});


Router.route('/nachrichten', {
  action: function(){
    this.render('nachrichten');
  }
});

Router.route('/profilbearbeiten', {
  action: function(){
    this.render('profilbearbeiten');
  }
});

Router.route('/einstellungen', {
  action: function(){
    this.render('einstellungen');
  }
});
