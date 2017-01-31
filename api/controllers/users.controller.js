var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


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

module.exports.register = function(req, res){

  console.log("registering user");

  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  User
    .create({
      name: name,
      email: email,
      password: password
      //password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
      if (err){
        console.log("error creating user");
        res
          .status(400)
          .json(err);
      } else {
        console.log("user created");
        res
          .status(201)
          .json(user);
      }
    });
};

module.exports.login = function(req, res){
  console.log("logging in user");
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email
  }).exec(function(err, user){
    if (err){
      console.log(err);
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)){ 
        console.log("user logged in", user);
        var token = jwt.sign({ email: user.email }, 's3cr3t', { expiresIn: 3600 });
        res.status(200).json({ success: true, token: token});
      } else {
        res.status(401).json('unauthorized');
      }
    }
  });
};

// module.exports.authenticate = function(req, res, next){
//   var headerExists = req.headers.authorization;
//   if (headerExists){
//     var token = req.headers.authorization.split(' ')[1];
//     jwt.verify(token, 's3cr3t', function(error, decoded){
//       if (error){
//         console.log(error);
//         res
//           .status(401)
//           .json('unauthorized');
//       } else {
//         req.user = decoded.email;
//         console.log(req.user);
//         next();
//       }
//     }); 
//   } else {
//     res
//       .status(403)
//       .json('no token provided');
//   }
// };


module.exports.usersGetOne = function(req, res){
  var userId = req.params.userId;

  User
    .findById(userId)
    .exec(function(err, doc){
      var response = {
        status: 200,
        message: doc
      };
      if (err){
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



module.exports.usersUpdateOne = function(req, res){
  var userId = req.params.userId;

  User
    .findById(userId)
    .select("-toDoList")
    .exec(function(err, doc){
      var response = {
        status: 200,
        message: doc
      };
      if (err){
        console.log("error finding hotel");
        response.status = 500
        response.message = err;
      } else if (!doc){
        response.status = 404
        response.message = {
          "message": "user ID not found"
        };
      }
      if (res.status !== 200){ 
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.name = req.body.name;
        doc.email = req.body.email;

        doc.save(function(err, userUpdated){
          if (err){
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.usersDeleteOne = function(req, res){
  var userId = req.params.userId;

  User
    .findByIdAndRemove(userId)
    .exec(function(err, user){
      if (err){
        res
          .status(404)
          .json(err);
      } else {
        res
          .status(204)
          .json();
      }
    });
};