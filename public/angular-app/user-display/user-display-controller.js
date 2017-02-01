angular.module('meantodo').controller('UserController', UserController);

function UserController(userDataFactory, $routeParams, $http, $httpParamSerializerJQLike, $route){
  var vm = this;
  var userId = $routeParams.id;
  userDataFactory.userDisplay(userId).then(function(response){
    vm.user = response.data;
  });

  vm.addTask = function(){
    var task = {
      task: vm.newTask
    };
    console.log(task);

    if (!vm.newTask){
      vm.error = 'Please type something in the box';
    } else {
      console.log('posting task')
      $http({
        method: 'POST',
        url: '/api/users/'+ userId +'/tasks',
        data: $httpParamSerializerJQLike(task),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function(result){
        console.log(result);
        vm.message = 'Registration successful!';
        vm.error = '';
        $route.reload();
      }).catch(function(error){
        console.log(error);
      });
    }

  };

  vm.deleteTask = function(taskId){
    console.log('deleting task');
    $http.delete('/api/users/'+ userId +'/tasks/'+ taskId).then(function(result){
      console.log(result);
      $route.reload();
    }).catch(function(error){
      console.log(error);
    })
  };
}