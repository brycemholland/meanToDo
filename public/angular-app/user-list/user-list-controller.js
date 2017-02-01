angular.module('meantodo').controller('UsersController', UsersController);

function UsersController(userDataFactory){
  var vm = this;
  vm.title = 'MEAN To-Do List App';
  userDataFactory.userList().then(function(response){
  //$http.get('/api/users').then(function(response){
    console.log(response.data);
    vm.users = response.data;
  });
}