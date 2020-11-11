const ImgModel = require('../models/Img');

const datas = [
    {
        imgSrc: 'https://i2.rozetka.ua/goods/15503453/artline_p98v15_images_15503453295.jpg',
        imgAlt: '#'
    },
    {
        imgSrc: 'https://i1.rozetka.ua/goods/13693442/copy_artline_w99v22_5d68f0ef04b06_images_13693442389.jpg',
        imgAlt: '#'
    },
    {
        imgSrc: 'https://i2.rozetka.ua/goods/19673323/copy_artline_tufv07_5f47bf1ba6ab9_images_19673323861.jpg',
        imgAlt: '#'
    },
    {
        imgSrc: 'https://i2.rozetka.ua/goods/19673274/copy_artline_tufv06_5f47bca7476ac_images_19673274541.jpg',
        imgAlt: '#'
    }
]

const saveDefaultNews = () => {
    datas.forEach((data, index) => {
        const dataM = new ImgModel(data)
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