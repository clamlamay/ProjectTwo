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
    res.redirect('/upload-content');
 });
};

// function createID (req, res, next) {
//   console.log(req.session);
//   var password = req.body.password_hash;
//   var salt = 10;
//   var hash = bcrypt.hashSync(password, salt);
//   var user = {
//     username: req.body.username,
//     password_hash: hash,
//     email: req.body.email
//     };
//   var Model = new Account(user).save().then(function(result) {
//     // console.log(user);
//     // console.log(result.attributes.username);
//     req.session.username = result.attributes.username;
//     req.session.id = result.attributes.id;
//     req.session.isLoggedIn = true;
//     res.redirect('/upload-content');
//     console.log(this.username);
//  });
// };

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
            // console.log(this.username);
            // console.log(username);
            res.redirect('/upload-content');
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
  console.log(req.session);
  res.render('logout', {});
};

function renderSQL(req, res, next) {
  Content.collection().fetch().then(function(models) {
    res.json(models);
  });
};

function renderALL(req, res, next){
  Content.collection().fetch().then(function(models){
    console.log(models);
    res.render('all', models);
  });
};

function sanitizeModelsToJsonArray(dbModels){
  var ret = [];
  var models = dbModelsmodels;
  for (var item in dbModels) {
    var rows = dbModels.models[item];
    var attrs = row.attributes;
    ret.push(attrs);
  }
  ret;
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
        res.render('party', model.attributes);
    });
};

module.exports = router;

