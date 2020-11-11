const Organization = require('../models/Organization');

const datas = [
    {
        url: 'https://hard.rozetka.com.ua/ua/artline_p98v15/p155496006/',
        imgID: '5fa844715a1b164330b39edf',
        isOnline: true,
        date: new Date()
    },
    {
        url: 'https://hard.rozetka.com.ua/ua/artline_w99v23/p116199577/',
        imgID: '5fa844715a1b164330b39ee0',
        isOnline: true,
        date: new Date()
    },
    {
        url: 'https://hard.rozetka.com.ua/ua/artline_tufv08/p243781093/',
        imgID: '5fa844715a1b164330b39ee1',
        isOnline: true,
        date: new Date()
    },
    {
        url: 'https://hard.rozetka.com.ua/ua/artline_tufv07/p243778807/characteristics/',
        imgID: '5fa844715a1b164330b39ee2',
        isOnline: true,
        date: new Date()
    }
]

const saveDefaultNews = () => {
    datas.forEach((data, index) => {
        const dataM = new Organization(data)
        dataM.save()
        .then(result => {
            console.log(index, dataM)
        })
        .catch(err => {
            console.log(index);
        });
    }) 
}

module.exports = saveDefaultNews;  