const sequelize = require('./models/allModels');

const genArticles = require('./defaultData/Articles');
const genAuthors = require('./defaultData/Authors');
const genCategories = require('./defaultData/Categories');
const genEvents = require('./defaultData/Events');
const genFiles = require('./defaultData/File');
const genImgs = require('./defaultData/Imgs');
const genJournals = require('./defaultData/Journals');
const genNews = require('./defaultData/News');
const genOrganization = require('./defaultData/Organizations');
const genVideo = require('./defaultData/Videos');
const genRecomendation = require('./defaultData/Recomendation');
const genAdvertising = require('./defaultData/Advertising');

process.env.port = process.env.port || 8080;
process.env.host = `http://testback.fun/`;

const createDataDB = () => {
    Promise.all([genImgs(), genFiles(), genAuthors(), genJournals()])
        .then(() => {
            Promise
                .all([
                    genNews(),
                    genEvents(),
                    genCategories(),
                    genOrganization(),
                    genAdvertising()
                ])
                .then(() => {
                    Promise
                        .all([
                            genArticles(),
                            genVideo(),
                            genRecomendation()
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
}

sequelize
    .sync({force: true})
    .then(() => {
        createDataDB();
    })
    .catch(error => {
        console.log(error);
    });