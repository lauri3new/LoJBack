const mongoose = require('mongoose');
const matchSearch = require('../mymodules/loj.js').matchSearch;

const Schema = mongoose.Schema;

const teams = ['AFC Bournemouth', 'Arsenal', 'Burnley', 'Chelsea',
  'Crystal Palace', 'Everton', 'Liverpool', 'Hull City', 'Leicester City',
  'Liverpool', 'Manchester City', 'Manchester United', 'Middlesbrough',
  'Southampton', 'Stoke City', 'Sunderland', 'Swansea City', 'Tottenham Hotspur',
  'Watford', 'West Bromwich Albion', 'West Ham United'];

const productTypes = ['socks', 'shirt', 'scarf', 'tracksuit'];
const seasons = ['2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];

const productSchema = new Schema({
  ID: Number,
  OurAffLink: String,
  Title: String,
  Image: String,
  Price: Number,
  Merchant: String,
  Points: 0,
  Team: String,
  Type: String,
  Season: String
});

const product = mongoose.model('product', productSchema);

const productView = (product) => {
  return {
    ID: product.ID,
    buyLink: product.OurAffLink,
    ImageLink: product.Image,
    Price: product.Price,
    Title: product.Title,
    Points: product.Points
  };
};

const productImport = (product, Id) => ({
  ID: Id,
  OurAffLink: product.OurAffLink,
  Title: product.Title,
  Image: product.Image,
  Price: product.Price,
  Merchant: 'classic football shirts',
  Points: 0,
  Team: matchSearch(product.Title, teams),
  Type: matchSearch(product.Title, productTypes),
  Season: matchSearch(product.Title, seasons)
});

exports.product = product;
exports.productView = productView;
exports.productImport = productImport;
