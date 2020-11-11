const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    url: {type: String, required: true},
    imgID: {type: Schema.Types.ObjectId, ref: 'Foto'},
    isOnline: {type: Boolean, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Event', eventSchema);