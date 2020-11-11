const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();

const AdvertisingModel = require('../models/Advertising');
const ArticleModel = require('../models/Article');
const AssociationModel = require('../models/Association');
const AuthorModel = require('../models/Author');
const CategoryModel = require('../models/Category');
const EventModel = require('../models/Event');
const JournalModel = require('../models/Journal');
const MeasureModel = require('../models/Measure');
const NewsModel = require('../models/News');
const OrganizationModel = require('../models/Organization');
const RecomendationModel = require('../models/Recomendation');
const VideoModel = require('../models/Video');

const formsData = require('../additionalData/formsData');

const allModel = [
    AdvertisingModel,
    ArticleModel,
    AssociationModel,
    AuthorModel,
    CategoryModel,
    EventModel,
    JournalModel,
    MeasureModel,
    NewsModel,
    OrganizationModel,
    RecomendationModel,
    VideoModel
];

const allModelMap = {
    advertisings: AdvertisingModel,
    articles: ArticleModel,
    associations: AssociationModel,
    authors: AuthorModel,
    categories: CategoryModel,
    events: EventModel,
    journals: JournalModel,
    measures: MeasureModel,
    news: NewsModel,
    organizations: OrganizationModel,
    recomendations: RecomendationModel,
    videos: VideoModel
}

const collectionsLength = allModel.length;

route.get('/', function(req, res, next) {
    const dataCollections = [];

    for (const model of allModel) {
        dataCollections.push({
            name: model.collection.collectionName,
            collectionFields: Object.keys(model.schema.paths)
        });
        if (dataCollections.length === collectionsLength) {
            res.json(dataCollections);
        }
    }
});

route.get('/:modelName', function(req, res, next) {
    const model = allModelMap[req.params.modelName];

    if (model) {
        model
        .find({})
        .then(result => {
            res.json(result);
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        })
    }
});

route.get('/form/:modelName', function(req, res, next) {
    const model = formsData[req.params.modelName];
    res.json(model);
});

route.get('/:modelName/:ID', function(req, res, next) {
    const model = allModelMap[req.params.modelName];

    if (model) {
        model
        .findById(req.params.ID)
        .then(result => {
            res.json(result);
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        })
    }
});

route.post('/form/:modelName', function(req, res, next) {
    const model = allModelMap[req.params.modelName];
    const formData = req.body.formData;

    const dataM = new model(formData);

    dataM.save()
    .then(result => {
        console.log(result)
        res.json({success: true});
    })
    .catch(err => {
        console.log(err);
        res.json({success: true});
    });
})

route.put('/form/:modelName', function(req, res, next) {
    const model = allModelMap[req.params.modelName];
    const formData = req.body.formData;

    model.findByIdAndUpdate(formData._id, formData)
    .then(result => {
        console.log(result)
        res.json({success: true});
    })
    .catch(err => {
        console.log(err);
        res.json({success: false});
    });
})

route.delete('/form/:modelName', function(req, res, next) {
    const model = allModelMap[req.params.modelName];
    const formData = req.body.formData;

    model.findOneAndDelete({_id: formData._id})
    .then(result => {
        console.log(result)
        res.json({success: true});
    })
    .catch(err => {
        console.log(err);
        res.json({success: false});
    });
})

module.exports = route;