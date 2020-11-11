const express = require('express');
const route = express.Router();

const ArticleModel = require('../models/Article');
const AuthorModel = require('../models/Author');

const ITEMS_PER_PAGE = 2;

route.get('/', function(req, res, next) {
    AuthorModel
    .find({})
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err)
    });

    return;
})

route.get('/length/:authorID', function(req, res, next) {
    ArticleModel
    .countDocuments({meta_authors: req.params.authorID}, function(err, count) {
        res.json({
            length: count
        });
    });

    return;
});

route.get('/author/:authorID', function(req, res, next) {
    AuthorModel
    .findById(req.params.authorID)
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err)
    });


    return;
});

route.post('/articles/:authorID', function(req, res, next) {
    const authorID = req.params.authorID;
    const page = req.body.page ? req.body.page : '';

    ArticleModel
    .find({"meta_authors": authorID})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .populate('meta_authors')
    .populate('journalID')
    .select({_id: 1, main_title: 1, meta_authors: 1, journalID: 1})
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err)
    })

    return;
});

route.get('/:letter', function(req, res, next) {
    AuthorModel
    .find({"name": {$regex: `^${req.params.letter}`}})
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err)
    })

    return;
});

module.exports = route;