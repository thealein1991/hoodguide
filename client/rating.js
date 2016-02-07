
Template.rateTourist.onCreated(function () {
  Session.set('tourist_id', Router.current().params.id);
});

Template.rateTourist.events({
  'click .submit-rating' : function (event) {
      var rating = $('#rating').data('userrating');
      var description =  $('textarea#description').val();
      var fb =  $('input[name="fb"]')[0].checked;
      if(fb){
        var message = description + ' #hoodguide';
        var id = Router.current().params.id;
        var userId = Meteor.user().services.facebook.id;
        Meteor.call('postFB', message, id , function(err, data) {
          if(!err) Session.set("fbPost", data);
          console.log('Posted rating on Facebook. Post ID: ' + Session.get("fbPost", data));
          Reviews.insert({
    				tourist_id: Session.get('tourist_id'),
            from_user: userId,
            starsCount: rating.toString(),
    			  description: description,
    			  time: new Date(),
            from_username: getUser(userId).username,
            fb_post_id: Session.get("fbPost")
    			});
        });
      }

      if(!rating){
        document.getElementById("errorStars").style.display ="block";
      } else{
        document.getElementById("errorStars").style.display ="none";
      }
      if(!description){
        document.getElementById("errorDescription").style.display ="block";
      } else{
        document.getElementById("errorStars").style.display ="none";
      }

      FlashMessages.sendSuccess("Bewertung abgegeben!");
    }
});


Template.rateTourist.helpers({
  touristdata: function(){
    console.log(Router.current().params.id);
    return getUser(Router.current().params.id);
  }
});
