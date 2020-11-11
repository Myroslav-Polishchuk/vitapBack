const Journal = require('../models/Journal');

const journalsData = [
    {
        name: 'Сучасна гастроентерологія',
        url: 'http://sgastro.com.ua/'
    },
    {
        name: 'Український журнал дерматології, венерології, косметології',
        url: 'http://www.ujdvc.com.ua/'
    },
    {
        name: 'Клінічна ендокринологія та ендокринна хірургія',
        url: 'http://jcees.endocenter.kiev.ua/'
    },
    {
        name: 'Український журнал дитячої ендокринології',
        url: 'http://ujpe.com.ua/'
    },
    {
        name: 'Туберкульоз, легеневі хвороби, ВІЛ-інфекція',
        url: 'http://tubvil.com.ua/'
    },

    {
        name: 'Український неврологічний журнал',
        url: 'http://www.ukrneuroj.com.ua/'
    },    
    {
        name: 'Український терапевтичний журнал',
        url: 'http://www.utj.com.ua/'
    },
    {
        name: 'Серце і судини',
        url: 'http://heartandvessels.com.ua/'
    },
    {
        name: 'Хірургія України',
        url: 'http://surgukraine.com.ua/'
    }
]

const saveDefaultNews = () => {
    journalsData.forEach((data, index) => {
        const dataM = new Journal(data)
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