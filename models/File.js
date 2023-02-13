const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// TODO: можливо необхідно добавити поле статус (реєстрований користувач, не реєстрований користувач)
const File = sequelize.define('File', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {type: Sequelize.STRING},
    link: {type: Sequelize.STRING},
});

File.sync();

module.exports = File;
