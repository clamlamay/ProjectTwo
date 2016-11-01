var express = require('express');
var ctrl = express.Router();
var AccountModel = require('../models/AccountModel');
var bcrypt = require('bcryptjs')


ctrl.get('/something', function (req, res, next){

	AccountModel.where({id:1}).fetch({withRelated: ['contents']})
	.then(function(user){
		res.json(user.related('contents'))
	})
})


module.exports = ctrl;
