var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;



var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true
});

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment  = sequelize.import(path.join(__dirname, 'comment'));
var User = sequelize.import(path.join(__dirname, 'user'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

Quiz.belongsTo(User);
User.hasMany(Quiz);

exports.Quiz = Quiz;
exports.Comment = Comment;
exports.User = User;

sequelize.sync().then(function() {

  User.count().then(function(count) {
    if(count === 0) {
      User.bulkCreate([
        {username: 'admin', password: '1234', isAdmin: true},
        {username: 'pepe', password: '5678'}
      ])
      .then(function() {
        console.log('Base de datos (tabla user) inicializada');
        Quiz.count().then(function(count) {
          if(count === 0) {
            Quiz.create({
              pregunta: 'Capital de Italia',
              respuesta: 'Roma',
              UserId: 2
            });
            Quiz.create({
              pregunta: 'Capital de Portugal',
              respuesta: 'Lisboa',
              UserId: 2
            });
            Quiz.create({
              pregunta: 'Capital de España',
              respuesta: 'Madrid',
              UserId: 2
            });
            Quiz.create({
              pregunta: 'Capital de Francia',
              respuesta: 'Paris',
              UserId: 2
            });
            Quiz.create({
              pregunta: 'Capital de Alemania',
              respuesta: 'Berlin',
              UserId: 2
            })
            .then(function() {
              console.log('Base de datos inicializada');
            });
          }
        });
      })
    }
  });


});
