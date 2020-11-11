const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//isOnline, date
const advertisingSchema = new Schema({
    imgSrc: {type: String, required: true},
    imgAlt: {type: String, required: true},
    link: {type: String, required: true},
    type: String,
    isActive: Boolean
})

module.exports = mongoose.model('Advertising', advertisingSchema);