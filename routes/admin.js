const express = require('express');
const fs = require('fs');
const route = express.Router();
const { v4: uuidv4 } = require("uuid")
const sequelize = require('sequelize')

const AdvertisingModel = require('../models/Advertising');
const ArticleModel = require('../models/Article');
const AuthorModel = require('../models/Author');
const CategoryModel = require('../models/Category');
const EventModel = require('../models/Event');
const JournalModel = require('../models/Journal');
const NewsModel = require('../models/News');
const OrganizationModel = require('../models/Organization');
const RecomendationModel = require('../models/Recomendation');
const VideoModel = require('../models/Video');
const FotosModel = require('../models/Foto');
const FilesModel = require('../models/File');

const formsData = require('../additionalData/formsData');
const adminRouteFunc = require('./functions/adminRouteFunc');

const allModel = [
    AdvertisingModel,
    ArticleModel,
    AuthorModel,
    CategoryModel,
    EventModel,
    JournalModel,
    NewsModel,
    OrganizationModel,
    RecomendationModel,
    VideoModel,
    FotosModel,
    FilesModel

];

// const ms = [
//     'myr.character@gmail.com'
// ]

// const ids = [];

const allModelMap = {
    Advertising: AdvertisingModel,
    Article: ArticleModel,
    Author: AuthorModel,
    Category: CategoryModel,
    Event: EventModel,
    Journal: JournalModel,
    News: NewsModel,
    Organization: OrganizationModel,
    Recomendation: RecomendationModel,
    Video: VideoModel,
    Foto: FotosModel,
    File: FilesModel
}

const collectionsLength = allModel.length;

// route.post('/check', function(req, res, next) {
//     const currentDate = new Date().getTime();
//     ids.filter((id) => {
//         return currentDate - id.date < 3605000;
//     });

//     const indexID = ids.findIndex((idObj) => {
//         return idObj.id === req.body.id
//     });

//     if (indexID > -1) {
//         ids[indexID].date = new Date().getTime();
//         return res.json({
//             answer: true
//         })
//     }
//     return res.json({
//         answer: false
//     })
// })

// route.post('/getID', function(req, res, next) {
//     const mailIndex = ms.indexOf(req.body.mail);

//     if (mailIndex > -1) {
//         const id = uuidv4();
//         ids.push({
//             id: id,
//             date: new Date().getTime()
//         });

//         return res.json({
//             answer: true,
//             id: id
//         });
//     }
//     return res.json({
//         answer: false
//     })
// })
let savedUUID = []



route.post('/checkCode', removeOldUUID, function(req, res, next) {
    const code = req.body.userCode;
    const isValid = savedUUID.some((obj => obj.uuid === code));

    res.json({
        isValid: isValid
    });

    return;
});

route.get('/', removeOldUUID, function(req, res, next) {
    const dataCollections = [];

    for (const model of allModel) {
        dataCollections.push({
            name: model.name,
            collectionFields: Object.keys(model.rawAttributes)
        });

    }
    res.json(dataCollections);
});

route.get('/form/:modelName', removeOldUUID, function(req, res, next) {
    const model = formsData[req.params.modelName];
    res.json(model);
});

route.get('/:modelName', removeOldUUID, function(req, res, next) {
    const model = allModelMap[req.params.modelName];

    if (model) {
        model
            .findAll({})
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
});

route.get('/:modelName/:ID', function(req, res, next) {
    const model = allModelMap[req.params.modelName];

    if (model) {
        switch(model.name) {
            case 'Article':
                adminRouteFunc.articleGETbyID(req.params.ID, res);
                break;
            case 'News':
                adminRouteFunc.newsGetbyID(req.params.ID, res);
                break;
            default:
                model
                    .findByPk(req.params.ID)
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                break;
        }
    }


});

route.post('/form/:modelName', removeOldUUID, function(req, res, next) {
    const model = allModelMap[req.params.modelName] || {};
    const formData = req.body.formData;

    if (model) {
        switch(model.name) {
            case 'Article':
                adminRouteFunc.articlePOST(formData, res);
                break;
            case 'News':
                adminRouteFunc.newsPOST(formData, res)
                break;
            default:
                model
                    .create(formData)
                    .then(result => {
                        console.log(result)
                        res.json({success: true});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({success: true});
                    });
        }
    }
})

route.put('/form/:modelName', removeOldUUID, function(req, res, next) {
    const model = allModelMap[req.params.modelName] || {};
    const formData = req.body.formData;

    if (model) {
        switch(model.name) {
            case 'Article':
                adminRouteFunc.articlePUT(formData, res);
                break;
            case 'News':
                adminRouteFunc.newsPUT(formData, res);
                break;
            default:
                model
                    .update(formData, {
                        where: {
                            id: formData.id
                        }
                    })
                    .then(result => {
                        console.log(result)
                        res.json({success: true});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({success: false});
                    });
        }
    }
});

route.delete('/form/:modelName', removeOldUUID, function(req, res, next) {
    const model = allModelMap[req.params.modelName] || {};
    const formData = req.body.formData;

    if (model) {
        switch(model.name) {
            case 'Article':
                adminRouteFunc.articleDELETE(formData, res);
                break;
            case 'News':
                adminRouteFunc.newsDELETE(formData, res);
                break;
            default:
                model
                    .destroy({
                        where: {
                            id: formData.id
                        }
                    })
                    .then(result => {
                        console.log(result)
                        res.json({success: true});
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({success: false});
                    });
        }
    }
});

route.post('/formData/:modelName', removeOldUUID, function(req, res, next) {
    let file = null;

    const formData = req.body;
    const modelName = req.params.modelName;
    const model = allModelMap[modelName];

    if (modelName === 'Foto') {
        file = req.files.imgFile[0];
        formData.imgSrc = `${process.env.host}/${file.destination}/${file.filename}`;
    } else if (modelName === 'File') {
        file = req.files.file[0];
        formData.link = `${process.env.host}/${file.destination}/${file.filename}`;
    }

    model
        .create(formData)
        .then(result => {
            console.log(result)
            res.json({success: true});
        })
        .catch(err => {
            console.log(err);
            res.json({success: true});
        });
});

route.put('/formData/:modelName', removeOldUUID, function(req, res, next) {
    const formData = req.body;
    const modelName = req.params.modelName;
    const model = allModelMap[modelName];

    model.update(formData, {
        where: {
            id: formData.id
        }
    })
    .then(result => {
        console.log(result)
        res.json({success: true});
    })
    .catch(err => {
        console.log(err);
        res.json({success: true});
    });
});

route.delete('/formData/:modelName', removeOldUUID, function(req, res, next) {
    const formData = req.body;
    const modelName = req.params.modelName;
    const model = allModelMap[modelName];
    let pathPropertie = '';

    if (modelName === 'fotos') {
        pathPropertie = 'imgSrc';
    } else if (modelName === 'files') {
        pathPropertie = 'link';
    }

    model
        .destroy({
            where: {
                id: formData.id
            }
        })
        .then(res => {
            res.json({success: true});
        })
        // .then(result => {
        //     model.findByIdAndDelete(result.id, error => {
        //         fs.unlink(`.${result[pathPropertie]}`, (err) => {
        //             if (err) {
        //             console.error(err)
        //             return
        //             }
        //         });
        //         console.log(error)
        //         res.json({success: true});
        //     });
        // })
});

module.exports = route;

function removeOldUUID(req, res, next) {
    const currentDate = new Date().getTime();
    savedUUID = savedUUID.filter((saveObj) => currentDate - saveObj.date < 3605000);
    return next();
}