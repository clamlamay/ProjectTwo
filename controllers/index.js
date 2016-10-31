var express = require('express');
var ctrl = express.Router();
var AccountModel = require('../models/AccountModel');

/* GET home page. */
ctrl.get('/', function(req, res, next) {
  res.render('index', { title: 'Clam Bake' });
});


module.exports = ctrl;
