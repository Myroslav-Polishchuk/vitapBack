const express = require('express');
const route = express.Router();
const CategoryModel = require('../models/Category');

route.get('/', function(req, res, next) {
	CategoryModel.find({})
		.then(data => {
			res.json(data);
			next();
		})
})

module.exports = route;