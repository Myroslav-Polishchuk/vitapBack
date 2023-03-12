const express = require('express');
const route = express.Router();

const mainModel = require('../models/Video');
const CategoryModel = require('../models/Category');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

const ITEMS_PER_PAGE = 30;

// ==========================
route.post('/table/length', function (req, res, next) {
    const options = {
        where: {}
    }

    if (req.body.searchName && req.body.searchValue) {
        options.where[req.body.searchName] = {
            [Op.like]: `%${req.body.searchValue}%`
        };
    }

    mainModel.count(options).then(length => {
        res.json({
            length: length
        });
    }).catch(err => {
        console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
    })
});

route.post('/table', function (req, res, next) {
    const options = {
        offset: req.body.offset ? req.body.offset : 0,
        limit: req.body.limit ? req.body.limit : 30,
        where: {}
    };

    if (req.body.searchName && req.body.searchValue) {
        options.where[req.body.searchName] = {
            [Op.like]: `%${req.body.searchValue}%`
        };
    }

    mainModel.findAll(options).then(data => {
        res.json({
            data: data || []
        });
    }).catch(err => {
        console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
    })
});

route.get('/form', function (req, res, next) {
    mainModel.findAll().then(data => {
            res.json(data || []);
        }).catch(err => {
            console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
        });
});

route.get('/form/:ID', function (req, res, next) {
    mainModel.findByPk(req.params.ID)
        .then(data => {
            res.json(data || []);
        }).catch(err => {
            console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
        });
});

route.post('/form', function (req, res, next) {
    mainModel.create(req.body)
        .then(data => {
            res.json({
                resultBack: `ID: ${data.id}) - Створено у БД`,
                data: data || []
            });
        }).catch(err => {
            console.log(`Error for while making create for advertising=>post=>/form/. Error log: ${err}`);
        });
});

route.put('/form', function (req, res, next) {
    mainModel.findByPk(req.body.id)
        .then(data => {
            data.update(req.body)
                .then(data => {
                    res.json({
                        resultBack: `ID: ${req.body.id}) - Оновлено у бази даних`,
                        data: data
                    });
                }).catch(err => {
                    console.log(`Error for while making update for advertising=>put=>/form. Error log: ${err}`);
                });
        }).catch(err => {
            console.log(`Error for while making findByPk for advertising=>put=>/form. Error log: ${err}`);
        });
});

route.delete('/form', function (req, res, next) {
    mainModel.destroy({
        where: {
            id: req.body.id
        }
    }).then(data => {
        res.json({
            resultBack: `ID: ${req.body.id}) - Видалені дані`,
        })
    }).catch(err => {
        console.log(`Error for while making delete for advertising=>put=>/form. Error log: ${err}`);
    });
});
// =======================================

route.get('/preview', function(req, res, next) {
    mainModel.findAll({
        where: {
            isOnline: true
        },
        order: [['date', 'DESC']],
        limit: 3,
        include: [{
            model: CategoryModel
        }]
    }).then(videos => {
        res.json(videos);
    }).catch(err => {
        console.log(err);
    });
});

route.get('/categories', function(req, res, next) {
    let categoryLength = 0;
    let readyLength = 0;
    const categoriesRes = [];

    const getVideos = (cat) => {
        mainModel.findAll({
            where: {
                categoryID: cat.id,
                isOnline: true
            },
            limit: 1
        }).then(articlesData => {
            readyLength++;
            if (articlesData.length) {
                categoriesRes.push(cat);
            }
            if (readyLength === categoryLength) {
                categoriesRes.sort((one, two) => {
                    if(one.eng < two.eng) { return -1; }
                    if(one.eng > two.eng) { return 1; }
                    return 0;
                });
                res.json(categoriesRes);
            }
        });
    }

    CategoryModel.findAll({
        order: [['ukr', 'ASC']]
    }).then(categories => {
        categoryLength = categories.length;
        categories.forEach(cat => getVideos(cat))
    });
});

route.get('/length', function(req, res, next) {
    mainModel
    .count({
        where: {
            isOnline: true
        }
    })
    .then(count => {
        res.json({
            videosLength: count
        });
    });
});

route.get('/length/:categoryID', function(req, res, next) {
    if (!req.params.categoryID) {
        return res.json({
            videosLength: 0
        });
    }

    mainModel.count({
        where: {
            categoryID: req.params.categoryID,
            isOnline: true
        }
    }).then(count => {
        res.json({
            videosLength: count
        });
    })
});

route.get('/:id', function(req, res, next) {
    const ID = req.params.id;

    mainModel.findByPk(ID, {
        include: [{
            model: CategoryModel
        }]
    }).then(video => {
        res.json(video);
    }).catch(err => {
        console.log(err);
    });
});

route.post('/', function(req, res, next) {
    const page = req.body.page ? req.body.page : 1;

    mainModel.findAll({
        where: {
            isOnline: true
        },
        order: [['date', 'DESC']],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        include: [{
            model: CategoryModel
        }]
    }).then(videos => {
        res.json(videos);
    }).catch(err => {
        console.log(err);
    });
});

route.post('/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;
    const page = req.body.page ? req.body.page : 1;

    mainModel.findAll({
        where: {
            categoryID: categoryID,
            isOnline: true
        },
        order: [['date', 'DESC']],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        include: [{
            model: CategoryModel
        }]
    }).then(videos => {
        res.json(videos);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = route;
