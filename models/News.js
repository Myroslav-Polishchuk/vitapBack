const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    mainText: {type: String, required: true},
    isOnline: {type: Boolean, required: true},
    date: {type: Date, required: true},
    isMainNews: Boolean,
    imgs: [{type: Schema.Types.ObjectId, ref: 'Foto'}],
    videoSrc: String
})

module.exports = mongoose.model('News', newsSchema);