const express = require('express');
const route = express.Router();
const EventModel = require('../models/Event');

route.get('/preview', function(req, res, next) {
    EventModel
        .find({})
        .populate('imgID')
        .limit(4)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });

    return;
});

route.get('/', function(req, res, next) {
    EventModel
        .find({})
        .populate('imgID')
        .limit(30)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });

    return;
});

module.exports = route;
