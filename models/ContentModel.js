/**
 * Created by jenniferbrown on 10/30/16.
 */
var bookshelf = require('./db')

//whatever table this table relates too, require other model
require('./AccountModel')

var Content = bookshelf.Model.extend({
    tableName: 'contents',
    user: function(){
        return this.belongsTo('Account')//refers to the table its related too
    }
});

module.exports = bookshelf.model('Content', Content);


// var db = require('./db'); // pulling in db.js
// /* We set up our ORM (bookshelf.js) and pass it our database (knex.js) */
// var bookshelf = require('bookshelf')(db);
//
// // Model correlates to a row in the DB
// // Collections correlate to tables in a DB
// // Bookshelf uses both of these terms
// var ContentModel = bookshelf.Model.extend({
//     tableName: 'content_table'
// });
//
// module.exports = ContentModel ;
