const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const ArticleAuthor = sequelize.define('ArticleAuthor', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    sortPosition: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
})

module.exports = ArticleAuthor;
