const express = require('express');
const random = require('./random.js');
const leagueTable = require('./league.js');
const quiz = require('./quiz.js');
const shop = require('./shop.js');
const search = require('./search.js');
const addPoints = require('./addpoints.js');
const importProducts = require('../importproducts').importProducts;

const router = express.Router();

router.use('/league', leagueTable);

router.use('/random', random);

router.use('/quiz', quiz);

router.use('/shop', shop);

router.use('/addpoints', addPoints);

router.use('/search', search);

router.get('/admin/import', importProducts);

module.exports = router;
