var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/form', renderForm);
router.post('/register', attemptToRegister);
router.post('/login', attemptToLogin);

function attemptToRegister(req, res, next) {
  var password = req.body.password_hash;
  var hashedPassword = createPasswordHash(password);
  var account = new Account({
    email: req.body.email,
    password_hash: hashedPassword
  }).save().then(function(result) {
    res.render('response', result.attributes);
  });
};

function createPasswordHash (password) {
  var salt = 10; 
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};
function comparePasswordHashes (input, db) {
  var hash = createPasswordHash(input);
  return bcrypt.compareSync(input, db);
};

function attemptToLogin(req, res, next) {
  var password = req.body.password;
  Account.where('email', req.body.email).fetch().then(
    function(result) {
      var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);
      res.json({'is_logged_in': attempt });
    }
  )
};

function renderForm(req, res, next) {
  res.render('form', {});
};

// ctrl.get('/create', create);
// ctrl.get('/id/:id', findById);
// ctrl.get('/all', findAll);

// /* create row w/bookshelf */
// function create(req, res, next) {
//   //req.body contain whatever our form sends
//   var kirby = { name: 'Kirby' };
//   var model = new AccountModel(kirby).save().then(function(result) {
//     res.json(result);
//     //res.render('template', result.attributes);
//   });
// };

// function findById(req, res, next) {
//     var id = req.params.id; // typically going to be our ID
//     var model = AccountModel.where({
//       id: id
//     }).fetch().then(function(result) {
//       res.json(result);
//     });
//   console.log(model);
// };

// function findAll(req, res, next) {
//   AccountModel.collection().fetch().then(function(results) {
//     res.json(results);
//   });
// };

module.exports = router;

