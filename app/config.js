console.log('running config.js');
var path = require('path');
// var knex = require('knex')({
//   client: 'mongodb',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// //var db = require('bookshelf')(knex);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/HelloMongoose');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // comments: [{ body: String, date: Date }],

});

// var Url = mongoose.model('Url', urlSchema);
module.exports.urlSchema = urlSchema;

// create a table urlSchema
// This table should exist in a mongo query




var userSchema = new Schema({
  id: Number,
  name: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // comments: [{ body: String, date: Date }],

}); 

module.exports.userSchema = userSchema;



var User = mongoose.model('User', userSchema);

var newUser = User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: 'password',
  admin: true
});

// save the user
newUser.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});



// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

//module.exports = mongoose;
