const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Author = sequelize.define('Author', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {type: Sequelize.STRING},
    secondName: {type: Sequelize.STRING},
    thirdName: Sequelize.STRING,
    workplace: {type: Sequelize.STRING}
});

module.exports = Author;
