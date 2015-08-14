angular.module('myApp.userFactory', [])
.factory('userFactory', function($http, config) {
  var userFactory = {};

  userFactory.prueba = function() {
    console.log(config);
  }

  return userFactory;

})