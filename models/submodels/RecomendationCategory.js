const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const RecomendationCategory = sequelize.define('RecomendationCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
})

module.exports = RecomendationCategory;