var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    ID: Number,
    OurAffLink: String,
    Title: String,
    Image: String,
    Price: Number,
    Merchant: String,
    Points: 0
});

var product = mongoose.model('product', productSchema);

module.exports = product;
