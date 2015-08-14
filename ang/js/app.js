
angular.module('myApp', [
  'myApp.quizFactory', 
  'myApp.commentFactory', 
  'myApp.userFactory'
  ])

.constant('config', {
  'backend': 'http://localhost:3000/'
})



.controller('mCtrl', function($scope, quizFactory, commentFactory, userFactory) {
  console.log('init');

 // commentFactory.postComment(1, 'aaaaa', function() {});
  quizFactory.prueba();
  quizFactory.getQuizes(function(quizes) {
  	console.log(quizes);
  	$scope.quizes = quizes.quizes;
  });

  quizFactory.getQuiz(1, function(quize) {
  	console.log(quize);
  });

  quizFactory.answerQuiz(1, 'Roma2', function(response) {
  	console.log(response);
  })
  $scope.getQuiz = function(id) {
  	quizFactory.getQuiz(id, function(quiz) {
  		console.log(quiz);
  		$scope.quiz = quiz.quiz;
  	});
  }
});
