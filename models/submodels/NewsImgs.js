const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const NewsImgs = sequelize.define('NewsImgs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
})

module.exports = NewsImgs;
