const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const ArticleAuthor = sequelize.define('ArticleCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
})

module.exports = ArticleAuthor;