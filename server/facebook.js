
Meteor.methods({
    getFBUser: function() {
    var token= Meteor.user().services.facebook.accessToken;
    FBGraph.setAccessToken(token);
    var id= Meteor.user().services.facebook.id;
    FBGraph.get("/"+id , function(err, res) {
      console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });
    },
    postFB: function(message, id){
      var wallPost = {
        message: message,
        place: "Berlin",
        tags: id
      };
      var token= Meteor.user().services.facebook.accessToken;
      FBGraph.setAccessToken(token);
      var fbRes = Async.runSync(function(done) {
        FBGraph.post("me/feed", wallPost, function(err, res) {
        // returns the post id

        console.log(res); // { id: xxxxx}
        done(null, res.id);
        });
      });
      return fbRes.result;
    },
    likeFB: function(post_id){
      var token= Meteor.user().services.facebook.accessToken;
      FBGraph.setAccessToken(token);

      FBGraph.post(post_id + "/likes", function(err, res) {

        console.log(res); // { id: xxxxx}

      });

    }
});
