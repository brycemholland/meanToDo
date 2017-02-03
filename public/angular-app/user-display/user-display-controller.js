angular.module('meantodo').controller('UserController', UserController);

function UserController(userDataFactory, $routeParams, $http, $httpParamSerializerJQLike, $route, $anchorScroll, $timeout, $scope){
  var vm = this;
  var userId = $routeParams.id;
  userDataFactory.userDisplay(userId).then(function(response){
    vm.user = response.data;
  });

  // $scope.$on('$viewContentLoaded', function() {
  //   vm.scrollToElement('new-task-container');
  // });

  // vm.scrollToElement = function(element){
  //   $anchorScroll(element);
  // };

  $('input[name="newTask"]').focus();

  vm.showEditMode = function(index){
    var $thisTask = $('.task-show').eq(index);
    $('.task-show').addClass('active');
    $('.task-form').removeClass('active');
    $thisTask.removeClass('active');
    $thisTask.siblings('.task-form').addClass('active');
    $thisTask.siblings('.task-form').find('input[type="text"]').focus();
  };

  vm.hideEditMode = function(index){
    var $thisTask = $('.task-form').eq(index);
    $thisTask.toggleClass('active');
    $thisTask.siblings('.task-show').toggleClass('active');
  };

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
        vm.message = 'Task created!';
        vm.error = '';
        $route.reload();
      }).catch(function(error){
        console.log(error);
      });
    }

  };

  vm.updateTask = function(index, taskId){
    var task = vm.user.toDoList[index];
    task.index = index;
  
    $http({
      method: 'PUT',
      url: '/api/users/'+ userId +'/tasks/'+ taskId,
      data: $httpParamSerializerJQLike(task),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(result){
      console.log(result);
      vm.message = 'Task updated!';
      vm.error = '';
      $route.reload();
    }).catch(function(error){
      console.log(error);
    });

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