var models = require('../models/models.js');

exports.autenticar = function(login, password, callback) {

  console.log(models.User.find)
  models.User.find({
    where: {
      username: login
    }
  })
  .then(function(user) {
    if(user) {
      if(user.verifyPassword(password)) {
        callback(null, user);
      } else {
        callback(new Error('Password erróneo.'));
      }
    } else {
      callback(new Error('No existe user=' + login));
    }
  })
  .catch(function(error) {
    callback(error);
  });
};
