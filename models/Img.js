const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema({
    imgSrc: {type: String, required: true},
    imgAlt: {type: String, required: true}
})

module.exports = mongoose.model('Foto', imgSchema);