/**
 * Created by jenniferbrown on 10/30/16.
 */
var express = require('express');
var router = express.Router();
var Content = require('../models/ContentModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/upload-content', renderForm);
// router.post('/upload', uploadFile);

function renderForm(req, res, next) {
    res.render('upload-content', {});
};


router.post('/upload-content', function(req, res, next) {

    new Content ({
        title: req.body.title,
        location: req.body.location,
        comment: req.body.comment,
        user_id: req.body.user_id
    })
        .save()
        .then(function(result) {
            // res.json(result)
            // the below redirects to a new route
            console.log('-----------');
            console.log(result.attributes.id)
            console.log('-----------');


            // res.redirect('/')
            res.render('response2', result.attributes);

        });
});

// function uploadFile (req, res, next) {
//
//     new Content({
//         title: req.body.title,
//         location: req.body.location,
//         comment: req.body.comment
//     }).save().then(function(result) {
//         //res.render
//         res.render('response2', result.attributes);
//         // res.json(result.attributes);
//     });
// };



module.exports = router;
