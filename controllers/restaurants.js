var passport = require('passport');
var expressSession = require('express-session');
var db = require('../models');



function searchYelp(req,res){
  var yelp = require('yelp-fusion');
  console.log(req.query.q);

  var clientId = process.env.YELP_CLIENT_ID;
  var clientSecret = process.env.YELP_CLIENT_SECRET;


  var searchRequest = {
    term: req.query.q,
    location: 'austin, tx'
  };

  // check your db for the term here
  db.Restaurant.find({term: searchRequest.term}, function(err, success){
    //console.log(success);
    if(success.length === 0) {
      console.log(`\nDIDN'T FIND ANY ${searchRequest.term}s IN OUR DB\n`);
      yelp.accessToken(clientId, clientSecret).then(response => {
        searchRequest;
        var client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response => {
          var results = response.jsonBody.businesses;
          //const prettyJson = JSON.stringify(firstResult, null, 4);

            db.Restaurant.create(results, function(err, madeRests){
              madeRests.forEach( function(result, index){
                // db.Menu.create({name: result.name}, function(err, succ){
                //   if(err){return console.log(err)}
                //   result.menu = succ;
                //   result.save();
                // });
                result.term = searchRequest.term;
                result.save(function(err, succ){
                  if(index === madeRests.length - 1){
                    console.log("\n ADDED TO DB THE SEARCH TERM: " , searchRequest.term);
                    db.Restaurant.find({term: searchRequest.term}, function(err, succ){

                      res.render('results', {results: succ, user: req.user});
                    });
                  }
                });

              })


              //res.render('results', {result: succ, user: req.user});
            });

        });
      }).catch(e => {
        console.log(e);
        res.send("Sad!");
      });
    } else {
      console.log(`\n WE HAVE WHOLE BUNCH OF ${searchRequest.term}s IN OUR DB\n`);
      res.render('results', {results: success, user: req.user});
    }
    // db.Restaurant.find({term: searchRequest.term}, function(err, success){
    //     if(err){return console.log(err);}
    //     res.render('results', {results: success, user: req.user});
    // });
  });
}


function getOneRestaurant (req, res) {
  var restaurantName = req.params.id;
  console.log(restaurantName);
  db.Restaurant.findOne({ _id: restaurantName}, function(err, restaurantFound){
    console.log(restaurantFound);
    if(err){console.log("There is no restaurant by that name, please search again")};
    res.render('menu', {restaurant: restaurantFound, user: req.user});
  });

}






module.exports = {
  searchYelp: searchYelp,
  getOneRestaurant: getOneRestaurant
}
