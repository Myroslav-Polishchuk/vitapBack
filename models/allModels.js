const Sequelize = require('sequelize');

const Advertising = require('./Advertising');
const Author = require('./Author');
const Article = require('./Article');
const Category = require('./Category');
const Event = require('./Event');
const File = require('./File');
const Foto = require('./Foto');
const Journal = require('./Journal');
const News = require('./News');
const Organization = require('./Organization');
const Recomendation = require('./Recomendation');
const Video = require('./Video');
const OrderHomePage = require('./OrderHomePage');
const AdvertisingPlace = require('./AdvertisingPlace');

const ArticleAuthor = require('./submodels/ArticleAuthor');
const ArticleCategory = require('./submodels/ArticleCategory');
const RecomendationCategory = require('./submodels/RecomendationCategory');

Advertising.belongsTo(Foto, {foreignKey: {
    name: 'imgID',
    type: Sequelize.INTEGER
}});

Event.belongsTo(Foto, {foreignKey: {
    name: 'imgID',
    type: Sequelize.INTEGER
}});

Organization.belongsTo(Foto, {foreignKey: {
    name: 'imgID',
    type: Sequelize.INTEGER
}});

Recomendation.belongsTo(File, {foreignKey: {
    name: 'fileID',
    type: Sequelize.INTEGER
}});

Recomendation.belongsToMany(Category, { through: RecomendationCategory });
Category.belongsToMany(Recomendation, { through: RecomendationCategory });

Article.belongsTo(Journal, {foreignKey: {
    name: 'journalID',
    type: Sequelize.INTEGER
}});

Article.belongsToMany(Category, { through: ArticleCategory });
Category.belongsToMany(Article, { through: ArticleCategory });

Article.belongsTo(Advertising, {foreignKey: {
    name: 'advertisingID',
    type: Sequelize.INTEGER
}});

Article.belongsTo(File, {foreignKey: {
    name: 'fileID',
    type: Sequelize.INTEGER
}});

Video.belongsTo(Category, {foreignKey: {
    name: 'categoryID',
    type: Sequelize.INTEGER
}});

Article.belongsToMany(Author, { through: ArticleAuthor });
Author.belongsToMany(Article, { through: ArticleAuthor});
News.belongsTo(Foto, {
    as: 'mainImg',
    foreignKey: {
        name: 'imgID',
        type: Sequelize.INTEGER
    }
})

module.exports = require('../util/database');