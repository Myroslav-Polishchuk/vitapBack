const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//isOnline, date
const AuthorSchema = new Schema({
    name: {type: String, required: true},
})

module.exports = mongoose.model('Author', AuthorSchema);