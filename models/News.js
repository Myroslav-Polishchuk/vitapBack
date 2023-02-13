const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const News = sequelize.define('News', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {type: Sequelize.STRING},
    previewText: {type: Sequelize.TEXT},
    mainText: {type: Sequelize.TEXT('long')},
    isOnline: {type: Sequelize.BOOLEAN},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    isMainNews: {type: Sequelize.BOOLEAN},
})

module.exports = News;
