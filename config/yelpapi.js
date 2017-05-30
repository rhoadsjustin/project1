'use strict';


yelpPull(req, res) => {
  const yelp = require('yelp-fusion');

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const clientId = 'bsZrpQQdMBHHfBqySyuHrA';
  const clientSecret = 'OhHerybhik55wIEnFq7vjdJWAYfdOc4JoNCTHAfzAORoGGNlb8aBb9sJIM9UxMQt';

  const searchRequest = {
    term: req.body.term,
    location: 'austin, tx'
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[i];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    });
  }).catch(e => {
    console.log(e);
  });
}
