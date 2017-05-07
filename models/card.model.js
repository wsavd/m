var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cardSchema = mongoose.Schema({
        title: String,
        createdAt: { type: Date, default: Date.now },
        boardId: String,
        columnId: String
}, { versionKey: false });

module.exports = mongoose.model('Card', cardSchema);