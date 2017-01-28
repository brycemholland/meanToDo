var mongoose = require('mongoose');

var toDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  tags: [String],
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  toDoList: [toDoSchema]
});

mongoose.model('User', userSchema);