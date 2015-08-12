var models = require('../models/models.js');

exports.ownershipRequired = function(req, res, next) {
  var objQuizOwner = req.quiz.UserId;
  var logUser = req.session.user.id;
  var isAdmin = req.session.user.isAdmin;

  if(isAdmin || objQuizOwner === logUser) {
    next();
  } else {
    res.redirect('/');
  }
};

//Autoload Quiz
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
    where: {id: Number(quizId)},
    include: [{model: models.Comment}]
  }).then(function(quiz) {
    if(quiz) {
      req.quiz = quiz;
      next();
    } else {
      next(new Error('No existe quizId=' + quizId));
    }
  }).catch(function(error) { next(error) });;
};


// GET /quizes
exports.index = function(req, res) {
  var where = {};
  var search = req.query.search || '';

  if(req.query.search) {
    where = {where: ["pregunta like ?", '%' + search.replace(' ', '%') + '%'], order: 'pregunta'};
  }
  models.Quiz.findAll(where).then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes, query: search, errors: []});
  }).catch(function(error) { next(error);} );
};

// GET /quizes/question
exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/answer
exports.answer = function(req, res) {
  var resultado= 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build({
      pregunta: "Pregunta",
      respuesta: "Respuesta",
      tema: "Tema"
  });
  res.render('quizes/new', {quiz: quiz, errors: []});
};

//POST /quizes/create
exports.create = function(req, res) {
  req.body.quiz.UserId = req.session.user.id;
  if(req.files.image) {
    req.body.quiz.image = req.files.image.name;
  }
  var quiz = models.Quiz.build(req.body.quiz);
  quiz
  .validate()
  .then(function(err) {
    if(err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else {
      quiz
      .save({
        fields: ["pregunta", "respuesta", "tema", "UserId"]
      })
      .then(function() {
        res.redirect('/quizes');
      })
    }
  })
};

exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', {quiz: quiz, errors: []});
}

exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  if(req.file) {

    req.quiz.image = req.file.filename;
  }
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  

  req.quiz
  .validate()
  .then(function(err) {
    if(err) {
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    } else {
      req.quiz
      .save( { fields: ['pregunta', 'respuesta', 'tema', 'image'] })
      .then(function() {
        res.redirect('/quizes');
      });
    }
  });
};

exports.destroy = function(req, res) {
  req.quiz.destroy().then(function() {
    res.redirect('/quizes');
  }).catch(function(error) {next(error)});
}
