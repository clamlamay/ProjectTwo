var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var bcrypt = require('bcryptjs');

/* GET users listing. */

router.get('/form', renderForm);
router.post('/register', createID);
router.get('/login', renderLogin);
router.post('/login', userLogin);
router.get('/logout', logOut); 

function createID (req, res, next) {
  var password = req.body.password_hash;
  var salt = 10;
  var hash = bcrypt.hashSync(password, salt);
  var user = {
    username: req.body.username,
    password_hash: hash,
    email: req.body.email
    };
  var Model = new Account(user).save().then(function(result) {
    // console.log(user);
    // console.log(result.attributes.id);
    req.session.user = result.attributes.id;
    req.session.isLoggedIn = true;
    res.redirect('/submit/upload-content');
    // return user;
 });
};

function userLogin (req, res, next) {
  // console.log(req.session.user);
  if (req.session.isLoggedIn === true) {
    res.redirect('/submit/upload-content');
  } else {
    Account.where('username', req.body.username).fetch().then(
        function(result) {
            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
            req.session.user = result.attributes.id;
            req.session.isLoggedIn = true;
            res.redirect('/submit/upload-content');
    });
  }};



function comparePasswordHashes (input, db) {
  // var hash = createPasswordHash(input);
  return bcrypt.compareSync(input, db);
};

function renderForm (req, res, next) {
  res.render('form', {});
};

function renderLogin (req, res, next) {
  res.render('login', {});
};

function logOut (req, res, next){
  req.session.isLoggedIn = false;
  res.render('logout', {});
};


  


module.exports = router;

