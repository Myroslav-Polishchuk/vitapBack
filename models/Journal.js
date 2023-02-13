const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Journal = sequelize.define('Journal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    url: {type: Sequelize.STRING},
    name: {type: Sequelize.STRING},
    isOnline: {type: Sequelize.BOOLEAN, default: false}
});

Journal.sync();

module.exports = Journal;
