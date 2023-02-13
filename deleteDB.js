const sequelize = require('./models/allModels');

const AdvertisingModel = require('./models/Advertising');
const ArticleModel = require('./models/Article');
const AuthorModel = require('./models/Author');
const CategoryModel = require('./models/Category');
const EventModel = require('./models/Event');
const JournalModel = require('./models/Journal');
const NewsModel = require('./models/News');
const OrganizationModel = require('./models/Organization');
const RecomendationModel = require('./models/Recomendation');
const VideoModel = require('./models/Video');
const FotosModel = require('./models/Foto');
const FilesModel = require('./models/File');

const ArticleAuthor = require('./models/submodels/ArticleAuthor');
const NewsImgs = require('./models/submodels/NewsImgs');
const ArticleReference = require('./models/submodels/ArticleReference');

const deleteDB = () => {
    Promise
        .all([
            ArticleAuthor.drop(),
            NewsImgs.drop(),
            ArticleReference.drop()
        ])
        .then(() => {
            Promise
                .all([
                    ArticleModel.drop(),
                    VideoModel.drop(),
                    RecomendationModel.drop()
                ])
                .then(() => {
                    Promise
                        .all([
                            NewsModel.drop(),
                            EventModel.drop(),
                            CategoryModel.drop(),
                            OrganizationModel.drop(),
                            AdvertisingModel.drop()
                        ])
                        .then(() => {
                            Promise
                                .all([
                                    FotosModel.drop(),
                                    AuthorModel.drop(),
                                    JournalModel.drop(),
                                    FilesModel.drop()
                                ])
                                .then(() => {
                                    setTimeout(() => {
                                        sequelize
                                            .close()
                                            .then(() => {
                                                console.log('sequelize closed!');
                                            })
                                            .catch(err => {
                                                console.log('error - sequelize not closed!');
                                                console.log(err);
                                            })
                                    }, 10000)
                                })
                        })
                }) 
        })
}

sequelize
    .sync({force: true})
    .then(() => {
        deleteDB();
    })
    .catch(error => {
        console.log(error);
    });