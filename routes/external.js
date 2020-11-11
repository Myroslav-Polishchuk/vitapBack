const express = require('express');
const route = express.Router();
const JournalModel = require('../models/Journal');

route.get('/', function(req, res, next) {
    JournalModel
    .find({})
    .then(data => {
        res.json(data); 
    })
    .catch(err => {
        console.log(err);
    });

    return;
})

module.exports = route;