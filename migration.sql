create database clambake;
use clambake;

create table users_accounts (
	id int not null auto_increment,
	username varchar(55) not null unique,
	password_hash varchar(61) not null,
	email varchar (75) not null unique,
	primary key (id)
);

create table content_table (
	id int not null auto_increment,
	title varchar(255) not null,
	location varchar(255) not null,
	comment varchar(255) not null,
	user_id int not null references users_account(id),
	primary key(id)
);

create user 'admin'@'localhost' identified by 'admin';
GRANT ALL PRIVILEGES ON clambake.* to 'admin'@'localhost';


gulp.task('db_create_user_table', function() {
  var sqlString = "create table users_account (" +
  "id int not null auto_increment," +
  "username varchar(55) not null unique," +
  "password varchar(20) not null," +
  "email varchar (20) not null unique," +
  "primary key (id)" +
  ");";