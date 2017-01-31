angular.module('meantodo', ['ngRoute'])
.config(config);

function config($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/user-registration/user-registration.html',
      controller: UserRegistrationController,
      controllerAs: 'vm'
    })
    .when('/users', {
      templateUrl: 'angular-app/user-list/users.html',
      controller: UsersController,
      controllerAs: 'vm'
    })
    .when('/users/:id', {
      templateUrl: 'angular-app/user-display/user.html',
      controller: UserController,
      controllerAs: 'vm'
    });
}