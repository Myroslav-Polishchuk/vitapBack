const express = require('express');
const route = express.Router();
const RecomendationModel = require('../models/Recomendation');
const CategoryModel = require('../models/Category');

const ITEMS_PER_PAGE = 2;

route.get('/preview', function(req, res, next) {
	const previewRecomendation = [];
	const readyLength = 3;

	const getRecomendation = (cat) => {
        RecomendationModel
		.find({categoryID: cat._id})
		.populate('fileID')
		.select({_id: 1, link: 1, text: 1})
        .limit(3)
        .then(recomendations => {
			if (recomendations.length) {
				const newData = {
					category: cat,
					recomendations: recomendations
				}
				previewRecomendation.push(newData);
				if (previewRecomendation.length === readyLength) {
					res.json(previewRecomendation);
				}
			}
        })
	}
	
	CategoryModel
    .find({})
    .then(categories => {
        categories.forEach(cat => getRecomendation(cat))
    })
});

route.get('/length/:categoryID', function(req, res, next) {
	const categoryID = req.params.categoryID;

	RecomendationModel
	.countDocuments({categoryID: categoryID}, function(err, count) {
		res.json({
			recomendationLength: count
		});
	});
});

route.post('/:categoryID', function(req, res, next) {
	const categoryID = req.params.categoryID;
	const page = req.body.page ? req.body.page : 1;

	RecomendationModel
	.find({categoryID: categoryID})
	.populate('fileID')
	.skip((page - 1) * ITEMS_PER_PAGE)
	.limit(10)
	.then(recomendations => {
		res.json(recomendations);
	});
	
});

module.exports = route;