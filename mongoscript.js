// var mongoose = require('mongoose');
// var fs = require('fs');
// // mongoose connection
// var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/football';
//
// mongoose.connect(mongoUri);
//
// mongoose.Promise = Promise;
// // models
// const Product = require('./models/product');
//
// fs.readFile('./teams.txt', function(err, data) {
//     if(err) throw err;
//     var array = data.toString().split("\n").slice(0,-1);
//         console.log(array);
//     for (let i = 0;i < 1; i++)
//       {
//         Product.update({ID: {$in: 1628 }},{TinyTim: 'christmas jim'},{multi: true}).exec()
//         .then(()=> console.log('ek eky ek'))
//         .catch(err => console.log('there was an error:',err))
//       }
//     }
// );
