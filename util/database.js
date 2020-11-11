// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//     MongoClient.connect('mongodb+srv://Myron:1tSbcA6nBDv1zNmM@cluster0.yqkcs.mongodb.net/<dbname>?retryWrites=true&w=majority')
//     .then(client => {
//         console.log("Connected!!!");
//         _db = client.db();
//         callback(client);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// };

// const getDb = () => {
//     if (_db) {
//         return _db
//     }
//     throw 'No database connection'
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;