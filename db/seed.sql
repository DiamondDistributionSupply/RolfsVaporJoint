create table admins (
    id serial primary key,
    email text not null,
    img text not null,
    auth_id text not null
);