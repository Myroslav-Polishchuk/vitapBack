const Advertising = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    imgID: {
        placeholder: 'imgs', 
        fieldType: {
            subType: 'reference',
            table: 'img'
        },
        isIgnore: false
    },
    link: {placeholder: 'link', fieldType: 'text', isIgnore: false},
    type: {placeholder: 'type', fieldType: 'text', isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
};

const Article = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    main_title: {placeholder: 'main_title', fieldType: 'text', isIgnore: false},
    main_fullText: {placeholder: 'main_fullText', fieldType: 'textarea', isIgnore: false},
    meta_name: {placeholder: 'meta_name', fieldType: 'text', isIgnore: false},
    meta_code: {placeholder: 'meta_code', fieldType: 'text', isIgnore: false},
    meta_workplace: {placeholder: 'meta_workplace', fieldType: 'text', isIgnore: false},
    resume_keywords: {placeholder: 'resume_keywords', fieldType: 'text', isIgnore: false},
    resume_paragraphs: {placeholder: 'resume_paragraphs', fieldType: 'textarea', isIgnore: false},
    ArticleReferences: {
        placeholder: 'references',
        fieldType: {
            subType: 'array'
        },
        isIgnore: false
    },
    categoryID: {
        placeholder: 'categoryID',
        fieldType: {
            subType: 'reference',
            table: 'category'
        },
        isIgnore: false
    },
    Authors: {
        placeholder: 'meta_authors',
        fieldType: {
            subType: 'referenceArr',
            table: 'author'
        },
        isIgnore: false
    },
    journalID: {placeholder: 'journalID', fieldType: {
        subType: 'reference',
        table: 'journal'
    }, isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
};

const Author = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    name: {placeholder: 'name', fieldType: 'text', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
    // isOnline: {fieldType: 'checkbox', isIgnore: false},
    // date: {fieldType: 'text', isIgnore: true}
}

const Category = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    eng: {placeholder: 'англійська', fieldType: 'text', isIgnore: false},
    ukr: {placeholder: 'українська', fieldType: 'text', isIgnore: false},
    rus: {placeholder: 'російська', fieldType: 'text', isIgnore: false},
    imgID: {
        placeholder: 'imgs', 
        fieldType: {
            subType: 'reference',
            table: 'img'
        },
        isIgnore: false
    },
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
};

const Event = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    url: {placeholder: 'url', fieldType: 'text', isIgnore: false},
    name: {placeholder: 'name', fieldType: 'text', isIgnore: false},
    imgID: {placeholder: 'imgs', 
        fieldType: {
            subType: 'reference',
            table: 'img'
        }, isIgnore: false
    },
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: true},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
};

const Journal = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    url: {fieldType: 'text', isIgnore: false},
    name: {fieldType: 'text', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const News = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: true},
    title: {placeholder: 'title', fieldType: 'text', isIgnore: false},
    mainText: {placeholder: 'mainText',fieldType: 'textarea', isIgnore: false},
    isMainNews: {placeholder: 'isMainNews', fieldType: 'checkbox', isIgnore: false},
    Fotos: {
        placeholder: 'imgs', 
        fieldType: {
            subType: 'referenceArr',
            table: 'img'
        }, 
    isIgnore: false
    },
    videoSrc: {placeholder: 'videoSrc', fieldType: 'text', isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
};

const Organization = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    url: {placeholder: 'url', fieldType: 'text', isIgnore: false},
    name: {placeholder: 'name', fieldType: 'text', isIgnore: false},
    imgID: {
        placeholder: 'imgs', 
        fieldType: {
            subType: 'reference',
            table: 'img'
        },
        isIgnore: false
    },
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: true},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const Recomendation = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    text: {placeholder: 'text', fieldType: 'text', isIgnore: false},
    categoryID: {
        placeholder: 'categoryID',
        fieldType: {
            subType: 'reference',
            table: 'category'
        },
        isIgnore: false
    },
    fileID: {
        placeholder: 'fileID',
        fieldType: {
            subType: 'reference',
            table: 'file'
        },
        isIgnore: false
    },
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: true},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const Video = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    title: {placeholder: 'title', fieldType: 'text', isIgnore: false}, 
    src: {placeholder: 'src', fieldType: 'text', isIgnore: false},
    embedURL: {placeholder: 'embedURL', fieldType: 'text', isIgnore: false},
    categoryID: {
        placeholder: 'categoryID',
        fieldType: {
            subType: 'reference',
            table: 'category'
        },
        isIgnore: false
    },
    previewImgSrc: {placeholder: 'previewImgSrc', fieldType: 'text', isIgnore: false},
    previewImgAlt: {placeholder: 'previewImgAlt', fieldType: 'text', isIgnore: false},
    previewText: {placeholder: 'previewText', fieldType: 'text', isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    date: {placeholder: 'date', fieldType: 'text', isIgnore: true},
    mainText: {placeholder: 'mainText', fieldType: 'textarea', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const Img = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    imgAlt: {placeholder: 'imgAlt', fieldType: 'text', isIgnore: false},
    name: {placeholder: 'name', fieldType: 'text', isIgnore: false},
    imgFile: {placeholder: 'imgFile', fieldType: 'file', isIgnore: false},
    imgSrc: {placeholder: 'imgSrc', fieldType: 'text', isIgnore: true},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const File = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    name: {placeholder: 'name', fieldType: 'text', isIgnore: false},
    file: {placeholder: 'file', fieldType: 'file', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

const OrderHomePage = {
    id: {placeholder: 'id', fieldType: 'text', isIgnore: true},
    componentName: {placeholder: 'componentName', fieldType: 'text', isIgnore: false},
    additionalDataJSON: {placeholder: 'additionalDataJSON', fieldType: 'textarea', isIgnore: false},
    orderNumber: {placeholder: 'orderNumber', fieldType: 'text', isIgnore: false},
    isOnline: {placeholder: 'isOnline', fieldType: 'checkbox', isIgnore: false},
    createdAt: {placeholder: 'createdAt', fieldType: 'text', isIgnore: true},
    updatedAt: {placeholder: 'updatedAt', fieldType: 'text', isIgnore: true}
}

module.exports = {
    Advertising: Advertising,
    Article: Article,
    Author: Author,
    Category: Category,
    Event: Event,
    Journal: Journal,
    News: News,
    Organization: Organization,
    Recomendation: Recomendation,
    Video: Video,
    Foto: Img,
    File: File,
    OrderHomePage: OrderHomePage
};