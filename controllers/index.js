var express = require('express');
var router = express.Router();
var AccountModel = require('../models/AccountModel');
var bcrypt  = require('bcryptjs');

// Example to show HOW foreign keys work
router.get('/something', function (req, res, next){
AccountModel.where({id:1}).fetch({withRelated: ['contents']})
   .then(function(user){
        res.json(user.related('contents'))
      })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//
//
// router.get('/home', renderSQL);
// router.get('/form', renderForm);
// // router.post('/create', insertIntoParties);
//
// function renderSQL(req, res, next) {
//   // call my collection of rows (table)
//   AccountModel.collection().fetch().then(function(models) {
//     // res.render('all', models);
//     res.json(models);
//   });
// };
//
// function renderForm(req, res, next) {
//   res.render('form', {
//
//   });
// };
//
// // function insertIntoParties(req, res, next) {
// //   console.log(req.body);
// //
// //
// //   var model = new AccountModel(req.body)
// //       .save()
// //       .then(function(data) {
// //         res.render('success', data.attributes);
// //
// //       });
// //   // if you never res.json, send, render....
// //   // the server never finishes the request
// //   // so express freezes forever until ctrl-c
// //   // res.json(req.body);
// //
// // };
// module.exports = router;
