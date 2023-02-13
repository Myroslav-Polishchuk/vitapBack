const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Author = sequelize.define('AdvertisingPlace', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {type: Sequelize.STRING},
    jsonConfig: {type: Sequelize.STRING}
});

module.exports = Author;
