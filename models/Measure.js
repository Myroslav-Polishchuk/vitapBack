const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//isOnline, date
const measureSchema = new Schema({
    imgSrc: {type: String, required: true},
    imgAlt: {type: String, required: true},
    link: {type: String, required: true}
})

module.exports = mongoose.model('Measure', measureSchema);