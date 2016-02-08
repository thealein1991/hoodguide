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
  action: function(){
    this.render('chat');
  }
});


Router.route('/chat/:id', {
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
  action: function(){
    this.render('profile');
  }
});

Router.route('/route', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('editRoute');
  }
});

Router.route('/profile/:id', {
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


Router.route('/rate/:id', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('rateTourist');
  }
});

Router.route('/settings', {
  action: function(){
    this.render('settings');
  }
});

Router.route('/home', {
  waitOn:function(){
      return Meteor.subscribe('userdata');
    },
  action: function(){
    this.render('home');
  }
});

Router.route('/fb', {
  action: function(){
    this.render('fb');
  }
});

Router.route('/logout', {
  action: function(){
    this.render('logout');
  }
});
