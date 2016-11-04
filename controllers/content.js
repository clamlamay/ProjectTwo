/**
 * Created by jenniferbrown on 10/30/16.
 */
var express = require('express');
var router = express();
var Content = require('../models/ContentModel');

router.get('/upload-content', renderForm);

//
// router.get('/upload-content', function(req, res, next) {
//     console.log(req.session);
// });



function renderForm(req, res, next) {
    console.log(req.session.isLoggedIn);
    if (!req.session.isLoggedIn) {
        res.redirect('../users/login');
    } else {
    res.render('upload-content', {});
}};



router.post('/upload-content', function(req, res, next) {
        new Content({
            title: req.body.title,
            image: req.body.image_as_base64,
            comment: req.body.comment,
            user_id: req.session.user_id,
            username: req.session.username
        }).save()
            .then(function (result) {


                // // the below redirects to a new route
                // res.redirect('/')
                // // res.render('response2', result.attributes);
                // res.json(result);
                res.redirect('./all');

            });
    // }
});


router.get('/all', renderALL);

function renderALL(req, res, next){
    Content.collection().fetch().then(function(models) {
        var posts = models.models;
        posts.reverse();
        res.render('welcome', posts);
    })
}

module.exports = router ;