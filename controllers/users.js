var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var Content = require('../models/ContentModel');
var bcrypt = require('bcryptjs');

/* GET users listing. */

router.get('/form', renderForm);
router.post('/register', createID);
router.get('/login', renderLogin);
router.post('/login', userLogin);
router.get('/logout', logOut); 

router.get('/id/:id', renderPartyById);

function createID (req, res, next) {
  console.log(req.session);
  var password = req.body.password_hash;
  var salt = 10;
  var hash = bcrypt.hashSync(password, salt);
  var Model = new Account({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email
  }).save().then(function(result) {
    req.session.username = result.attributes.username;
    req.session.user_id = result.attributes.id;
    console.log(result.attributes.username);
    req.session.isLoggedIn = true;
    res.render('upload-content', result);
 });
};


function userLogin (req, res, next) {
  console.log(req.session);
  if (req.session.isLoggedIn === true) {
    res.redirect('/upload-content');
    // res.render('welcome', {});
  } else {
    Account.where('username', req.body.username).fetch().then(
        function(result) {
            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
            req.session.username = result.attributes.username;
            req.session.user_id = result.attributes.id;
            console.log(result.attributes.username);
            req.session.isLoggedIn = true;
            res.render('upload-content', result);
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
  req.session = null;
  console.log(req.session);
  res.render('logout', {});
};


function renderPartyById(req, res, next) {
    // Call individual model
    var id = parseInt(req.params.id);
    if (typeof id != 'number') {
        res.json({message: "Invalid ID specified"});
    }
    Content.where({
        id: id
    }).fetch().then(function(model) {
        res.json(model);
    });
};

module.exports = router;

