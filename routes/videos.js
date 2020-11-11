const express = require('express');
const route = express.Router();

const VideoModel = require('../models/Video');

// ID, src, title, previewImg, previewImgAlt, category(повязане з іншими даними), previewText
// Дістати 3 відео для HomePage
// Дістати всі відео по наданим категоріям
// Дістати відео по ID

const ITEMS_PER_PAGE = 2;

route.get('/preview', function(req, res, next) {
    VideoModel.find()
    .limit(3)
    .populate('categoryID')
    .then(videos => {
        res.json(videos);
    })
    .catch(err => {
        console.log(err);
    });

    return;
});

route.get('/length', function(req, res, next) {
    VideoModel
    .countDocuments({}, function(err, count) {
        res.json({
            videosLength: count
        });
    });

    return;
});

route.get('/length/:categoryID', function(req, res, next) {
	const categoryFilter = req.params.categoryID ? {categoryID: req.params.categoryID} : {};

    VideoModel
    .countDocuments(categoryFilter, function(err, count) {
        res.json({
            videosLength: count
        });
    });

    return;
});

route.get('/:id', function(req, res, next) {
    const ID = req.params.id;

    VideoModel.findById(ID)
    .populate('categoryID')
    .then(video => {
        res.json(video);
    })
    .catch(err => {
        console.log(err);
    });
    
    return;
})

route.post('/', function(req, res, next) {
    const page = req.body.page ? req.body.page : 1;

    VideoModel.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .populate('categoryID')
    .then(videos => {
        res.json(videos);
    })
    .catch(err => {
        console.log(err);
    });

    return;
})

route.post('/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;
    const page = req.body.page ? req.body.page : 1;

    VideoModel.find({categoryID: categoryID})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .populate('categoryID')
    .then(videos => {
        res.json(videos);
    })
    .catch(err => {
        console.log(err);
    });
    
    return;
})

module.exports = route;
