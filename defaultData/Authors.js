const Author = require('../models/Author');

const AuthorsData = [
    {
        name: "Мазур І.Е"    
    },
    {
        name: "Поліщук М.А"
    },
    {
        name: "Хутір В.Ф"
    },
    {
        name: "Тарасенко А.М"
    },
    {
        name: "Хотченко П.М"
    }
];

const saveDefaultNews = () => {
    AuthorsData.forEach((data, index) => {
        const dataM = new Author(data)
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