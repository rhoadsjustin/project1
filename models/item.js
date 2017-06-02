var mongoose = require('mongoose');

var ItemSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Item', ItemSchema);
