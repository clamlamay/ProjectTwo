var express = require('express');
var ctrl = express.Router();
var AccountModel = require('../models/AccountModel');
var bcrypt = require('bcryptjs')


ctrl.get('/', function(req, res, next){
	res.render('index', {})
})

// ctrl.get('/something', function(req, res, next){
// 	// req.session.user = result.attributes.id;
//  //    req.session.isLoggedIn = true;
// 	// console.log(req.session.user)
// 	AccountModel.where({id:'result.attributes.id'}).fetch({withRelated: ['contents']})
// 	.then(function(user){
// 		console.log(user.attributes);
// 		// console.log(user.attributes.username);
// 		// name = user.attributes.username;
// 		// res.render('test', {});
// 	})
// });

module.exports = ctrl;
