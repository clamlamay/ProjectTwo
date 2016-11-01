var bookshelf = require('./db')

//whatever table this table relates too, require other model
require('./ContentModel')

var Account = bookshelf.Model.extend({
    tableName: 'users',
    contents: function(){
        return this.hasMany('Content')//refers to the table its related too
    }
});

// module.exports = AccountModel;

module.exports = bookshelf.model('Account', Account);



// var db = require('./db'); // pulling in db.js
// /* We set up our ORM (bookshelf.js) and pass it our database (knex.js) */
// var bookshelf = require('bookshelf')(db);
//
// // Model correlates to a row in the DB
// // Collections correlate to tables in a DB
// // Bookshelf uses both of these terms
// var AccountModel = bookshelf.Model.extend({
//     tableName: 'users_accounts'
// });
//
// module.exports = AccountModel ;
