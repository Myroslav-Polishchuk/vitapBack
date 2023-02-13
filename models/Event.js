const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Event = sequelize.define('Event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {type: Sequelize.STRING},
    url: {type: Sequelize.STRING},
    isOnline: {type: Sequelize.BOOLEAN},
    date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
})

module.exports = Event;
