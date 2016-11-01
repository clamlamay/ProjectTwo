var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var bcrypt = require('bcryptjs');


var identifier = 0 ;

/* GET users listing. */

router.get('/form', renderForm);
router.post('/register', createID);
router.get('/login', renderLogin);
router.post('/login', userLogin);
router.get('/logout', renderLogout);
//router.post('/logout', logOut);

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
        req.session.user = result.attributes.id ;
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
        res.end('is_already_logged_in');
    } else {
    // var password = req.body.password_hash;
    Account.where('username', req.body.username).fetch().then(
        function(result) {

            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
            // var id = result.attributes.id ;

            //res.json({'user_id_is': id });

            //console.log(req.session.id);
            // req.session.id = result.attributes.id;
            // req.session.username = result.attributes.username;
            req.session.user = result.attributes.id ;
            req.session.isLoggedIn = true;
            // console.log(req.session);


            // return result;
            // res.json({'is_logged_in': attempt, 'user_id_is': id   });
            res.redirect('/submit/upload-content')
        });
}};



function comparePasswordHashes (input, db) {
    // var hash = createPasswordHash(input);
    return bcrypt.compareSync(input, db);
};
function renderForm (req, res, next) {
    res.render('form', {});
};
function renderLogin (req, res, next) {
    res.render('login', {});
};

function renderLogout (req, res, next) {
    function logOut (req, res, next){
        req.session = null;
        // res.send([
        //     'You are now logged out.',
        //     '&lt;br/>',
        //     res.redirect('/')
        // ].join(''));
        console.log(req.session);
        // res.end('bye');
    };

    res.render('index', {});
};


module.exports = router;
