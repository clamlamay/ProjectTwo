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

module.exports = db;