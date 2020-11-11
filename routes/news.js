const express = require('express');
const route = express.Router();
const NewsModel = require('../models/News');

const ITEMS_PER_PAGE = 2;

route.get('/length', function(req, res, next) {
    NewsModel
    .countDocuments({}, function(err, count) {
        res.json({
            newsLength: count
        });
    })
});

route.get('/main', function(req, res, next) {
    NewsModel
    .find({isMainNews: true})
    .populate('imgs')
    .limit(1)
    .select({_id: 1, title: 1, mainText: 1, imgs: 1})
    .then(news => {
        res.json(news[0]);
    })
    .catch(err => {
        console.log(err);
    });
    
    return;
})

route.get('/preview/:ignoreNewsID', function(req, res, next) {
    const ignoreNewsID = req.params.ignoreNewsID;

    NewsModel
    .find({_id: {$ne: ignoreNewsID}, isMainNews: false})
    .populate('imgs')
    .select({title: 1, _id: 1})
    .limit(5)
    .then(news => {
        res.json(news);
    })
    .catch(err => {
        console.log(err);
    });

    return;
});

route.get('/:newsID', function(req, res, next) {
    const newsID = req.params.newsID;

    NewsModel
    .findById(newsID)
    .populate('imgs')
    .then(news => {
        res.json(news);
    })
    .catch(err => {
        console.log(err);
    });

    return;
});

route.post('/', function(req, res, next) {
    const page = req.body.page ? req.body.page : 1;

    NewsModel.find()
    .populate('imgs')
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .select({title: 1, _id: 1, date: 1})
    .then(news => {
        res.json(news);
    })
    .catch(err => {
        console.log(err);
    });
    
    return;
});

module.exports = route;
