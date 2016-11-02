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
	location varchar(255) not null,
	comment varchar(255) not null,
	user_id int not null references users(id),
	primary key(id)
);


create table contents (
	id int not null auto_increment,
	title varchar(255) not null ,
	location text not null,
	comment varchar(255) not null,
	user_id int not null references users(id),
	primary key(id)
);

insert into contents (id, title, location, comment, user_id) values ('1', 'cat', 'cat cat', 'meow', '1');


create user 'admin'@'localhost' identified by 'admin';
GRANT ALL PRIVILEGES ON clambake.* to 'admin'@'localhost';

SELECT contents, comment
	FROM `columns`
	WHERE IS_NULLABLE = 'NO'
		AND COLUMN_DEFAULT IS NULL
		AND TABLE_SCHEMA= 'clambake';