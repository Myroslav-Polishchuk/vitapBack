const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    main_title: {type: String, required: true},
    main_fullText: {type: String, required: true},
    meta_name: {type: String, required: true},
    meta_code: {type: String, required: true},
    meta_workplace: {type: String, required: true},
    resume_keywords: {type: String, required: true},
    resume_paragraphs: {type: String, required: true},
    referencesID: {type: [{type: Schema.Types.ObjectId, ref: 'Reference'}], required: true},
    categoryID: {type: Schema.Types.ObjectId, ref: 'Category'},
    meta_authors: {type: [{type: Schema.Types.ObjectId, ref: 'Author'}], required: true},
    journalID: {type: Schema.Types.ObjectId, ref: 'Journal'},
    isOnline: {type: Boolean, required: true},
    date: {type: Date, required: true}
});

module.exports = mongoose.model('Article', articleSchema);