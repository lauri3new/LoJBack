const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

// models
const Product = require('../models/product');

// viewmodels
const productViewModel = require('../viewmodels/product');

router.get('/', (req, res) => {
  Product.find().sort({ Points : -1 }).limit(50).exec()
  .then(products => res.json(products))
  .catch(err => res.json({error: err}));
});

module.exports = router;
