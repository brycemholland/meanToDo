var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.tasksGetAll = function(req, res){
  var userId = req.params.userId;

  User
    .findById(userId)
    .select('toDoList')
    .exec(function(err, doc){
      console.log(doc);
      var response = {
        status: 200,
        message: doc.toDoList
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
}

var _addTask = function(req, res, user){

  user.toDoList.push({
    task: req.body.task,
    tags: req.body.tags
  });

  user.save(function(err, userUpdated){
    if (err){
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(201)
        .json(userUpdated.toDoList[userUpdated.toDoList.length - 1]);
    }
  });

};

module.exports.tasksAddOne = function(req, res){
  console.log("adding task");

  var userId = req.params.userId;

  User
    .findById(userId)
    .select('toDoList')
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
      if (doc){
        _addTask(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};

module.exports.tasksDeleteOne = function(req, res){
  var userId = req.params.userId;
  var taskId = req.params.taskId;

  User
    .findById(userId)
    .exec(function(err, user){
      if (err){
        res
          .status(404)
          .json(err);
      } else {
        user.toDoList.id(taskId).remove();
        user.save();
        res
          .status(204)
          .json(user.toDoList);
      }
    });
};