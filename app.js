const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const authorsRoute = require('./routes/authors');
const categoriesRoute = require('./routes/categories');
const recomendationRoute = require('./routes/recomendation');
const videosRoute = require('./routes/videos');
const newsRoute = require('./routes/news');
const articlesRoute = require('./routes/articles');
const externalRoute = require('./routes/external');
const adminRoute = require('./routes/admin');
const eventRoute = require('./routes/events');
const organizationRoute = require('./routes/organizations');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

app.use('/authors', authorsRoute);
app.use('/categories', categoriesRoute);
app.use('/recomendations', recomendationRoute);
app.use('/videos', videosRoute);
app.use('/news', newsRoute);
app.use('/articles', articlesRoute);
app.use('/external', externalRoute);
app.use('/admin', adminRoute);
app.use('/events', eventRoute);
app.use('/organizations', organizationRoute);

const server = http.createServer(app);

const saveDefaultNews = require('./defaultData/News');
const saveDefaultVideos = require('./defaultData/Videos');
// const saveDefaultCategories = require('./defaultData/Categories');
const saveDefaultArticles = require('./defaultData/Articles');
const saveDefaultOrganizations = require('./defaultData/Organizations');
const saveDefaultEvent = require('./defaultData/Events');
// const saveDefaultJournals = require('./defaultData/Journals');
// const saveDefaultAuthors = require('./defaultData/Authors');
const saveDefaultRecomendation = require('./defaultData/Recomendation');
const saveDefaultImg = require('./defaultData/Imgs');
const saveDefaultFile = require('./defaultData/File');
const saveDefaultReference = require('./defaultData/Reference');

mongoose.connect('mongodb+srv://Myron:1tSbcA6nBDv1zNmM@cluster0.yqkcs.mongodb.net/<dbname>?retryWrites=true&w=majority')
    .then(result => {
        // console.log(mongoose.models);
        server.listen(8080);
        // saveDefaultNews();
        // saveDefaultVideos();
        // saveDefaultCategories();
        // saveDefaultArticles();
        // saveDefaultOrganizations();
        // saveDefaultEvent();
        // saveDefaultJournals();
        // saveDefaultAuthors();
        // saveDefaultRecomendation();
        // saveDefaultImg();
        // saveDefaultFile();
        // saveDefaultReference();
    })
    .catch(err => {
        console.log(err);
    })
