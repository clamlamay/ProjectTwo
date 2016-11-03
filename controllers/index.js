var express = require('express');
var router = express.Router();
var AccountModel = require('../models/AccountModel');
var ContentModel = require('../models/ContentModel');


// Example to show HOW foreign keys work
router.get('/', function(req, res, next){
    res.render('index', {})
})
router.get('/test', function(req, res, next){
    AccountModel.where({id: 3}).fetch({withRelated: ['contents']})
        .then(function(user){
            //res.json(user.related('contents'))


           res.render('response2', user.attributes)
        })
});


module.exports = router;


