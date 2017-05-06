var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  created_at: {type: Date, default: Date.now}
}, { versionKey: false });

module.exports = mongoose.model('Book', BookSchema);