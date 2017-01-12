const mongoose = require('mongoose');
const matchSearch = require('../mymodules/loj.js').matchSearch;

const Schema = mongoose.Schema;

const teams = ['Arsenal', 'Manchester United', 'Manchester City', 'Barcelona'];
const productTypes = ['socks', 'shirt', 'scarf', 'tracksuit'];
const seasons = ['2015', '2014', '2013'];

const productSchema = new Schema({
  ID: String,
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
    Title: product.Title
  };
};

const productImport = product => ({
  ID: product.ID,
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
