const categoryOrder = {
    'gastroenterology': 2,
    'dermatology': 3,
    'endocrinology': 4,
    'endocrine_surgery': 5,
    'pediatric_endocrinology': 6,
    'infectious_diseases': 7,
    'cardiology': 8,
    'lung_diseases': 9,
    'neurology': 10,
    'therapy': 11,
    'tuberculosis': 12,
    'surgery': 13,
    'covid-19': 1
}

const categoryOrderHeader = {
    'gastroenterology': 2,
    'dermatology': 3,
    'endocrinology': 4,
    'cardiology': 5,
    'neurology': 6,
    'surgery': 7,
    'therapy': 8,
    'infectious_diseases': 9,
    'endocrine_surgery': 10,
    'lung_diseases': 11,
    'pediatric_endocrinology': 12,
    'tuberculosis': 13,
    'covid-19': 1
}

module.exports = {
    sortArticlesByCategories: (articlesJSON) => {
        articlesJSON.sort((one, two) => {
            if (one.category.sortPositionArticleBlock < two.category.sortPositionArticleBlock) return -1;
            if (one.category.sortPositionArticleBlock > two.category.sortPositionArticleBlock) return 1;
            return 0;
        });

        return articlesJSON;
    }
}