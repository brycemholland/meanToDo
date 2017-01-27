var dbconn = require('../data/dbconnection.js');
var userData = require('../data/user-data.json');

module.exports.usersGetAll = function(req, res){

  var db = dbconn.get();
  var collection = db.collection('users');

  collection
    .find();
    .toArray(function(err, docs){
      console.log("found users", docs);
      res
        .status(200)
        .json(docs);
    });
};

module.exports.usersGetOne = function(req, res){
  var userId = req.params.userId;
  var thisUser = userData[userId];
  console.log("get userId", userId);
  res
    .status(200)
    .json(thisUser);
};

module.exports.usersAddOne = function(req, res){
  var userId = req.params.userId;
  var thisUser = userData[userId];
  console.log("post new user");
  console.log(req.body);
  res
    .status(200)
    .json(thisUser);
};