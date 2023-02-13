const express = require('express');
const route = express.Router();
const mainModel = require('../models/Recomendation');
const CategoryModel = require('../models/Category');
const FileModel = require('../models/File');
const RecomendationCategory = require('../models/submodels/RecomendationCategory');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

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
    mainModel.findAll({})
        .then(data => {
            res.json(data || []);
        })
        .catch(err => {
            console.log(`Error for while making findAll for advertising=>get=>/form. Error log: ${err}`);
        })
});

route.get('/form/:ID', function (req, res, next) {
    mainModel.findByPk(req.params.ID, {
        include: [
            {
                model: CategoryModel,
                attributes: ['id']
            }
        ]
    }).then((recomendation) => {
        const RecomendationJSONObj = recomendation.get();

        if (RecomendationJSONObj.Categories.length) {
            RecomendationJSONObj.categoryIDs = RecomendationJSONObj.Categories.map(author => author.id);
            delete RecomendationJSONObj.Categories;
        }

        return RecomendationJSONObj;
    }).then(data => {
        res.json(data || []);
    }).catch(err => {
        console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
    });
});

route.post('/form', function (req, res, next) {
    const body = req.body;

    const finalPart = (data) => {
        mainModel.findByPk(data.id, {
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id']
                }
            ]
        }).then(recomendation => {
            const RecomendationJSONObj = recomendation.get();

            if (RecomendationJSONObj.Categories.length) {
                RecomendationJSONObj.categoryIDs = RecomendationJSONObj.Categories.map(author => author.id);
                delete RecomendationJSONObj.Categories;
            }

            return RecomendationJSONObj;
        }).then(ArticleJSONObj => {
            res.json({
                resultBack: `ID: ${data.id}) - Оновлено у бази даних`,
                data: ArticleJSONObj
            })
        }).catch(err => {
            console.log(err);
        }).catch(err => {
            console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
        });
    };

    mainModel.create(body).then(data => {
        const categories = 'categoryIDs' in body && body.categoryIDs && body.categoryIDs.split(',').filter(author => author && author !== 'undefined');
        if (categories && categories.length) {
            data.addCategories(categories).then(() => {
                finalPart(data);
            });

            return;
        }

        res.json({
            resultBack: `ID: ${data.id}) - Створено у БД`,
            data: data || []
        });
    }).catch(err => {
        console.log(`Error for while making findByPk for advertising=>put=>/form. Error log: ${err}`);
    });
});

route.put('/form', function (req, res, next) {
    const body = req.body;

    const mainPart = () => {
        mainModel.findByPk(body.id, {
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id']
                }
            ]
        }).then((recomendation) => {
            const RecomendationJSONObj = recomendation.get();

            if (RecomendationJSONObj.Categories.length) {
                RecomendationJSONObj.categoryIDs = RecomendationJSONObj.Categories.map(author => author.id);
                delete RecomendationJSONObj.Categories;
            }

            return RecomendationJSONObj;
        }).then(data => {
            res.json(data || []);
        }).catch(err => {
            console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
        });
    }

    mainModel.findByPk(body.id).then(data => {
        data.update(body).then(data => {
            RecomendationCategory.destroy({
                where: {
                    RecomendationId: body.id
                }
            }).then(() => {
                const categories = 'categoryIDs' in body && body.categoryIDs && body.categoryIDs.split(',').filter(author => author && author !== 'undefined');
                if (categories && categories.length) {
                    return data.addCategories(categories).catch(error => console.log(error));
                }
            }).then(mainPart)
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
            data: {...req.body, ...{id: ''}}
        })
    }).catch(err => {
        console.log(`Error for while making delete for advertising=>put=>/form. Error log: ${err}`);
    });
});
// =======================================

