Meteor.methods({
    'getLocation': function getLocation(termText) {
      var Yelp = Meteor.npmRequire('yelp');
      var yelp = new Yelp({
        consumer_key: 'NdOXWGl0nxUS_Giu7KIPSw',
        consumer_secret: '3JZI0DVfUC3PLoqc-BQivFkFke0',
        token: 'MCscYrL6m21Cejh99tDLCfAm3K6KIifc',
        token_secret: 'lsbxV4O2bhxMXaKrXwcKcmDeaKs',
      });

      console.log('Incoming: ' + termText)
      // See http://www.yelp.com/developers/documentation/v2/search_api
      // yelp.search({ term: termText, location: 'Berlin' })
      // .then(function (data) {
      //   console.log(data);
      //   return data;
      // })
      // .catch(function (err) {
      //   console.error(err);
      // });

      // yelp.search({ term: 'Restaurant', location: 'Berlin' })
      // .then(function (data) {
      //   console.log('FOODSTUFF');
      //   for(i=0; i< data.businesses.length; i++){
      //     console.log(data.businesses[i].name);
      //   }
      // })
      // .catch(function (err) {
      //   console.error(err);
      // });

      var yelpRes = Async.runSync(function(done) {
        yelp.search({ term: termText, location: 'Berlin', category_filter: 'bars,nightlife,restaurants'}, function(err, data) {
          if (err) return console.log(error);
          console.log(data.businesses[0].location.coordinate);
          done(null, data.businesses[0].location.coordinate);
        });
      });
      return yelpRes.result;




    }

  });
