const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Video = sequelize.define('Video', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    title: {type: Sequelize.STRING},
    src: {type: Sequelize.STRING},
    embedURL: {type: Sequelize.TEXT},
    previewImgSrc: {type: Sequelize.STRING},
    previewImgAlt: {type: Sequelize.STRING},
    previewText: {type: Sequelize.STRING},
    isOnline: {type: Sequelize.BOOLEAN},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    mainText: {type: Sequelize.TEXT('long')}
});

module.exports = Video;
