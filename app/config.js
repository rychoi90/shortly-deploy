console.log('running config.js');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://192.241.208.192/HelloMongoose');
var db = mongoose.connection;

db.on('error', function(err) {
  console.log(err);
});

db.once('open', function() {
  console.log('heeey, database is open');
});

