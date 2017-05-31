var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var restaurantsController = require('../controllers/restaurants.js');

router.route('/yelpapi/:term')

  .get(restaurantsController.searchYelp);

module.exports = router;
