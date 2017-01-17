const express = require('express');
const mongoose = require('mongoose');
const randomise = require('../mymodules/loj.js').randomise;
const partition = require('../mymodules/loj.js').partition;

const router = express.Router();

mongoose.Promise = Promise;

// models
const Product = require('../models/product').product;
const productViewModel = require('../models/product').productView;

router.get('/', (req, res) => {
  Product.count().exec((err, count) => {
    console.log('count', count);
    const randoms = randomise(4, count);
    console.log('randoms', randoms);
    Product.find({ ID: { $in: randoms } }).exec()
    .then(products => {
      console.log('products', products);
      res.json(partition(products.map(product => productViewModel(product))));
    })
    .catch(() => res.json({ error: "something went wrong" }));
  });
});

module.exports = router;
