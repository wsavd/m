var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
  category: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', BookSchema);