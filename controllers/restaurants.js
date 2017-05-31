var passport = require('passport');
var expressSession = require('express-session');



function searchYelp(req,res){
  var yelp = require('yelp-fusion');
  var db = require('../models');


  var clientId = process.env.YELP_CLIENT_ID;
  var clientSecret = process.env.YELP_CLIENT_SECRET;


  var searchRequest = {
    term: req.params.term,
    location: 'austin, tx'
  };

  // check your db for the term here
  db.Restaurant.find({term: searchRequest.term}, function(err, success){
    console.log(success);
    if(success.length === 0) {
      console.log(`\nDIDN'T FIND ANY ${searchRequest.term}s IN OUR DB\n`);
      yelp.accessToken(clientId, clientSecret).then(response => {
        searchRequest;
        var client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
          var results = response.jsonBody.businesses;
          //const prettyJson = JSON.stringify(firstResult, null, 4);
          results.forEach( function(result){
            result.term = searchRequest.term;
            // createMenu();
            // since it wasn't in the db, add all the api results in results to your db here
            db.Restaurant.create(results, function(err, succ){

              console.log(succ[0]);
              console.log("\n ADDED TO DB THE SEARCH TERM: " , searchRequest.term);
              res.render('results', {results: succ, user: req.user});
            })
          })

        });
      }).catch(e => {
        console.log(e);
      });
    } else {
      console.log(`\n WE HAVE WHOLE BUNCH OF ${searchRequest.term}s IN OUR DB\n`);

      res.render('results', {results: success, user: req.user});
    }
  })
}


// function changeRestaurantRating (req, res) {
//   var restaurantName = req.params.name;
//
//   db.Restaurant.find(restaurantName, function(err, restaurantFound){
//     if(err){console.log("There is no restaurant by that name, please search again")};
//     var foundRestaurant = restaurantFound;
//   })
//
// }






module.exports = {
  searchYelp: searchYelp
}
