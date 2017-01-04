const express = require('express');
const mongoose = require('mongoose');
const random = require('./random.js');
const leagueTable = require('./league.js');
const quiz = require('./quiz.js');
const shop = require('./shop.js');
const search = require('./search.js');
const addPoints = require('./addpoints.js');

const router = express.Router();
mongoose.Promise = Promise;

router.use('/league', leagueTable);

router.use('/random', random);

router.use('/quiz', quiz);

router.use('/shop', shop);

router.use('/addpoints', addPoints);

router.use('/search', search);

module.exports = router;
