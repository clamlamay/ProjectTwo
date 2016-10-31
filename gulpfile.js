'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');

// CREATE USER ACCOUNTS TABLE
gulp.task('db_create_user_account', function() {
    var sqlString = "create table user_account (" +
        "id int not null auto_increment, " +
        "username varchar(55) not null unique, " +
        "password varchar(20) not null, " +
        "email varchar (20) not null unique, " +
        "primary key (id)" +
        ");";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
});

// CREATE CONTENT TABLE
gulp.task('db_create_content_table', function() {
    var sqlString = "create table content_table (" +
        "id int not null auto_increment, " +
        "title varchar(255) not null, " +
        "location varchar(255) not null, " +
        "comment varchar(255) not null, " +
        "user_id int not null references users_account(id), " +
        "primary key(id)" +
        ");";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
});


// nodemon it up!
gulp.task('Nodemon', restartServer);

function restartServer() {
    nodemon({
        script: './bin/www',
        ext: 'js hbs scss sql'
    });
};

gulp.task('default', ['Nodemon']);