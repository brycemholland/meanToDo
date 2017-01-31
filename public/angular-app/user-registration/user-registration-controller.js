angular.module('meantodo').controller('UserRegistrationController', UserRegistrationController);

function UserRegistrationController(userDataFactory){
  var vm = this;
  vm.registerUser = function(){
    console.log('registering user');
    var postData = {
      name: vm.name,
      email: vm.email,
      password: vm.password
    };
    userDataFactory.userRegister(postData).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    });
  };
}