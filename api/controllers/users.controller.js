var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersGetAll = function(req, res){

  var offset = 0;
  var count = 10;
  var maxCount = 10;

  if (req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)){
    res
      .status(400)
      .json({
        "message": "count and offset should be numbers, if supplied in the url"
      });
    return;
  }

  if (count > maxCount){
    res
      .status(400)
      .json({
        "message": "count limit of " + maxCount + " exceeded"
      });
    return;
  }

  User
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, users){
      if (err){
        console.log("error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found users", users.length);
        res
          .status(200)
          .json(users);
      }
    });

};

module.exports.usersGetOne = function(req, res){
  var userId = req.params.userId;
  console.log("get userId", userId);

  User
    .findById(userId)
    .exec(function(err, doc){
      if (err){
        var response ={
          status: 200,
          message: doc
        };
        console.log("error finding hotel");
        response.status = 500
        response.message = err;
      } else if (!doc){
        response.status = 404
        response.message = {
          "message": "user ID not found"
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.usersAddOne = function(req, res){
  var db = dbconn.get();
  var collection = db.collection('users');
  var newUser;

  console.log("post new user");

  if (req.body && req.body.name && req.body.email){ 
    newUser = req.body;

    collection.insertOne(newUser, function(err, response){
      console.log(response.ops);
      res
        .status(201)
        .json(response.ops);
    });
  } else {
    console.log("data missing from body");
    res
      .status(400)
      .json({ message: "required data missing from body"});
  }
};