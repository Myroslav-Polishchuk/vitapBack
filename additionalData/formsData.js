const Advertising = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    imgSrc: {fieldType: 'text', isIgnore: false},
    imgAlt: {fieldType: 'text', isIgnore: false},
    link: {fieldType: 'text', isIgnore: false},
    type: {fieldType: 'text', isIgnore: false},
    isActive: {fieldType: 'checkbox', isIgnore: false},
    Date: {fieldType: 'text', isIgnore: true}
};

const Article = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    main_title: {placeholder: 'main_title', fieldType: 'text', isIgnore: false},
    main_fullText: {placeholder: 'main_fullText', fieldType: 'textarea', isIgnore: false},
    meta_name: {placeholder: 'meta_name', fieldType: 'text', isIgnore: false},
    meta_code: {placeholder: 'meta_code', fieldType: 'text', isIgnore: false},
    meta_workplace: {placeholder: 'meta_workplace', fieldType: 'text', isIgnore: false},
    resume_keywords: {fieldType: {
        subType: 'array',
        type: 'text'
    }, isIgnore: false},
    resume_paragraphs: {placeholder: 'resume_paragraphs', fieldType: 'textarea', isIgnore: false},
    references: {placeholder: 'references', fieldType: 'text', isIgnore: false},
    categoryID: {placeholder: 'categoryID', fieldType: {
        subType: 'reference',
        table: 'category'
    }, isIgnore: false},
    meta_authors: {placeholder: 'meta_authors', fieldType: {
        subType: 'reference',
        table: 'author'
    }, isIgnore: false},
    journalID: {placeholder: 'journalID', fieldType: {
        subType: 'reference',
        table: 'journal'
    }, isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    Date: {placeholder: 'Date', fieldType: 'text', isIgnore: true}
};

const Association = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    imgSrc: {fieldType: 'text', isIgnore: false},
    imgAlt: {fieldType: 'text', isIgnore: false},
    link: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'checkbox', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const Author = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    name: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'checkbox', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const Category = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    eng: {placeholder: 'англійська', fieldType: 'text', isIgnore: false},
    ukr: {placeholder: 'українська', fieldType: 'text', isIgnore: false},
    rus: {placeholder: 'російська', fieldType: 'text', isIgnore: false},
    imgSrc: {placeholder: 'image src', fieldType: 'text', isIgnore: false},
    imgAlt: {placeholder: 'image alt', fieldType: 'text', isIgnore: false}
};
const Event = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    url: {fieldType: 'text', isIgnore: false},
    imgSrc: {fieldType: 'text', isIgnore: false},
    imgAlt: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'checkbox', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const Journal = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    url: {fieldType: 'text', isIgnore: false},
    name: {fieldType: 'text', isIgnore: false}
}
const Measure = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    imgSrc: {fieldType: 'text', isIgnore: false},
    imgAlt: {fieldType: 'text', isIgnore: false},
    link: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'checkbox', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const News = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    publication: {placeholder: 'publication', fieldType: 'text', isIgnore: false},
    title: {placeholder: 'title', fieldType: 'text', isIgnore: false},
    mainText: {placeholder: 'mainText',fieldType: 'textarea', isIgnore: false},
    isMainNews: {placeholder: 'isMainNews', fieldType: 'checkbox', isIgnore: false},
    imgs: {placeholder: 'imgs', 
        fieldType: {
        subType: 'referenceArr',
        table: 'img'
    }, isIgnore: false},
    videoSrc: {placeholder: 'videoSrc', fieldType: 'text', isIgnore: false}
};
const Organization = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    url: {fieldType: 'text', isIgnore: false},
    imgSrc: {fieldType: 'text', isIgnore: false},
    imgAlt: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'checkbox', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const Recomendation = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    text: {fieldType: 'text', isIgnore: false},
    categoryID: {fieldType: {
        subType: 'reference',
        table: 'category'
    }, isIgnore: false},
    link: {fieldType: 'text', isIgnore: false},
    isOnline: {fieldType: 'text', isIgnore: false},
    date: {fieldType: 'text', isIgnore: true}
}
const Video = {
    _id: {placeholder: '_id', fieldType: 'text', isIgnore: true},
    __v: {placeholder: '__v', fieldType: 'text', isIgnore: true},
    title: {fieldType: 'text', isIgnore: false}, 
    src: {fieldType: 'text', isIgnore: false},
    categoryID: {fieldType: {
        subType: 'reference',
        table: 'category'
    }, isIgnore: false},
    previewImg: {fieldType: 'text', isIgnore: false},
    previewImgAlt: {fieldType: 'text', isIgnore: false},
    previewText: {fieldType: 'text', isIgnore: false}
}

module.exports = {
    advertisings: Advertising,
    articles: Article,
    associations: Association,
    authors: Author,
    categories: Category,
    events: Event,
    journals: Journal,
    measures: Measure,
    news: News,
    organizations: Organization,
    recomendations: Recomendation,
    videos: Video
};