var mongoose = require('mongoose');

// TODO: I'm excited to see your Item model attached to your Restaurant model. This will make your page really stand out!
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
