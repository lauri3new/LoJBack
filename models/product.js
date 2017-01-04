const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  ID: Number,
  OurAffLink: String,
  Title: String,
  Image: String,
  Price: Number,
  Merchant: String,
  Points: 0,
  Team: String
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

exports.product = product;
exports.productView = productView;
