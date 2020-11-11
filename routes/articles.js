const express = require('express');
const route = express.Router();

const CategoryModel = require('../models/Category');
const ArticleModel = require('../models/Article');

const ITEMS_PER_PAGE = 2;

route.post('/article/also', function(req, res, next) {
    const ignoreArticleID = req.body.ignoreArticleID;
    const categoryID = req.body.categoryID;

    ArticleModel
    .find({_id: {$ne: ignoreArticleID}, categoryID: categoryID})
    .limit(3)
    .select({_id: 1, main_title: 1})
    .then((article) => {
        res.json(article);
        next();
    });

    return;
})

route.get('/article/:articleID', function(req, res, next) {
    const articleID = req.params.articleID;

    ArticleModel
    .findById(articleID)
    .populate('categoryID')
    .populate('journalID')
    .populate('meta_authors')
    .populate('referencesID')
    .then((article) => {
        res.json(article)
    });

    return;
})

const updateArticleDataFake = (data) => {
    data.category.imgSrc = "./img/Слой_27.png";
    data.category.imgAlt = "#";

    return data;
}

route.get('/preview', function(req, res, next) {
    const previewArticles = [];
    let readyLength = 0;

    const getArticles = (cat) => {
        ArticleModel
        .find({categoryID: cat._id})
        .select({_id: 1, main_title: 1})
        .limit(3)
        .then(articlesData => {
            const data = updateArticleDataFake({
                category: cat,
                articles: articlesData
            });
            previewArticles.push(data);
            if (previewArticles.length === readyLength) {
                res.json(previewArticles);
            }
        })
    }

    CategoryModel
    .find({})
    .then(categories => {
        readyLength = categories.length;
        categories.forEach(cat => getArticles(cat))
    })
})

route.get('/length/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;

    ArticleModel
    .countDocuments({categoryID: categoryID}, function(err, count) {
        res.json({
            articlesLength: count
        });
    })
})

route.get('/preview/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;

    ArticleModel
    .find({categoryID: categoryID})
    .populate('categoryID')
    .populate('journalID')
    .populate('meta_authors')
    .populate('referencesID')
    .select({_id: 1, main_title: 1, meta_authors: 1, journalID: 1})
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err);
    })

    return;
})

route.post('/preview/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;
    const page = req.body.page ? req.body.page : 1;

    ArticleModel
    .find({categoryID: categoryID})
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .populate('categoryID')
    .populate('journalID')
    .populate('meta_authors')
    .populate('referencesID')
    .select({_id: 1, main_title: 1, meta_authors: 1, journalID: 1})
    .then(data => {
        res.json(data);
        next();
    })
    .catch(err => {
        console.log(err);
    })

    return;
})

module.exports = route;
