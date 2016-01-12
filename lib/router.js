Router.route('/', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('login');
  }
});

Router.route('/chatlist', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('chatlist');
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

Router.route('/editprofile', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('editprofile');
  }
});

Router.route('/yourprofile', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('yourprofile');
  }
});

Router.route('/profile', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('profile');
  }
});


Router.route('/search', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('search_guide');
  }
});


Router.route('/settings', {
  action: function(){
    this.render('settings');
  }
});
Router.route('/home', {
  action: function(){
    this.render('home');
  }
});
