'use strict';

require('dotenv').config(); 

var db = require('knex')({  
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'clambake'
  }
});

var bookshelf = require('bookshelf')(db)

bookshelf.plugin('registry')

module.exports = bookshelf;