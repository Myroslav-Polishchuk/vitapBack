const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Advertising = sequelize.define('Advertising', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    link: {type: Sequelize.STRING},
    isOnline: {type: Sequelize.BOOLEAN}
});

module.exports = Advertising;
