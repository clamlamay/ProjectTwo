// 'use strict';
// SET GLOBAL sql_mode='';

require('dotenv').config(); //# dot-env

var db = require('knex')({	//# knex
    client: 'mysql',
    connection: {
        host: process.env.DB_SERVER,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    }
});

// will help our models load correctly
var bookshelf = require('bookshelf')(db);

bookshelf.plugin('registry');

module.exports = bookshelf ;

// var db = require('knex')({	//# knex
//     client: 'mysql',
//     connection: {
//         host: 'localhost',
//         user: 'l33tdba',
//         password: 'w0rk5pac3',
//         database: 'cats_fansite'
//     }
// });

// module.exports = db;