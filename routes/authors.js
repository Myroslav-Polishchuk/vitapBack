const express = require('express');
const route = express.Router();
const sequelize = require('sequelize');
const { Op } = require("sequelize");

const ArticleModel = require('../models/Article');
const mainModel = require('../models/Author');
const JournalModel = require('../models/Journal');
const ArticleAuthorSubModel = require('../models/submodels/ArticleAuthor');

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
        where: {},
        order: [['id', 'DESC']]
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
    mainModel.findAll()
        .then(data => {
            res.json(data || []);
        })
        .catch(err => {
            console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
        })
});

route.get('/form/:ID', function (req, res, next) {
    mainModel.findByPk(req.params.ID)
        .then(data => {
            res.json(data || []);
        })
        .catch(err => {
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
        })
        .catch(err => {
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
                    })
                })
                .catch(err => {
                    console.log(`Error for while making update for advertising=>put=>/form. Error log: ${err}`);
                });
        })
        .catch(err => {
            console.log(`Error for while making findByPk for advertising=>put=>/form. Error log: ${err}`);
        });
});

route.delete('/form', function (req, res, next) {
    ArticleAuthorSubModel.count({
        where: {
            AuthorId: req.body.id
        }
    }).then(result => {
        if (result) {
            res.json({
                resultBack: `Видалення не можливе - автор має статті`,
            });
        } else {
            mainModel.destroy({
                where: {
                    id: req.body.id
                }
            }).then(() => {
                res.json({
                    resultBack: `Видалено`,
                });
            })
        }
    });
});
// =======================================

route.get('/', function(req, res, next) {
    mainModel
        .findAll({})
        .then(data => {
            res.json(data);
            next();
        })
        .catch(err => {
            console.log(err)
        });
})

route.get('/length/:authorID', function(req, res, next) {
    ArticleAuthorSubModel
        .count({
            where: {
                AuthorId: req.params.authorID
            }
        })
        .then(count => {
            res.json({
                length: count
            });
        })
        .catch(err => {
            console.log(err)
        });
});

route.get('/author/:authorID', function(req, res, next) {
    mainModel
        .findByPk(req.params.authorID)
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
    const page = req.body.page ? req.body.page : 1;

    mainModel.findByPk(req.params.authorID, {
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        include: {
            model: ArticleModel,
            include: [
                {
                    model: mainModel
                },
                {
                    model: JournalModel
                }
            ],
            attributes: ['id', 'main_title']
        }
    })
    .then(data => {
        res.json(data.Articles);
        next();
    })
    .catch(err => {
        console.log(err)
    })
});

route.get('/:letter', function(req, res, next) {
    mainModel
        .findAll({
            where: {
                secondName: {
                    [sequelize.Op.regexp]: `^${req.params.letter}`
                }
            }
        })
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