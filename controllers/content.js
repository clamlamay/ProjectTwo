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
// router.post('/upload', uploadFile);

//test routers
router.get('/home', renderSQL);
router.get('/all', renderALL);
router.get('/:id', renderPartyById);


function renderForm (req, res, next) {
    res.render('upload-content', {username: req.session.username});
};

function postContent (req, res, next) {
        Account.where({id:req.session.user}).fetch({withRelated: ['contents']});
        var entry = new Content ({
            title: req.body.title,
            location: req.body.location,
            comment: req.body.comment,
            user_id: req.session.user_id,
            username: req.session.username
            // image: entry.filename
        })
            .save()
            .then(function(result) {
                res.render('post', {});
                console.log(entry)

            });
};

function renderSQL(req, res, next) {
  Content.collection().fetch().then(function(models) {
    res.json(models);
  });
};

function renderALL(req, res, next){
  Content.collection().fetch().then(function(models){
    // console.log(models.models);
    var posts = models.models;
    console.log(posts[16].attributes.username)
    res.render('welcome', posts);
});
  // });
  // Account.collection().fetch({withRelated: 'contents'})
  //   .then(function(theStuff){
     

  //       console.log(theStuff.models.length)
  //       console.log(theStuff.models[0].attributes.username)
  //       console.log(theStuff.models[0].related('contents').models)
  //        console.log('-----------------------------------')
  //       var posts = {};

  //       posts.username = theStuff.models;
  //       posts.contents = theStuff.models[0].related('contents').models
  //       console.log('-----------------------------------')
  //       res.render('welcome', posts)
  //   })
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
    // var id = parseInt(req.params.id);
    // if (typeof id != 'number') {
    //     res.json({message: "Invalid ID specified"});
    // }
    // Content.where({
    //     id: id
    // }).fetch().then(function(model) {
    //     console.log(model)
    //     res.render('party', model.attributes);
    //     // res.json(model.attributes);

    // });
    res.send('hi')
};




module.exports = router;