const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product');
const productViewModel = require('../viewmodels/product');


router.param('page', function(req, res, next, page) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log(req.page);
    const validateNum = (page) => {
      return page.match(/^\d+$/) !== null ? true : false;
    };
    // once validation is done save the new item in the req
    req.page = page;
    if (validateNum(page) == true) {
      Product.count().exec((err, count) => {
        if ( page <= Math.ceil(count/9) ) {
          next();
        }
        else {
          res.sendStatus(404);
        }
      });
    }
    else {
    res.sendStatus(404);
  }
});

router.use('/page/:page', (req, res, next) => {
let pageNumber = req.params.page;
Product.find().limit(9).skip(pageNumber*9).exec()
.then( products => res.json(products.map( product => productViewModel(product))))
.catch( err => res.json(err));
});

module.exports = router;
