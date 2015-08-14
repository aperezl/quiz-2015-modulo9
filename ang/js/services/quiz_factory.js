angular.module('myApp.quizFactory', [])
.factory('quizFactory', function($http, config) {
  var quizFactory = {};

  quizFactory.prueba = function() {
    console.log(config);
  }
  quizFactory.getQuizes = function(cb) {
  	$http.get(config.backend + 'quizes')
  	.then(function(response) {
  		cb(response.data);
  	}, function(response) {
  		cb(response);
  	});
  };

    quizFactory.getQuiz = function(id, cb) {
  	$http.get(config.backend + 'quizes/' + id)
  	.then(function(response) {
  		cb(response.data);
  	}, function(response) {
  		cb(response);
  	});
  }

  quizFactory.answerQuiz = function(id, answer, cb) {
  	$http.get(config.backend + 'quizes/' + id + '/answer?respuesta=' + answer)
  	.then(function(response) {
  		cb(response.data);
  	}, function(response) {
  		cb(response)
  	})
  }

  return quizFactory;

})