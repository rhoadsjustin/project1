'use strict';


yelpPull(req, res) => {
  var yelp = require('yelp-fusion');

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  var clientId = ;
  var clientSecret = ;

  var searchRequest = {
    term: req.body.term,
    location: 'austin, tx'
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    var client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      var firstResult = response.jsonBody.businesses[i];
      var prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    });
  }).catch(e => {
    console.log(e);
  });
}
