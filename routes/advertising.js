const express = require('express');
const route = express.Router();
const mainModel = require('../models/Advertising');
const FotoModel = require('../models/Foto');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

route.get('/sub', function(req, res, next) {
    mainModel
        .findAll({
            limit: 1,
        })
        .then(data => {
            res.json(data[0].id);
        })
        .catch(err => {
            console.log(err);
        });

    return;
});

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
        options.where[req.body.searchName] = req.body.searchValue;
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
        }).catch(err => {
            console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
        })
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
    res.json({
        resultBack: `Видалення не підтримується - функціоналу немає`,
    })
});
// =======================================


route.get('/:ID', function(req, res, next) {
    const advertisingID = req.params.ID;

    mainModel.findAll({
        where: {
            id: advertisingID,
            isOnline: true
        },
        include: [{
            model: FotoModel,
            attributes: ['id', 'imgSrc', 'imgAlt']
        }]
    }).then(data => {
        data = data ? data : [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            if (item.Foto.imgSrc.indexOf(':') === -1) {
                item.Foto.imgSrc = process.env.host + item.Foto.imgSrc;
            }
        }
        const result = data.length ? data[0] : {};
        res.json(result);
    }).catch(err => {
        console.log(err);
    });

    return;
});

module.exports = route;
