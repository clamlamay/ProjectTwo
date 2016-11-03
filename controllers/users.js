var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var bcrypt = require('bcryptjs');

/* GET users listing. */

router.get('/form', renderForm);
router.post('/register', createID);
router.get('/login', renderLogin);
router.post('/login', userLogin);
// router.get('/logout', renderLogout);
router.get('/logout', logOut);

function createID (req, res, next) {
    var password = req.body.password_hash;
    var salt = 10;
    var hash = bcrypt.hashSync(password, salt);
    var user = {
        username: req.body.username,
        password_hash: hash,
        email: req.body.email
    };
    var Model = new Account(user).save().then(function(result) {
        console.log(user);
        // res.render('Welcome');
        //   console.log(result.attributes.id);
        //   req.session.online = result.attributes.id;
        req.session.user_id = result.attributes.id ;
        req.session.username = result.attributes.username;
        req.session.isLoggedIn = true;
        // // res.redirect('/')
        //  console.log(req.session);
        // return result;
        res.redirect('/submit/upload-content')

    })
};

function userLogin (req, res, next) {
    //console.log(req.session.user);
    if (req.session.isLoggedIn === true) {
        res.redirect('/submit/upload-content');
        // res.end('is_already_logged_in');
    } else {
    // var password = req.body.password_hash;
    Account.where('username', req.body.username).fetch().then(
        function(result) {

            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);

            // *************
            // TEST CODE
            // var compareUser = compareUsername(req.body.username, result.attributes.username);

            console.log(attempt);
            // console.log(compareUser);

            if (!attempt ) {

                // ************************
                // HAVEN'T BEEN ABLE TO APPEND <P> TO THE BODY TO TELL USER THAT THEIR PASSWORD IS INCORRECT
                res.end('Your username or password is incorrect');

            } else {

                // END OF TEST CODE
                // ****************

                req.session.user_id = result.attributes.id;
                req.session.username = result.attributes.username;
                req.session.isLoggedIn = true;

                res.redirect('/submit/upload-content')
            }
        });
}};

function comparePasswordHashes (input, db) {
    // var hash = createPasswordHash(input);
    return bcrypt.compareSync(input, db);
};

// // COMPARING NAMES - TEST TEST TEST
// function compareUsername (input, db) {
//     // var hash = createPasswordHash(input);
//     return bcrypt.compareSync(input, db);
// };
// //************************


function renderForm (req, res, next) {
    res.render('form', {});
};
function renderLogin (req, res, next) {
    res.render('login', {});
};

// function renderLogout (req, res, next) {
//     req.session = null;
//     res.render('index', {});
// };

function logOut (req, res, next){
    req.session = null;
    console.log(req.session);
    res.render('logout', {});
};

module.exports = router;