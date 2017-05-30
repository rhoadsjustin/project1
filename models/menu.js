var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
  name: String,
  rating: Number,
  comments: String,
  photos: String
})

var MenuSchema = mongoose.Schema({
  name: {type: String, default: "Name coming soon!"},
  items: [ItemSchema]
})



module.exports = mongoose.model('Menu', MenuSchema);
module.exports = mongoose.model('Item', ItemSchema);
module.exports = mongoose.model('User', UserSchema);
