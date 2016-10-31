'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');

gulp.task('db_create_user_table', function() {
  var sqlString = "create table users_account (" +
  "id int not null auto_increment," +
  "username varchar(55) not null unique," +
  "password varchar(20) not null," +
  "email varchar (20) not null unique," +
  "primary key (id)" +
  ");";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('db_drop_user_table', function() {
  var sqlString = "drop table users_account;";
  function cb(res) {
    console.log(res);
  }
  db.raw(sqlString).then(cb);
});

gulp.task('Nodemon', restartServer);

function restartServer() {
  nodemon({
    script: './bin/www',
    ext: 'js hbs scss sql'
  });
};

gulp.task('default', ['Nodemon']);
