var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users.controller.js');

router
  .route('/users')
  .get(ctrlUsers.usersGetAll);

router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

router
  .route('/users/:userId')
  .get(ctrlUsers.usersGetOne)
  .put(ctrlUsers.usersUpdateOne)
  .delete(ctrlUsers.usersDeleteOne);

module.exports = router;