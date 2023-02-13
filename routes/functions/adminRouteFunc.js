const ArticleModel = require('../../models/Article');
const AuthorModel = require('../../models/Author');
const ArticleReference = require('../../models/submodels/ArticleReference');
const ArticleAuthor = require('../../models/submodels/ArticleAuthor');

const NewsModel = require('../../models/News');
const NewsImgsModel = require('../../models/submodels/NewsImgs');
const FotoModel = require('../../models/Foto');

function articlePUT(formData, res) {
    ArticleModel
        .findByPk(+formData.id)
        .then(article => {
            article
                .update(formData)
                .then(() => {
                    return ArticleAuthor.findAll({
                        where: {
                            ArticleId: +formData.id
                        }
                    })
                })
                .then(artAuthors => {
                    for (let i = 0; i < artAuthors.length; i++) {
                        artAuthors[i].destroy();
                    }

                    if (typeof formData.Authors === 'object') {
                        formData.Authors.forEach(authorID => {
                            AuthorModel
                                .findByPk(authorID)
                                .then(author => {
                                    article
                                        .addAuthor(author)
                                        .then(authorRef => console.log(authorRef))
                                        .catch(err => console.log(err));
                                })
                        });
                    } else if (typeof formData.Authors === 'string') {
                        AuthorModel
                            .findByPk(+formData.Authors)
                            .then(author => {
                                article
                                    .addAuthor(author)
                                    .then(authorRef => console.log(authorRef))
                                    .catch(err => console.log(err));
                            });
                    }

                    return article;
                })
                .then(refRes => {
                    console.log(refRes)
                })
                .catch(err => {
                    console.log(err)
                });

            return article;
        })
        .then(article => {
            ArticleReference
                .findAll({
                    where: {
                        ArticleId: article.id
                    }
                })
                .then(references => {
                    references.forEach(ref => {
                        ref.destroy();
                    })
                })
                .catch(err => console.log(err));

            return article;
        })
        .then(article => {
            if (typeof formData.ArticleReferences === 'object') {
                formData.ArticleReferences.forEach(reference => {
                    article
                        .createArticleReference({reference: reference})
                        .then(refRes => {
                            console.log(refRes)
                        })
                        .catch(err => {
                            console.log(err)
                        });
                });
            } else if (typeof formData.ArticleReferences === 'string') {
                article
                    .createArticleReference({reference: formData.ArticleReferences})
                    .then(refRes => console.log(refRes))
                    .catch(err => console.log(err));
            }

            return article;
        })
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            console.log(err);
        })
}

function articlePOST(formData, res) {
    ArticleModel
        .create(formData)
        .then(article => {
            if (typeof formData.ArticleReferences === 'object') {
                formData.ArticleReferences.forEach(reference => {
                    article
                        .createArticleReference({reference: reference})
                        .then(refRes => console.log(refRes))
                        .catch(err => console.log(err));
                });
            } else if (typeof formData.ArticleReferences === 'string') {
                article
                    .createArticleReference({reference: formData.ArticleReferences})
                    .then(refRes => console.log(refRes))
                    .catch(err => console.log(err));
            }

            return article;
        })
        .then(article => {
            if (typeof formData.Authors === 'object') {
                formData.Authors.forEach(authorID => {
                    AuthorModel
                        .findByPk(authorID)
                        .then(author => {
                            article
                                .addAuthor(author)
                                .then(authorRef => console.log(authorRef))
                                .catch(err => console.log(err));
                        })
                });
            } else if (typeof formData.Authors === 'string') {
                AuthorModel
                    .findByPk(+formData.Authors)
                    .then(author => {
                        article
                            .addAuthor(author)
                            .then(authorRef => console.log(authorRef))
                            .catch(err => console.log(err));
                    });
            }

            return article;
        })
        .then(article => {
            res.json(article);
        })
        .catch(err => {
            console.log(err);
        })
}

function articleGETbyID(ID, res) {
    ArticleModel
        .findByPk(ID, {
            include: [
                {
                    model: ArticleReference,
                    attributes: [['reference', 'value']]
                },
                {
                    model: AuthorModel,
                    attributes: ['id']
                }
            ]
        })
        .then(article => {
            const ArticleJSONObj = article.get();
            if (ArticleJSONObj.Authors.length) {
                ArticleJSONObj.Authors = ArticleJSONObj.Authors.map(author => author.id);
            }

            return ArticleJSONObj;
        })
        .then(ArticleJSONObj => {
            res.json(ArticleJSONObj);
        })
        .catch(err => {
            console.log(err);
        });
}

function articleDELETE(formData, res) {
    ArticleModel
        .findByPk(+formData.id)
        .then(article => {
            ArticleAuthor.destroy({
                where: {
                    ArticleId: article.id
                }
            })

            return article;
        })
        .then(article => {
            ArticleReference.destroy({
                where: {
                    ArticleId: article.id
                }
            })

            return article;
        })
        .then(article => {
            article.destroy();
        })
        .then(() => {
            res.json({success: true});
        })
        .catch(error => {
            console.log(error);
        })
}

function newsGetbyID(ID, res) {
    NewsModel
        .findByPk(+ID, {
            include: [
                {
                    model: FotoModel,
                    attributes: ['id']
                }
            ]
        })
        .then(news => {
            const NewsJSONObj = news.get();
            if (NewsJSONObj.Fotos.length) {
                NewsJSONObj.Fotos = NewsJSONObj.Fotos.map(foto => foto.id);
            }

            return NewsJSONObj;
        })
        .then(NewsJSONObj => {
            res.json(NewsJSONObj);
        })
        .catch(err => {
            console.log(err);
        });
}

function newsPOST(formData, res) {
    NewsModel
        .create(formData)
        .then(news => {
            news
                .addFotos(formData.Fotos)
                .then(result => {
                    console.log(result);
                    res.json(result);
                })
                .catch(err => {
                    console.log(err);
                });
        })
}

function newsPUT(formData, res) {
    NewsModel
        .findByPk(+formData.id)
        .then(news => {
            news
                .update(formData)
                .then(() => {
                    return NewsImgsModel.findAll({
                        where: {
                            NewsId: +formData.id
                        }
                    })
                })
                .then(newsFotos => {
                    for (let i = 0; i < newsFotos.length; i++) {
                        newsFotos[i].destroy();
                    }

                    news
                        .addFotos(formData.Fotos)
                        .then(result => {
                            console.log(result)
                        })
                        .catch(err => {
                            console.log(err)
                        });

                    return news;
                })
                .then(result => {
                    console.log(result)
                    res.json(result);
                })
                .catch(err => {
                    console.log(err)
                });
        });
}

function newsDELETE(formData, res) {
    NewsModel
        .findByPk(+formData.id)
        .then(news => {
            NewsImgsModel
                .destroy({
                    where: {
                        NewsId: news.id
                    }
                })
                .then(() => {
                    news
                        .destroy()
                        .then(() => {
                            res.json({success: true});
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
        })
}

module.exports = {
    articlePUT: articlePUT,
    articlePOST: articlePOST,
    articleGETbyID: articleGETbyID,
    articleDELETE: articleDELETE,
    newsGetbyID: newsGetbyID,
    newsPOST: newsPOST,
    newsPUT: newsPUT,
    newsDELETE: newsDELETE
}