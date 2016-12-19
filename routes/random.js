const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LoJ = require('../mymodules/loj.js');

mongoose.Promise = Promise;

// models
const Product = require('../models/product');

// viewmodels
const productViewModel = require('../viewmodels/product');

router.get('/', (req, res, next) => {
  let x = [3,5,2,6];
  console.log(LoJ(x));
  Product.count().exec((err, count) => {
    let randomRecord = Math.round(Math.random()*count);
    let randomRecord2 = Math.round(Math.random()*count);
    let randomRecord3 = Math.round(Math.random()*count);
    let randomRecord4 = Math.round(Math.random()*count);
    do {
    randomRecord = Math.round(Math.random()*count);
    } while (randomRecord == randomRecord2)
    Product.find({ ID : { $in: [randomRecord, randomRecord2, randomRecord3, randomRecord4] } }).exec()
    .then(products => res.json(products.map( product => productViewModel(product))))
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
