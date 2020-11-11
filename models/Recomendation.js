const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recomendationSchema = new Schema({
    text: {type: String, required: true},
    categoryID: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    fileID: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    isOnline: {type: Boolean, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Recomendation', recomendationSchema);