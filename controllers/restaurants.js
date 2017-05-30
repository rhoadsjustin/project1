function searchYelp(req,res){
  var yelp = require('yelp-fusion');

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app


  yelp.accessToken(clientId, clientSecret).then(response => {
    var searchRequest = {
      term: req.params.term,
      location: 'austin, tx'
    };
    var client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      var firstResult = response.jsonBody.businesses;
      //const prettyJson = JSON.stringify(firstResult, null, 4);
      res.json(firstResult);
    });
  }).catch(e => {
    console.log(e);
  });
}
