create database clambake;
use clambake;

create table users (
	id int not null auto_increment,
	username varchar(55) not null unique,
	password_hash varchar(61) not null,
	email varchar (75) not null unique,
	primary key (id)
);

create table contents (
	id int not null auto_increment,
	title varchar(255) not null ,
	image LONGTEXT not null,
	comment varchar(255) not null,
	username varchar(100),
	user_id int references users(id),
	primary key(id)
);

insert into contents (id, title, location, comment, user_id, image) values ('1', 'cat', 'cat cat', 'meow', '1', 'yahoo.jpg');
insert into contents (id, title, location, comment, user_id, image) values ('2', 'dog', 'dog dog', 'woof', '2', 'yahoo.jpg');

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