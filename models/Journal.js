const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    url: {type: String, required: true},
    name: {type: String, required: true},
})

module.exports = mongoose.model('Journal', journalSchema);