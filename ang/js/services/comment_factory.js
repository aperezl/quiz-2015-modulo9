angular.module('myApp.commentFactory', [])
.factory('commentFactory', function($http, config) {
  var commentFactory = {};

  commentFactory.prueba = function() {
    console.log(config);
  }

  commentFactory.postComment = function(id, texto, cb) {
  	$http.post(config.backend + 'quizes/'  + id + '/comments', {comment: {texto: texto}})
  	.then(function(response) {
  		console.log(response);
  		cb(response.data);
  	}, function(response) {
  		cb(response);
  	});
  };
  return commentFactory;

})