const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderHomePage = sequelize.define('OrderHomePage', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    componentName: {type: Sequelize.STRING},
    additionalDataJSON: {type: Sequelize.TEXT},
    orderNumber: {type: Sequelize.INTEGER, defaultValue: 100},
    isOnline: {type: Sequelize.BOOLEAN, defaultValue: false},
});

module.exports = OrderHomePage;