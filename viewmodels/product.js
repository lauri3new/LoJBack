var product = require('../models/product');

module.exports = function(product) {
  return {
    ID : product.ID,
    buyLink : product.OurAffLink,
    ImageLink : product.Image,
    Price : product.Price,
    Title : product.Title
  }
}
