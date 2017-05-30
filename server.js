var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app');


app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Add static middleware
app.use(express.static(__dirname + '/public'));

// Setting up the Passport Strategies
// require("./config/passport")(passport)
app.get('/yelpapi/:term', function searchYelp(req,res){
  var yelp = require('yelp-fusion');

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  var clientId = 'bsZrpQQdMBHHfBqySyuHrA';
  var clientSecret = 'OhHerybhik55wIEnFq7vjdJWAYfdOc4JoNCTHAfzAORoGGNlb8aBb9sJIM9UxMQt';


  yelp.accessToken(clientId, clientSecret).then(response => {
    var searchRequest = {
      term: req.params.term,
      location: 'austin, tx'
    };
    var client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      var results = response.jsonBody.businesses;
      //const prettyJson = JSON.stringify(firstResult, null, 4);
      res.render('index', {results: results});
    });
  }).catch(e => {
    console.log(e);
  });
})

var routes = require('./config/routes');

//app.use(routes);

app.listen(3000);
