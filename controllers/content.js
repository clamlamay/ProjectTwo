/**
 * Created by jenniferbrown on 10/30/16.
 */

var express = require('express');
var router = express();
var Content = require('../models/ContentModel');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/upload-content', renderForm);
// router.post('/upload', uploadFile);


function renderForm(req, res, next) {
    res.render('upload-content', {});
};

router.post('/upload-content', function(req, res, next) {
    console.log(req.session)
    new Content ({
        title: req.body.title,
        location: req.body.image_as_base64,
        comment: req.body.comment,
        user_id: req.session.user_id,
        username: req.session.username
    }).save()
        .then(function(result) {

            // // the below redirects to a new route
            // res.redirect('/')
            // // res.render('response2', result.attributes);
            // res.json(result);
        });

});

router.get('/all', renderALL);


function renderALL(req, res, next){
    Content.collection().fetch().then(function(models) {

        var posts = models.models;

        res.render('welcome', posts);

    })
}

module.exports = router ;