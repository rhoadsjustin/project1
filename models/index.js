var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eatbetter');

module.exports.User = require('./user.js');
module.exports.Menu = require('./menu.js');
module.exports.Item = require('./item.js');
module.exports.Restaurant = require('./restaurant.js');
