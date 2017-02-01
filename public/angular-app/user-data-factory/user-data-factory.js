angular.module('meantodo').factory('userDataFactory', userDataFactory);

function userDataFactory($http){
  return{
    userList: userList,
    userDisplay: userDisplay
  };

  function userList(){
    return $http.get('/api/users').catch(failed);
  }

  function userDisplay(id){
    return $http.get('/api/users/' + id).catch(failed);
  }

  function failed(error){
    console.log(error.statusText);
  }
}