const Recomendation = require('../models/Recomendation');

const datas = [
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccae',
        fileID: '5fa97d38e4b4fc2c7836a60c',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccae',
        fileID: '5fa97d38e4b4fc2c7836a60d',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccae',
        fileID: '5fa97d38e4b4fc2c7836a60e',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccaf',
        fileID: '5fa97d38e4b4fc2c7836a610',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccaf',
        fileID: '5fa97d38e4b4fc2c7836a611',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccaf`',
        fileID: '5fa97d38e4b4fc2c7836a60f',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccb0',
        fileID: '5fa97d38e4b4fc2c7836a612',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccb0',
        fileID: '5fa97d38e4b4fc2c7836a613',
        isOnline: true,
        date: new Date()
    },
    {
        text: "Перша назва клінічної настанови, яка займає два рядки",
        categoryID: '5f4e60269287710db0e4ccb0`',
        fileID: '5fa97d38e4b4fc2c7836a614',
        isOnline: true,
        date: new Date()
    }
]

const saveDefaultNews = () => {
    datas.forEach((data, index) => {
        const dataM = new Recomendation(data)
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