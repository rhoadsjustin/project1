var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
  name: String,
  image_url: String,
  rating: Number,
  address: JSON,
  location: JSON,
  term: String,
  price: String,
  url: String,
  menuItems: [String]
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);
