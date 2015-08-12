// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('miriadax', function($http) {
  var miriadax = {};

  miriadax.getQuizes = function(cb) {
    $http.get('http://localhost:5000/quizes')
    .then(function(response) {
      cb(response.data.quizes);
    }, function(response) {
      //TODO: Control de errores
    })
  }
  return miriadax;
})


.controller('mainCtrl', function($scope, miriadax) {
  $scope.init = function() {
    console.log('iniciando');
      var quizes = miriadax.getQuizes(function(quizes) {
        console.log(quizes);
        $scope.quizes = quizes;
      });

  }
})
