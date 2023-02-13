const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Article = sequelize.define('Article', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    main_title: {type: Sequelize.STRING},
    main_fullText: {type: Sequelize.TEXT('long')},
    meta_code: {type: Sequelize.STRING},
    journal_number: {type: Sequelize.STRING},
    journal_year: {type: Sequelize.STRING},
    journal_pages: {type: Sequelize.STRING},
    resume_keywords: {type: Sequelize.TEXT},
    resume_paragraphs: {type: Sequelize.TEXT('long')},
    isOnline: {type: Sequelize.BOOLEAN},
    showPDF: {type: Sequelize.BOOLEAN},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    references: {type: Sequelize.TEXT('long')}
});

module.exports = Article;
