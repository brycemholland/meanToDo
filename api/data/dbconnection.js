// This is for the MongoDB native driver. This has been replaced by db.js using Mongoose

var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meantodo';

var _connection = null;

var open = function(){
  MongoClient.connect(dburl, function(err, db){
    if (err){
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open");
  });
};

var get = function(){
  return _connection;
}

module.exports = {
  open: open,
  get: get
};