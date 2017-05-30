var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
  name: response.json.businesses.name,
  restaurantImage: response.json.businesses.image_url,
  rating: response.json.businesses.rating,
  address: response.json.businesses.location.display_address,
  price: response.json.businesses.price
})

module.exports = ('Restaurant', RestaurantSchema);
