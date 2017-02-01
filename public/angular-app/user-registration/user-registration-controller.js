angular.module('meantodo').controller('UserRegistrationController', UserRegistrationController);

function UserRegistrationController($http, $httpParamSerializerJQLike, $location){
  var vm = this;

  vm.registerUser = function(){
    var user = {
      name: vm.name,
      email: vm.email,
      password: vm.password
    };
    console.log(user);

    if (!vm.name || !vm.email || !vm.password){
      vm.error = 'Please add all info';
    } else {
      $http({
        method: 'POST',
        url: '/api/users/register',
        data: $httpParamSerializerJQLike(user),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(result){
        console.log(result);
        vm.message = 'Registration successful!';
        vm.error = '';
        $location.path( "/" );
      }).catch(function(error){
        console.log(error);
      });
    }
  };
}