const express = require('express');
const random = require('./random.js');
const leagueTable = require('./league.js');
const path = require('path');
// const quiz = require('./quiz.js');
// const shop = require('./shop.js');
// const search = require('./search.js');
const addPoints = require('./addpoints.js');
const importProducts = require('../importproducts').importProducts;

const router = express.Router();
// v1 routes
router.use('/api/league', leagueTable);

router.use('/api/random', random);

router.get('/admin/import', importProducts);

// router.use('/api/quiz', quiz);
//
// router.use('/api/shop', shop);
//
// router.use('/api/addpoints', addPoints);
//
// router.use('/api/search', search);
//


module.exports = router;
