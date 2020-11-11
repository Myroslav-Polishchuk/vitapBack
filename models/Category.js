const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    eng: {type: String, required: true},
    ukr: {type: String, required: true},
    rus: {type: String, required: true},
    imgSrc: {type: String, required: true},
    imgAlt: {type: String, required: true}
})

module.exports = mongoose.model('Category', categorySchema);