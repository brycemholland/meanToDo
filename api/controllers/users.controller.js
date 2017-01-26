var userData = require('../data/user-data.json');

module.exports.usersGetAll = function(req, res){
  console.log("get the users");
  res
    .status(200)
    .json(userData);
};

module.exports.usersGetOne = function(req, res){
  var userId = req.params.userId;
  var thisUser = userData[userId];
  console.log("get userId", userId);
  res
    .status(200)
    .json(thisUser);
};