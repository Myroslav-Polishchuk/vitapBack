const express = require('express');
const route = express.Router();
const sequelize = require('sequelize');
const { Op } = require("sequelize");

const mainModel = require('../models/Article');

const CategoryModel = require('../models/Category');
const JournalModel = require('../models/Journal');
const AuthorModel = require('../models/Author');
const FotoModel = require('../models/Foto');
const FileModel = require('../models/File')
const AdvertisingModel = require('../models/Advertising')
const ArticleAuthor = require('../models/submodels/ArticleAuthor');
const ArticleCategory = require('../models/submodels/ArticleCategory');

const utils = require('../models/utils');

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

route.get('/form/:ID', function (req, res, next) {
    mainModel.findByPk(req.params.ID, {
        include: [
            {
                model: AuthorModel,
                attributes: ['id']
            },
            {
                model: CategoryModel,
                attributes: ['id']
            }
        ],
        order: [[AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']]
    }).then(article => {
        const ArticleJSONObj = article.get();
        if (ArticleJSONObj.Authors.length) {
            ArticleJSONObj.meta_authors = ArticleJSONObj.Authors.map(author => author.id);

            delete ArticleJSONObj.Authors;
        }

        if (ArticleJSONObj.Categories.length) {
            ArticleJSONObj.categoryIDs = ArticleJSONObj.Categories.map(author => author.id);
            delete ArticleJSONObj.Categories;
        }

        return ArticleJSONObj;
    }).then(ArticleJSONObj => {
        res.json(ArticleJSONObj);
    }).catch(err => {
        console.log(err);
    }).catch(err => {
        console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
    });
});

route.post('/form', function (req, res, next) {
    const finalPart = (data) => {
        mainModel.findByPk(data.id, {
            include: [
                {
                    model: AuthorModel,
                    attributes: ['id']
                },
                {
                    model: CategoryModel,
                    attributes: ['id']
                }
            ],
        }).then(article => {
            const ArticleJSONObj = article.get();
            if (ArticleJSONObj.Authors.length) {
                ArticleJSONObj.meta_authors = ArticleJSONObj.Authors.map(author => author.id);

                delete ArticleJSONObj.Authors;
            }

            if (ArticleJSONObj.Categories.length) {
                ArticleJSONObj.categoryIDs = ArticleJSONObj.Categories.map(author => author.id);
                delete ArticleJSONObj.Categories;
            }

            return ArticleJSONObj;
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

    const body = req.body;
    mainModel.create(body).then(data => {
        const authors = 'meta_authors' in body && body.meta_authors && body.meta_authors.split(',').filter(author => author && author !== 'undefined');
        const categories = 'categoryIDs' in body && body.categoryIDs && body.categoryIDs.split(',').filter(author => author && author !== 'undefined');
        if (authors && authors.length) {
            authors.forEach((author, index) => {
                data.addAuthor(author, {
                    through: {
                        sortPosition: index + 1
                    }
                }).catch(e => {
                    console.log('post -> article addAuthor -> Error: ' + e);
                })
            });

            if (categories && categories.length) {
                data.addCategories(categories).then(() => {
                    finalPart(data);
                });
            } else {
                finalPart(data);
            }

            return
        } else if (categories && categories.length) {
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
        console.log(`Error for while making create for advertising=>post=>/form/. Error log: ${err}`);
    });
});

route.put('/form', function (req, res, next) {
    const body = req.body;

    const mainPart = () => {
        mainModel.findByPk(body.id, {
            include: [
                {
                    model: AuthorModel,
                    attributes: ['id']
                },
                {
                    model: CategoryModel,
                    attributes: ['id']
                }
            ]
        }).then(article => {
            const ArticleJSONObj = article.get();
            if (ArticleJSONObj.Authors.length) {
                ArticleJSONObj.meta_authors = ArticleJSONObj.Authors.map(author => author.id);

                delete ArticleJSONObj.Authors;
            }

            if (ArticleJSONObj.Categories.length) {
                ArticleJSONObj.categoryIDs = ArticleJSONObj.Categories.map(author => author.id);
                delete ArticleJSONObj.Categories;
            }

            return ArticleJSONObj;
        }).then(ArticleJSONObj => {
            res.json({
                resultBack: `ID: ${body.id}) - Оновлено у бази даних`,
                data: ArticleJSONObj
            });
        }).catch(err => {
            console.log(err);
        }).catch(err => {
            console.log(`Error for while making findByPK for advertising=>get=>/form/:ID. Error log: ${err}`);
        });
    };

    mainModel.findByPk(body.id).then(data => {
        data.update(body).then(data => {
            ArticleAuthor.destroy({
                where: {
                    ArticleId: body.id
                }
            }).then((length) => {
                const authors = 'meta_authors' in body && body.meta_authors && body.meta_authors.split(',').filter(author => author && author !== 'undefined');
                if (authors && authors.length) {
                    authors.forEach((author, index) => {
                        data.addAuthor(author, {
                            through: {
                                sortPosition: index + 1
                            }
                        }).catch(e => {
                            console.log('put -> article addAuthor -> Error: ' + e)
                        })
                    });
                    return;
                }
            }).then(() => {
                return ArticleCategory.destroy({
                    where: {
                        ArticleId: body.id
                    }
                }).then(() => {
                    const categories = 'categoryIDs' in body && body.categoryIDs && body.categoryIDs.split(',').filter(author => author && author !== 'undefined');
                    if (categories && categories.length) {
                        return data.addCategories(categories).catch(error => console.log(error));
                    }
                })
            }).then(mainPart)
        }).catch(err => {
            console.log(`Error for while making update for advertising=>put=>/form. Error log: ${err}`);
        });
    }).catch(err => {
        console.log(`Error for while making findByPk for advertising=>put=>/form. Error log: ${err}`);
    });
});

route.delete('/form', function (req, res, next) {
    ArticleAuthor.destroy({
        where: {
            ArticleId: req.body.id
        }
    }).then(() => {
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
    })
});
// =======================================

route.post('/article/also', function(req, res, next) {
    const ignoreArticleID = req.body.ignoreArticleID;
    const categoryID = req.body.categoryID;

    mainModel.findAll({
        where: {
            id: {
                [sequelize.Op.ne]: ignoreArticleID
            },
        },
        order: [['date', 'DESC']],
        limit: 3,
        attributes: ['id', 'main_title', 'date'],
        include: [
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
    }).then((article) => {
        res.json(article);
        next();
    });
});

route.get('/article/preview/:articleID', function(req, res, next) {
    const articleID = req.params.articleID;

    mainModel.findAll({
        where: {
            id: articleID,
        },
        include: [
            {
                model: CategoryModel
            },
            {
                model: JournalModel
            },
            {
                model: AuthorModel
            },
            {
                model: AdvertisingModel
            },
            {
                model: FileModel
            }
        ],
        order: [[AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']]
    }).then((article) => {
        if (article.length) {
            res.json(article[0]);
        }
    });
});

route.get('/article/:articleID', function(req, res, next) {
    const articleID = req.params.articleID;

    mainModel.findAll({
        where: {
            id: articleID,
            isOnline: true
        },
        include: [
            {
                model: CategoryModel
            },
            {
                model: JournalModel
            },
            {
                model: AuthorModel
            },
            {
                model: AdvertisingModel
            },
            {
                model: FileModel
            }
        ],
        order: [[AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']]
    }).then((article) => {
        if (article.length) {
            res.json(article[0]);
        }
    });
});

route.get('/categories', function(req, res, next) {
    let categoryLength = 0;
    let readyLength = 0;
    const categoriesRes = [];

    const getArticles = (cat) => {
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
            if (articlesData.length) {
                categoriesRes.push(cat);
            }
        }).then(() => {
            if (++readyLength === categoryLength) {
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
        order: [['sortPositionArticleBlock', 'ASC']]
    }).then(categories => {
        categoryLength = categories.length;
        categories.forEach(cat => getArticles(cat))
    })
});

route.get('/preview', function(req, res, next) {
    const previewArticles = [];
    let readyLength = 0;

    const getArticles = (cat) => {
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
            order: [['date', 'DESC']],
            limit: 3,
            attributes: ['id', 'main_title', 'isOnline', 'date']
        }).then(articlesData => {
            const data = {
                category: cat,
                articles: articlesData
            };
            previewArticles.push(data);
            if (previewArticles.length === readyLength) {
                res.json(utils.sortArticlesByCategories(previewArticles));
            }
        })
    }

    CategoryModel.findAll({}).then(categories => {
        readyLength = categories.length;
        categories.forEach(cat => getArticles(cat));
    }).catch(err => console.log(err));
})

route.get('/length/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;

    mainModel.count({
        where: {
            isOnline: true
        },
        include: [
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
    }).then(count => {
        res.json({
            articlesLength: count
        });
    })
})

route.get('/preview/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;

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
                        CategoryId: categoryID
                    }
                }
            },
            {
                model: JournalModel
            },
            {
                model: AuthorModel
            }
        ],
        order: [
            ['date', 'DESC'],
            [AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']
        ],
        attributes: ['id', 'main_title', 'isOnline', 'date']
    }).then(data => {
        res.json(data);
        next();
    }).catch(err => {
        console.log(err);
    })
})

route.post('/preview/:categoryID', function(req, res, next) {
    const categoryID = req.params.categoryID;
    const page = req.body.page ? req.body.page : 1;

    mainModel.findAll({
        where: {
            isOnline: true
        },
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
        attributes: ['id', 'main_title', 'isOnline', 'date'],
        include: [
            {
                model: CategoryModel,
                required: true,
                through: {
                    where: {
                        CategoryId: categoryID
                    }
                }
            },
            {
                model: JournalModel
            },
            {
                model: AuthorModel,
            }
        ],
        order: [
            ['date', 'DESC'],
            [AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']
        ]
    }).then(data => {
        res.json(data);
        next();
    }).catch(err => {
        console.log(err);
    })
});

route.post('/search', function(req, res, next) {
    const queryArr = req.body.query ? req.body.query.split(' ') : [];
    if (queryArr.length === 0) {
        return next();
    }

    const page = req.body.page ? req.body.page : 1;
    getSearchResultData(queryArr, page, res);
});

async function getSearchResultData(queryArr, page, res) {
    const main_titleArr = queryArr.map((item => {
        return {
            main_title: {
                [Op.like]: `%${item}%`
            }
        }
    }));

    const resume_keywordsArr = queryArr.map((item => {
        return {
            resume_keywords: {
                [Op.like]: `%${item}%`
            }
        }
    }));

    let count = 0;
    try {
        count = await mainModel.count({
            where: {
                isOnline: true,
                [Op.or]: [
                    ...main_titleArr,
                    ...resume_keywordsArr
                ]
            }
        });
    } catch (error) {
        console.error('помилка', e);
    }

    if (count === 0) {
        res.json({count: count, searchResults: []});
        return;
    }

    let searchResults = [];
    try {
        searchResults = await mainModel.findAll({
            where: {
                isOnline: true,
                [Op.or]: [
                    ...main_titleArr,
                    ...resume_keywordsArr
                ]
            },
            offset: (page - 1) * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
            include: [
                {
                    model: JournalModel,
                    attributes: ['id', 'url', 'name']
                },
                {
                    model: AuthorModel,
                    attributes:['id', 'firstName', 'secondName', 'thirdName', 'workplace'],
                    through: {
                        attributes: ['id', 'sortPosition', 'ArticleId', 'AuthorId']
                    }
                }
            ],
            order: [
                ['date', 'DESC'],
                [AuthorModel, ArticleAuthor, 'sortPosition', 'ASC']
            ],
            attributes: ['id', 'main_title', 'isOnline', 'date']
        });
    } catch (error) {
        console.error('помилка', error);
    }

    res.json({
        count: count,
        searchResults: searchResults
    });
}

module.exports = route;
