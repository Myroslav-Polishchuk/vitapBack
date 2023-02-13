const express = require('express');
const sequelize = require('sequelize');

const route = express.Router();

const FotoModel = require('../models/Foto');
const mainModel = require('../models/News');
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

route.get('/length', function(req, res, next) {
    mainModel.count({where: {
        isOnline: true
    }}).then(count => {
        res.json({
            newsLength: count
        });
    });
});

route.get('/main', function(req, res, next) {
    mainModel.findAll({
        where: {
            isOnline: true,
            isMainNews: true
        },
        order: [['date', 'DESC']],
        include: [
            // {
            //     model: FotoModel,
            //     as: 'fotos',
            //     attributes: ['id', 'imgSrc', 'imgAlt']
            // },
            {
                model: FotoModel,
                as: 'mainImg'
            }
        ],
        limit: 1,
        attributes: ['id', 'title', 'previewText', 'date']
    }).then(news => {
        var oneNew = news[0];
        if (oneNew && oneNew.Foto) {
            let imgs = oneNew.Foto;
            for (let i = 0; i < imgs.length; i++) {
                let item = imgs[i];
                if (item.imgSrc.indexOf(':') === -1) {
                    item.imgSrc = process.env.host + item.Foto.imgSrc;
                }
            }
        }
        res.json(oneNew);
    }).catch(err => {
        console.log(err);
    });

    return;
})

route.get('/preview/:ignoreNewsID', function(req, res, next) {
    const ignoreNewsID = req.params.ignoreNewsID;

    mainModel.findAll({
        where: {
            isOnline: true,
            isMainNews: false,
            id: {
                [sequelize.Op.ne]: ignoreNewsID
            }
        },
        order: [['date', 'ASC']],
        // include: [{
        //     model: FotoModel,
        //     as: 'fotos',
        //     attributes: ['id', 'imgSrc', 'imgAlt']
        // }],
        attributes: ['id', 'title', 'date'],
        limit: 4
    }).then(news => {
        var imgs = news.Foto;
        if (imgs) {
            for (let i = 0; i < imgs.length; i++) {
                let item = imgs[i];
                if (item.imgSrc.indexOf(':') === -1) {
                    item.imgSrc = process.env.host + item.Foto.imgSrc;
                }
            }
        }
        res.json(news);
    }).catch(err => {
        console.log(err);
    });

    return;
});

route.get('/:newsID', function(req, res, next) {
    const newsID = req.params.newsID;

    mainModel.findByPk(newsID, {
        // include: [{
        //     model: FotoModel,
        //     as: 'fotos',
        //     attributes: ['id', 'imgSrc', 'imgAlt']
        // }]
    }).then(news => {
        // var imgs = news.Foto;
        // if (imgs) {
        //     for (let i = 0; i < imgs.length; i++) {
        //         let item = imgs[i];
        //         if (item.imgSrc.indexOf(':') === -1) {
        //             item.imgSrc = process.env.host + item.Foto.imgSrc;
        //         }
        //     }
        // }

        res.json(news);
    }).catch(err => {
        console.log(err);
    });

    return;
});

route.post('/', function(req, res, next) {
    const page = req.body.page ? req.body.page : 1;

    mainModel.findAll({
        where: {
            isOnline: true
        },
        order: [['date', 'DESC']],
        // include: [{
        //     model: FotoModel,
        //     as: 'fotos',
        //     attributes: ['id', 'imgSrc', 'imgAlt']
        // }],
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        attributes: ['title', 'id', 'date']
    }).then(news => {
        var imgs = news.Foto;
        if (imgs) {
            for (let i = 0; i < imgs.length; i++) {
                let item = imgs[i];
                if (item.imgSrc.indexOf(':') === -1) {
                    item.imgSrc = process.env.host + item.Foto.imgSrc;
                }
            }
        }
        res.json(news);
    }).catch(err => {
        console.log(err);
    });

    return;
});

module.exports = route;
