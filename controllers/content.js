/**
 * Created by jenniferbrown on 10/30/16.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var Content = require('../models/ContentModel');
var Account = require('../models/AccountModel');


router.get('/upload-content', renderForm);
router.post('/upload-content', postContent);

router.get('/all', renderALL);


function renderForm (req, res, next) {
    res.render('upload-content', {});
};

function postContent (req, res, next) {
        Account.where({id:req.session.user})
        .fetch({withRelated: ['contents']});
        var entry = new Content ({
            title: req.body.title,
            image: req.body.image_as_base64,
            comment: req.body.comment,
            user_id: req.session.user_id,
            username: req.session.username
        })
            .save()
            .then(function(result) {
                res.render('post', {});
                console.log(entry)
            });
};

function renderALL(req, res, next){
  Content.collection().fetch().then(function(models){
    var posts = models.models;
    // console.log(posts.attributes.username)
    res.render('welcome', posts);
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

module.exports = router;