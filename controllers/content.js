/**
 * Created by jenniferbrown on 10/30/16.
 */
var express = require('express');
var router = express.Router();
var Content = require('../models/ContentModel');
var Account = require('../models/AccountModel');

// var post = req.session.isLoggedIn;

router.get('/upload-content', renderForm);
router.post('/upload-content', postContent);
// router.post('/upload', uploadFile);

function renderForm (req, res, next) {
    res.render('upload-content', {});
};

function postContent (req, res, next) {
    
    Account.where({id:req.session.user}).fetch({withRelated: ['contents']});
        var entry = new Content ({
            title: req.body.title,
            location: req.body.location,
            comment: req.body.comment,
            user_id: req.session.user
        })
            .save()
            .then(function(result) {
                res.render('post', {});
                console.log(req.session.user)

            });
};





// AccountModel.where({id:1}).fetch({withRelated: ['contents']})
//     .then(function(user){
//         res.json(user.related('contents'))
//     })
// })


module.exports = router;