/**
 * Created by jenniferbrown on 10/30/16.
 */

var db = require('./db'); // pulling in db.js
/* We set up our ORM (bookshelf.js) and pass it our database (knex.js) */
var bookshelf = require('bookshelf')(db);

// Model correlates to a row in the DB
// Collections correlate to tables in a DB
// Bookshelf uses both of these terms
var ContentModel = bookshelf.Model.extend({
    tableName: 'content_table'
});

module.exports = ContentModel ;


