function defaultCategories() {
    const Category = require('../models/Category');
    
    const categoriesData = [
        new Category({   
            eng: 'cardiology',
            ukr: 'кардіологія',
            rus: 'кардиология',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'surgery',
            ukr: 'хірургія',
            rus: 'хирургия',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'gastroenterology',
            ukr: 'гастроентерологія',
            rus: 'гастроэнтерология',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'endocrinology',
            ukr: 'ендокринологія',
            rus: 'эндокринология',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'dermatology',
            ukr: 'дерматологія',
            rus: 'дерматология',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'neurology',
            ukr: 'неврологія',
            rus: 'неврология',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        }),
        new Category({
            eng: 'therapy',
            ukr: 'терапія',
            rus: 'терапия',
            imgSrc: 'https://vignette.wikia.nocookie.net/logopedia/images/5/52/WarnerBros.jpg/revision/latest?cb=20171024121259',
            imgAlt: '#'
        })
    ];

    categoriesData.forEach((data, index) => {
        data.save()
        .then(result => {
            console.log(index, data.eng)
        })
        .catch(err => {
            console.log(index);
        });
    }) 
}

module.exports = defaultCategories;
