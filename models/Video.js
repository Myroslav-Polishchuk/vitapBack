const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    title: {type: String, required: true},
    src: {type: String, required: true},
    embedURL: {type: String, required: true},
    categoryID: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    previewImgSrc: {type: String, required: true},
    previewImgAlt: {type: String, required: true},
    previewText: {type: String, required: true},
    isOnline: {type: Boolean, required: true},
    date: {type: Date, required: true}
})

module.exports = mongoose.model('Video', VideoSchema);