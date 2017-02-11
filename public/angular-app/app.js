angular.module('meantodo', ['ngRoute']).config(config);//.run(run);

function config($httpProvider, $routeProvider){
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/user-login/user-login.html',
      controller: UserLoginController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/users/:id', {
      templateUrl: 'angular-app/user-display/user.html',
      controller: UserController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/user-registration/user-registration.html',
      controller: UserRegistrationController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    });
}

// function run($rootScope, $location, $window, AuthFactory){
//   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//     if (nextRoute.access !== undefined && !window.sessionStorage.token && !AuthFactory.isLoggedIn) {
//       event.preventDefault();
//       $location.path('/');
//     }
//   });
// }