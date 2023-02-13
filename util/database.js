const Sequelize = require('sequelize');

const sequelize = new Sequelize('vitapol', 'root', 'Baguvix333', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});

// const sequelize = new Sequelize('zpindfap_vitapol_2', 'zpindfap_myron', 'CUFNQxYujbMNxhiqACv2', {
//     dialect: 'mysql',
//     host: 'localhost',
//     logging: false,
//     define: {
//         charset: 'utf8',
//         collate: 'utf8_general_ci'
//     }
// });

module.exports = sequelize;

//     host: 'localhost',
//     user: 'zpindfap_myron',
//     database: 'zpindfap_vitapol',
//     password: 'CUFNQxYujbMNxhiqACv2'


// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'vitapol',
//     password: 'Baguvix333'
// });

// module.exports = pool.promise();