var mongoose = require('mongoose');

//TODO: Consider adding more attributes to your model (price, rating, category (fish, meat, vegan, lite, etc))
var ItemSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Item', ItemSchema);
