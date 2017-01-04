const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
mongoose.Promise = Promise;

const Product = require('../models/product');

router.get('/', (req, res) => {
  Product.find().sort({ Points: -1 }).limit(20).exec()
  .then(products => res.json(products))
  .catch(err => res.json({ error: err }));
});

module.exports = router;
