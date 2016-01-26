Session.set('tourist_id', this.userId);

Template.rateTourist.events({
  'click .submit-rating' : function (event) {
      var rating = $('#rating').data('userrating');
      var description =  $('textarea#description').val();
      var userId = Meteor.user().services.facebook.id;
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
      Reviews.insert({
				tourist_id: Session.get('tourist_id'),
        from_user: userId,
        starsCount: rating.toString(),
			  description: description,
			  time: new Date(),
        from_username: getUser(userId).username
			});
      FlashMessages.sendSuccess("Bewertung abgegeben!");
    }
});


Template.rateTourist.helpers({
  touristdata: function(){
    console.log(Session.get('tourist_id'));
    return getUser(Session.get('tourist_id'));
  }
});
