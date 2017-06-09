var passport = require('passport');
var expressSession = require('express-session');
var db = require('../models');


// YELP FUNCTION
function searchYelp(req,res){
  var yelp = require('yelp-fusion');
  //TODO: Remove console logs from deployment versions
  console.log(req.query.q);

  var clientId = process.env.YELP_CLIENT_ID;
  var clientSecret = process.env.YELP_CLIENT_SECRET;


  var searchRequest = {
    term: req.query.q,
    location: 'austin, tx'
  };

  //TODO: Consider moving this call into a function to make your overall yelp call smaller.
  //TODO: This beastie could use some refactoring as well.  Great for prototyping, not the most efficient for deployment.
  // check your db for the term here
  db.Restaurant.find({term: searchRequest.term}, function(err, success){
    //console.log(success);
    if(success.length === 0) {
      //TODO: Remove console logs from deployment versions
      console.log(`\nDIDN'T FIND ANY ${searchRequest.term}s IN OUR DB\n`);
      yelp.accessToken(clientId, clientSecret).then(response => {
        searchRequest;
        var client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
          var results = response.jsonBody.businesses;
            db.Restaurant.create(results, function(err, madeRests){
              madeRests.forEach( function(result, index){
                result.term = searchRequest.term;
                result.save(function(err, succ){
                  if(index === madeRests.length - 1){
                    //TODO: Remove console logs from deployment versions
                    console.log("\n ADDED TO DB THE SEARCH TERM: " , searchRequest.term);
                    db.Restaurant.find({term: searchRequest.term}, function(err, succ){

                      res.render('results', {results: succ, user: req.user});
                      });
                    }
                  });
                })
              });
            });
          }).catch(e => {
              //TODO: Remove console logs from deployment versions
              console.log(e);
              res.send("Sad!");
            });
    } else {
      //TODO: Remove console logs from deployment versions
      console.log(`\n WE HAVE WHOLE BUNCH OF ${searchRequest.term}s IN OUR DB\n`);
      res.render('results', {results: success, user: req.user});
    }
  });
}


function getOneRestaurant (req, res) {
  var restaurantName = req.params.id;
  //TODO: Remove console logs from deployment versions
  console.log(restaurantName);
  db.Restaurant.findOne({ _id: restaurantName}, function(err, restaurantFound){
    //TODO: Remove console logs from deployment versions
    console.log(restaurantFound);
    if(err){console.log("There is no restaurant by that name, please search again")};
    res.render('menu', {restaurant: restaurantFound, user: req.user});
  });

}

module.exports = {
  searchYelp: searchYelp,
  getOneRestaurant: getOneRestaurant
}
