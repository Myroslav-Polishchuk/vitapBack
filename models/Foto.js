const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Foto = sequelize.define('Foto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    imgSrc: {type: Sequelize.STRING},
    imgAlt: {type: Sequelize.STRING},
    name: {type: Sequelize.STRING},
});

Foto.sync();

module.exports = Foto;
