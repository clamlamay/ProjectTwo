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
        user_id: req.session.user
    }).save()
        .then(function(result) {

            // // the below redirects to a new route
            res.redirect('/')
            // // res.render('response2', result.attributes);
            // res.json(result);
        });

});


// router.get('/', function(req, res, next) {
//     res.sendFile('response2');
// });






// // THE BELOW WILL UPLOAD A PICTURE. THE FORM FUNCTIONALITY FAILS
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
//
//
// router.get('/upload-content', renderForm);
// // router.post('/upload', uploadFile);
//
// function renderForm(req, res, next) {
//     res.render('upload-content', {});
// };
//
//
// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './public/images');
//     },
//     filename: function (req, file, callback) {
//         console.log(file);
//         callback(null, file.originalname)
//     }
// });
//
// // var upload = multer({storage: storage}).single('photo');
// var upload = multer({storage: storage}).single('img1');
//
//
// router.get('/', function(req, res, next) {
//     res.sendFile('response2');
// });
//
// // WILL NEED TO WORK ON A WAY TO POST THE NEW CONTENT SO IT SHOWS UP IMMEDIATELY
// //Posting the file upload
// router.post('/upload-content', function(req, res, next) {
//     upload(req, res, function(err) {
//         if(err) {
//             console.log('Error Occured');
//             return;
//         }
//         console.log(req.file);
//         //res.end('Your File Uploaded');
//         console.log('Photo Uploaded');
//     })
//
// // added this.  does not currently work.
//     new Content ({
//         title: req.body.title,
//         location: req.body.file_name,
//         comment: req.body.comment,
//         user_id: req.session.user
//     })
//         .save()
//         .then(function(result) {
//             // res.json(result)
//             // the below redirects to a new route
//             console.log('-----------');
//             console.log(result.attributes.id)
//             console.log('-----------');
//
//         });
//
// });


// // THE BELOW POPULATES THE FORM W/O THE PICTURE
//
// var express = require('express');
// var router = express.Router();
// var Content = require('../models/ContentModel');
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
//
// router.get('/upload-content', renderForm);
// // router.post('/upload', uploadFile);
//
// function renderForm(req, res, next) {
//     res.render('upload-content', {});
// };
//
// //session.user.ModelBase.attributes.id
// router.post('/upload-content', function(req, res, next) {
//     console.log(req.session)
//     new Content ({
//         title: req.body.title,
//         location: req.body.location,
//         comment: req.body.comment,
//         user_id: req.session.user
//     }).save()
//         .then(function(result) {
//             // res.json(result)
//             // the below redirects to a new route
//             console.log('-----------');
//             console.log(result)
//             console.log('-----------');
//
//
//             // res.redirect('/')
//             res.render('response2', result.attributes);
//
//         });
// });
//
// // function uploadFile (req, res, next) {
// //
// //     new Content({
// //         title: req.body.title,
// //         location: req.body.location,
// //         comment: req.body.comment
// //     }).save().then(function(result) {
// //         //res.render
// //         res.render('response2', result.attributes);
// //         // res.json(result.attributes);
// //     });
// // };



module.exports = router ;