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
// router.post('/register', attemptToRegister);

// router.post('/login', attemptToLogin);

function renderForm(req, res, next) {
  res.render('login', {});
};


// purpose: to recieve info from your form and then encryt it and put it in the DB
router.post('/login', function(req, res, next) {
  console.log(req.session);

  var password = req.body.password_hash;
  // to hash a password, we need to define a salt value and use the bcrypt library
  var salt = 10 ;
  var hash = bcrypt.hashSync(password, salt);
  console.log(hash);

  var user = new Account ({
    username: req.body.username,
    password_hash: hash,
    email: req.body.email
    })
      .save()
      .then(function(result) {
        // res.json(result)
        // the below redirects to a new route
        console.log('-----------');
        console.log(result.attributes.id)
        console.log('-----------');

        // attach the id to the session object (note, i can attach anything)
        req.session.theResultFromOurModelInsertion = result.attributes.id ;
        // something along these lines will allow you to show certain info ONLY to logged in users
        req.session.isLoggedIn = true;

        // res.redirect('/')
        res.render('response', result.attributes);

      });
});

// UNABLE TO GET THE BELOW WORKING YET.
// .get at the address of / will tell the browser where to look
router.get('/', function(req, res, next) {

  // we can use the session object to help query the current user
  // during login and registration is where we'll want to recognize users
  // when they logout, set session to null
  console.log(req.session)

  Account.where({id: req.session.theResultFromOurModelInsertion })
      .fetch()
      .then(function(user) {
        console.log(user.attributes);//puts info into the console
        //res.render() to GET your data
        //index is the page in the views folder to render info on
        // res.render('index', user.attributes);

        //   res.render('response', user.attributes);
      })
      // if we get any errors, the below will capture those errors and console them for you to see.
      .catch(function(error) {
        console.log(error);
      })


});

module.exports = router;

