const mongoose = require('mongoose');
const fs = require('fs');
const Transform = require('stream').Transform;
const csv = require('csvtojson');
const stream = require('stream');
const productImport = require('./models/product.js').productImport;
// mongoose connection
//const mongoUri = 'mongodb://localhost/football';
//mongoose.connect(mongoUri);
//mongoose.Promise = Promise;
// models
const Product = require('./models/product').product;



let importProducts = (req, res) => {
  let counter = 0;

  const modifyObj = new Transform({ objectMode: true });

  modifyObj._transform = function (data, encoding, callback) {
    // console.log(JSON.parse(JSON.stringify(data)));
      this.push(productImport(data));
      callback();
  };

  const saveObj = new Transform({ objectMode: true });

  saveObj._transform = function (data, encoding, callback) {
      let product = new Product(data);
      // TODO: sync code - v bad .. async version giving errors?!
      product.save( () => {
      callback();
    });
      // product.save();
      // callback();
  }

  modifyObj.on('finish', (error) =>{
    console.log('finish')
  });
  var out = new stream.Writable({ objectMode: true });
  out._write = function (modProduct, encoding, done) {
    done();
  };
  out.on('finish', () =>{
       res.json({done: 'done'});
  })
  const getCSV = csv({ delimiter: ',' }, { objectMode: true })
  .fromFile('../products.csv')
  .on('json', (jsonObj) => {
    counter++;
     console.log(counter);
  })
  .on('done', (error) => {
    console.log('done');
  })
  .on('error', (error) =>{
    console.log(error)
  });
   getCSV.pipe(modifyObj).pipe(saveObj).pipe(out);
 };

exports.importProducts = importProducts;
