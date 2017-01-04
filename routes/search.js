const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product');
const productViewModel = require('../viewmodels/product');

router.param('page', function(req, res, next, page) {
  const validateNum = (page) => {
    return page.match(/^\d+$/) !== null ? true : false;
  };
});


router.get('/:searchterm', (req, res, next) => {
  Product.find({$text: {$search: `"${searchTerm}"`}}).sort().limit(9).exec()
  .then(products => res.json(products))
  .catch(err => res.json({error: err}));
});
