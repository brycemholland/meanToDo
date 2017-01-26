var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users.controller.js');

router
  .route('/users')
  .get(ctrlUsers.usersGetAll);

router
  .route('/users/:userId')
  .get(ctrlUsers.usersGetOne);

module.exports = router;