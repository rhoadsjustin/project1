var express         = require('express'),
    router          = express.Router(),
    bodyParser      = require('body-parser'), //parses information from POST
    methodOverride  = require('method-override'); //used to manipulate POST

var restaurantsController = require('../controllers/restaurants.js');
var usersController       = require('../controllers/users');
var menusController       = require('../controllers/menus');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect to login page
  res.redirect('/');
}

router.route('/yelpapi/:term')

  .get(restaurantsController.searchYelp);

// menu routes
router.route('/menu')

  .post(isAuthenticated, menusController.createMenu);



router.route('/login/facebook').get( usersController.getLogin);
router.route('/login/facebook/callback').get(usersController.getCallback);
router.route('/logout').get(usersController.logout);

module.exports = router;
