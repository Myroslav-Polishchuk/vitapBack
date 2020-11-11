const Video = require('../models/Video');

function defaultVideos() {
    // const fetchVideoInfo = require('youtube-info');

    // const updateVideoThumbnails = (video) => {
    //     const videoID = video.src.split('v=')[1];
    //     fetchVideoInfo(videoID)
    //     .then(response => {
    //         video.previewImg = video.previewImg || response.thumbnailUrl;
    //         video.title = video.title || response.title;
    //         video.embedURL = video.embedURL || response.embedURL;

    //         new Video(video).save()
    //         .then(result => {
    //             console.log(index, result)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // };

    const data = [
        {
            src: 'https://www.youtube.com/watch?v=f2RUO6gWB3g',
            embedURL: 'https://www.youtube.com/embed/f2RUO6gWB3g',
            title: 'MISO SOUP',
            previewImgSrc: 'https://img.youtube.com/vi/f2RUO6gWB3g/hqdefault.jpg',
            previewImgAlt: 'a',
            categoryID: '5f4e60269287710db0e4ccaf',
            previewText: 'Подружко 1',
            isOnline: true,
            date: new Date()
        },
        {
            src: 'https://www.youtube.com/watch?v=_9XRa7q5lY4',
            embedURL: 'https://www.youtube.com/embed/_9XRa7q5lY4',
            title: 'TAKOYAKI｜Octopus ball',
            previewImgSrc: 'https://img.youtube.com/vi/_9XRa7q5lY4/hqdefault.jpg',
            previewImgAlt: 'a',
            categoryID: '5f4e60269287710db0e4ccae',
            previewText: 'Подружко 2',
            isOnline: true,
            date: new Date()
        },
        {
            src: 'https://www.youtube.com/watch?v=OYh-40mtiGU',
            embedURL: 'https://www.youtube.com/embed/OYh-40mtiGU',
            title: '[ХС Express #1] Обзор Star Crusade',
            previewImgSrc: 'https://img.youtube.com/vi/OYh-40mtiGU/maxresdefault.jpg',
            previewImgAlt: 'a',
            categoryID: '5f4e60269287710db0e4ccb1',
            previewText: 'Подружко 3',
            isOnline: true,
            date: new Date()
        }
    ];

    data.forEach(item => {
        // updateVideoThumbnails(item);
        new Video(item).save();
    })
    
}

module.exports = defaultVideos;
