angular.module('meantodo').controller('UsersController', UsersController);

function UsersController(userDataFactory){
  var vm = this;
  vm.title = 'MEAN To-Do List App';
  userDataFactory.userList().then(function(response){
    vm.users = response.data;
  });
}