
Meteor.methods({
    getPicturesFB: function() {
    var token= Meteor.user().services.facebook.accessToken;
    FBGraph.setAccessToken(token);
    var id= Meteor.user().services.facebook.id;
    FBGraph.get("/"+id + "/albums", function(err, res) {
      console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });
    // FBGraph.get(id + '/albums', function(err, res) {
    //   console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    // });

    },
    postFB: function(){
      var wallPost = {
        message: 'Hallo'
      };
      var token= Meteor.user().services.facebook.accessToken;
      FBGraph.setAccessToken(token);
      FBGraph.post("me/feed", wallPost, function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
      });
    },
    likePost: function(){
      var postId = '175488706144958_178332482527247';
      var token= Meteor.user().services.facebook.accessToken;
      FBGraph.setAccessToken(token);
      FBGraph.post(postId + "/likes", function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
      });

    }
});
