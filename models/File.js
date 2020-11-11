const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    link: {type: String, required: true},
    name: {type: String, required: true}
})

module.exports = mongoose.model('File', fileSchema);