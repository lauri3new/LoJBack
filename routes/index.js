const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const random = require('./random.js');
const leagueTable = require('./league.js');
const quiz = require('./quiz.js');
mongoose.Promise = Promise;

// models
const Product = require('../models/product');

// viewmodels
const productViewModel = require('../viewmodels/product');

router.use('/league', leagueTable);

router.use('/random', random);

router.use('/quiz', quiz);

router.get('/search/:searchterm', (req, res, next) => {
  let searchTerm = req.params.searchterm.replace(/-/," ");
  Product.find({$text: {$search: `"${searchTerm}"`}}).sort().limit(500).exec()
  .then(products => res.json(products))
  .catch(err => res.json({error: err}));
});

router.get('/addpoints/:clubID', (req, res, next) => {
  let clubID = req.params.clubID;
  Product.findOneAndUpdate({ ID : clubID }, { $inc: { Points: 3 }}, { new: true }).exec()
  .then(kits => {
    res.json(kits)
    })
  .catch(err => res.json({error: err}));
});

router.get('/clubs/:teamname', (req, res, next) => {
  let clubName = req.params.teamname.replace(/-/," ");
  Product.find({$text: {$search: `"${clubName}"`}}).limit(8).exec()
  .then( products => res.json(products.map( product => productViewModel(product))))
  .catch( err => res.json(err));
});

module.exports = router;
