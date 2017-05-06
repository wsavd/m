var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColumnSchema = mongoose.Schema({
        title: String,
        boardId: String,
        created_at: {type: Date, default: Date.now}
}, { versionKey: false });

module.exports = mongoose.model('Column', ColumnSchema);