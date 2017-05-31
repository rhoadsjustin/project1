var mongoose = require('mongoose');
var Menu = require('./menu.js');

var RestaurantSchema = mongoose.Schema({
  name: String,
  image_url: String,
  rating: Number,
  address: JSON,
  location: JSON,
  term: String,
  price: String,
  url: String,
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);
