var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eatbetter');

module.exports.Restaurant = require('./restaurant.js');
module.exports.Menu = require('./menu.js');
