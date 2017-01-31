angular.module('meantodo').factory('userDataFactory', userDataFactory);

function userDataFactory($http){
  return{
    userList: userList,
    userDisplay: userDisplay,
    userRegister: userRegister
  };

  function userList(){
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function userDisplay(id){
    return $http.get('/api/users/' + id).then(complete).catch(failed);
  }

  function userRegister(postData){
    return $http.post('/api/users/register').then(complete).catch(failed);
  }

  function complete(response){
    return response.data;
  }

  function failed(error){
    console.log(error.statusText);
  }
}