// process.env.port = process.env.port || 8080;
// process.env.host = `http://localhost:${process.env.port}`;

process.env.port = process.env.port || 8080;
process.env.host = `http://testback.fun`;

const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const multer = require('multer');
const sequelize = require('./models/allModels');
// const createDataDB = require('./defaultData/createDataDB');
// const createReaclDataDB = require('./defaultData copy/createDataDB');

const fileStorageImg = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.originalUrl.indexOf('file') > -1) {
            cb(null, 'file');
        } else {
            cb(null, 'img');
        }
    },
    filename: (req, file, cb) => {
        var name = `${req.body.name}_${file.originalname}`;
        cb(null, name);
    }
});

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
const fileRoute = require('./routes/file');
const imgRoute = require('./routes/imgs');
const advertisingRoute = require('./routes/advertising');
const orderHomePageRoute = require('./routes/orderHomePage');
const articleReferenceRoute = require('./routes/articleReferences');
const advertisingPlacesRoute = require('./routes/advertisingPlaces');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorageImg}).fields(
    [
        { name: 'imgFile', maxCount: 1 },
        { name: 'file', maxCount: 1 }
    ]
));

app.use('/img', express.static(__dirname + '/img'));
app.use('/file', express.static(__dirname + '/file'));

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
app.use('/files', fileRoute);
app.use('/images', imgRoute);
app.use('/advertising', advertisingRoute);
app.use('/order', orderHomePageRoute);
app.use('/articlereference', articleReferenceRoute);
app.use('/advertisingplace', advertisingPlacesRoute);
app.use('/close/db', function(req, res, next) {
    sequelize.close();
});

const server = http.createServer(app);

sequelize
    .sync()
    .then(() => {
        server.listen(process.env.port);
    }).catch(error => {
        console.log(error);
    });