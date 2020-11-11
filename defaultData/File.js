const FileModel = require('../models/File');

const datas = [
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf',
        name: 'big'
    },
    {
        link: 'https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_1MB.pdf',
        name: 'big'
    },
];

const saveDefaultNews = () => {
    datas.forEach((data, index) => {
        const dataM = new FileModel(data)
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