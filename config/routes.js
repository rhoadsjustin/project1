var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    passport = require("passport"),
    methodOverride = require('method-override'); //used to manipulate POST

var restaurantsController = require('../controllers/restaurants');
var usersController   = require('../controllers/users');
// var staticsController = require('../controllers/staticsController');

// var isAuthenticated = function (req, res, next) {
//   // if user is authenticated in the session, call the next() to call the next request handler
//   // Passport adds this method to request object. A middleware is allowed to add properties to
//   // request and response objects
//   if (req.isAuthenticated())
//     return next();
//   // if the user is not authenticated then redirect him to the login page
//   res.redirect('/');
// }

router.route('/yelpapi/:term')
  .get();

// router.route('/')
//   .get(staticsController.home);


// router.route('/login/facebook').get( usersController.getLogin);
// router.route('/login/facebook/callback').get(usersController.getCallback);
// router.route('/logout').get(usersController.logout);

module.exports = router
