angular.module('meantodo').controller('UserLoginController', UserLoginController);

function UserLoginController($http, $httpParamSerializerJQLike, $location, $window, AuthFactory){
  var vm = this;

  vm.isLoggedin = function(){
    if (AuthFactory.isLoggedin) {
      return true;
    } else {
      return false;
    }
  };

  vm.loginUser = function(){
    if (vm.email & vm.password) {
      var user = {
        email: vm.email,
        password: vm.password
      };

      $http({
        method: 'POST',
        url: '/api/users/login',
        data: $httpParamSerializerJQLike(user),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(response){
        if (response.data.success){ 
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedin = true;
        }
        console.log(response);
        vm.message = 'Registration successful!';
        vm.error = '';
        console.log($window.sessionStorage.token);
        $location.path( '/');
      }).catch(function(error){
        console.log(error);
      });
    }
  }

  vm.logoutUser = function(){
    AuthFactory.isLoggedin = false;
    delete $window.sessionStorage.token;
    $location.path( "/");
  }
}