route.get('/preview', function(req, res, next) {
    const previewRecomendation = [];
    let categoryLength = 0;
    let counter = 0;

    const getRecomendation = (cat) => {
        mainModel.findAll({
            where: {
                isOnline: true
            },
            order: [['date', 'DESC']],
            include: [
                {
                    model: FileModel
                },
                {
                    model: CategoryModel,
                    required: true,
                    through: {
                        where: {
                            CategoryId: cat.id
                        }
                    }
                }
            ],
            attributes: ['id', 'text', 'date'],
            limit: 3
        }).then(recomendations => {
            if (recomendations.length) {
                const newData = {
                    category: cat,
                    recomendations: recomendations
                }
                previewRecomendation.push(newData);
            }
        }).then(() => {
            if (++counter === categoryLength) {
                previewRecomendation.sort((one, two) => {
                    if(one.category.eng < two.category.eng) { return -1; }
                    if(one.category.eng > two.category.eng) { return 1; }
                    return 0;
                });

                res.json(previewRecomendation.slice(0, 3));
            }
        });
    }

    CategoryModel.findAll({
        order: [['ukr', 'ASC']]
    }).then(categories => {
        categoryLength = categories.length;
        categories.forEach(cat => getRecomendation(cat))
    })
});

route.get('/categories', function(req, res, next) {
    let categoryLength = 0;
    let readyLength = 0;
    const categoriesRes = [];

    const getRecomendation = (cat) => {
        mainModel.findAll({
            where: {
                isOnline: true
            },
            include: [
                {
                    model: CategoryModel,
                    required: true,
                    through: {
                        where: {
                            CategoryId: cat.id
                        }
                    }
                }
            ],
            limit: 1
        }).then(articlesData => {
            readyLength++;
            if (articlesData.length) {
                categoriesRes.push(cat);
            }
            if (readyLength === categoryLength) {
                res.json(categoriesRes);
            }
        })
    }

    CategoryModel.findAll({
        order: [['ukr', 'ASC']]
    }).then(categories => {
        categoryLength = categories.length;
        categories.forEach(cat => getRecomendation(cat))
    })
});

// route.get('/length/:categoryID', function(req, res) {
// 	const categoryID = req.params.categoryID;

// 	if (categoryID === 'all') {
// 		mainModel.count({where: {isOnline: true}}).then(count => {
// 			res.json({
// 				recomendationLength: 1
// 			});
// 		})
// 	} else {
// 		mainModel.count({
// 			where: {
// 				isOnline: true
// 			},
// 			include: [
// 				{
// 					model: CategoryModel,
//                     required: true,
//                     through: {
//                         where: {
//                             CategoryId: categoryID
//                         }
//                     }
// 				}
// 			]
// 		}).then(count => {
// 			res.json({
// 				recomendationLength: count
// 			});
// 		})
// 	}
// });

route.post('/all', function(req, res) {
    const recomendationCategoriesLength = [];

    const saveCategoriesLength = (cat, maxLength) => {
        mainModel.findAll({
            where: {
                isOnline: true
            },
            order: [['date', 'DESC']],
            include: [
                {
                    model: FileModel
                },
                {
                    model: CategoryModel,
                    required: true,
                    through: {
                        where: {
                            CategoryId: cat.id
                        }
                    }
                }
            ]
        }).then(recomendations => {
            recomendationCategoriesLength.push({
                category: cat,
                recomendations: recomendations
            });
        }).then(() => {
            if (recomendationCategoriesLength.length === maxLength) {
                const result = recomendationCategoriesLength.filter(recObj => recObj.recomendations.length);
                res.json(result);
            }
        });
    }

    CategoryModel.findAll({
        order: [['ukr', 'ASC']]
    }).then(categories => {
        categoryLength = categories ? categories.length : 0;
        for (let i = 0; i < categories.length; i++) {
            saveCategoriesLength(categories[i], categories.length);
        }
    });
});

route.post('/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;

    mainModel.findAll({
        where: {
            isOnline: true
        },
        order: [['date', 'DESC']],
        include: [
            {
                model: FileModel
            },
            {
                model: CategoryModel,
                required: true,
                through: {
                    where: {
                        CategoryId: categoryID
                    }
                }
            }
        ]
    }).then(recomendations => {
        res.json(recomendations);
    });
});

module.exports = route;