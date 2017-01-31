angular.module('meantodo').controller('UserController', UserController);

function UserController(userDataFactory, $routeParams){
  var vm = this;
  var id = $routeParams.id;
  userDataFactory.userDisplay(id).then(function(response){
    vm.user = response.data;
  });
}