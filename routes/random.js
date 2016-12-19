const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const randomise = require('../mymodules/loj.js').randomise;
const partition = require('../mymodules/loj.js').partition;

mongoose.Promise = Promise;

// models
const Product = require('../models/product');

// viewmodels
const productViewModel = require('../viewmodels/product');

router.get('/', (req, res, next) => {
  Product.count().exec((err, count) => {
    let randoms = randomise(4,count);
    Product.find({ ID : { $in: randoms } }).exec()
    .then(products => res.json(partition(products.map( product => productViewModel(product)))))
    .catch(err => res.json({error: "something went wrong"}));
})});

router.get('/clubs/:teamname', (req, res, next) => {
  let clubName = req.params.teamname.replace(/-/," ");
    Product.find({$text: {$search: `"${clubName}"`}}).exec()
    .then(products => {
      if (products.length < 2 ) {
        throw "not enough products";
      }
      let randomRecord = Math.round(Math.random()*products.length);
      let randomRecord2 = Math.round(Math.random()*products.length);
      do {
      randomRecord = Math.round(Math.random()*products.length);
      } while (randomRecord == randomRecord2)
      res.json([productViewModel(products[randomRecord]), productViewModel(products[randomRecord2])]);})
    .catch(err => res.json(err));
});

module.exports = router;
