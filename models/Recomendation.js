const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Recomendation = sequelize.define('Recomendation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {type: Sequelize.STRING},
    isOnline: {type: Sequelize.BOOLEAN},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
});

module.exports = Recomendation;
