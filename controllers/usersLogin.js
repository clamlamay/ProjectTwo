var express = require('express');
var router = express.Router();
var Account = require('../models/AccountModel');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// get requests show content
// post requests take content from req.params && req.body
// and then can res.json the result (or res.render, etc)
// router.post('/create', insertIntoParties);
router.get('/login', renderForm);

router.post('/login', attemptToLogin);

function renderForm(req, res, next) {
  res.render('login', {});
};


// purpose: to recieve info from your form and then encrypt it and put it in the DB
router.post('/login', function(req, res, next) {
    console.log(req.session);
})



// function attemptToLogin(req, res, next) {
//     var password = req.body.password_hash;
//     Account.where({username: req.session.theResultsFromOurModelInsertion})
//         .fetch()
//         .then(
//         function (result) {
//             var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
//             req.session.theResultsFromOurModelInsertion = result.attributes.username;
//             if (attempt === true) {
//                 res.json({'is_logged_in': attempt });
//             }
//             else {
//                 res.json({'is_logged_in': attempt });
//             }
//             // res.json({'is_logged_in': attempt});
//         })};

function attemptToLogin(req, res, next) {
    var password = req.body.password_hash;
    // who is our user?
    Account.where('username', req.body.username)
        .fetch()
        .then(
        function(result) {
            // we now have our user: result
            // next, we need their password! (to compare it)
            // bcrypt.compareSync(password, hash); // returns true/false
            // console.log(result);
            // model attributes on results are sometimes stored on results.attributes
            var attempt = comparePasswordHashes(req.body.password_hash, result.attributes.password_hash);
            // then we share the results
            res.json({'is_logged_in': attempt });
        }
    )
};

function comparePasswordHashes (input, db) {
    //   var hash = createPasswordHash(input);
    return bcrypt.compareSync(input, db);
}

module.exports = router ;