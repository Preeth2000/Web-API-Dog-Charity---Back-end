create table messages
(
	ID int,
	userID int not null,
	username text null,
	title text null,
	paragraph text null,
	response text null,
	constraint messages_users_ID_fk
		foreign key (userID) references users (ID)
);

create unique index messages_ID_uindex
	on messages (ID);

alter table messages
	add constraint messages_pk
		primary key (ID);

alter table messages modify ID int auto_increment;
