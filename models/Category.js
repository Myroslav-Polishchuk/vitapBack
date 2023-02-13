const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    eng: {type: Sequelize.STRING},
    ukr: {type: Sequelize.STRING},
    rus: {type: Sequelize.STRING},
    imgLink: {type: Sequelize.STRING},
    sortPositionHeader: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    sortPositionArticleBlock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = Category;
