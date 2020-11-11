const ReferenceModel = require('../models/Reference');

const datas = [
    {
        text: 'Reference 1',
        url: 'https://uk.wikipedia.org/wiki/%D0%94%D0%B5%D0%BD%D1%8C_%D0%BD%D0%B5%D0%B7%D0%B0%D0%BB%D0%B5%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%96_%D0%9F%D0%BE%D0%BB%D1%8C%D1%89%D1%96'
    },
    {
        text: 'Reference 2',
        url: 'https://uk.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D1%88%D0%B0_%D1%81%D0%B2%D1%96%D1%82%D0%BE%D0%B2%D0%B0_%D0%B2%D1%96%D0%B9%D0%BD%D0%B0'
    },
    {
        text: 'Reference 3',
        url: 'https://uk.wikipedia.org/wiki/%D0%A1%D0%B2%D1%96%D1%82%D0%BE%D0%B2%D0%B0_%D0%B2%D1%96%D0%B9%D0%BD%D0%B0'
    },
];

const saveDefaultNews = () => {
    datas.forEach((data, index) => {
        const dataM = new ReferenceModel(data)
        dataM.save()
        .then(result => {
            console.log(index, result)
        })
        .catch(err => {
            console.log(err);
        });
    }) 
}

module.exports = saveDefaultNews;