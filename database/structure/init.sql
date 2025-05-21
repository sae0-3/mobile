create type auth_provider_type as enum ('local', 'google');
create type order_status as enum ('pending', 'in_progress', 'delivered', 'cancelled');
create type vehicle_type as enum ('motorcycle', 'bicycle', 'car');

create table users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

create table admins (
    user_id uuid primary key references users(id) on delete cascade
);

create table dealers (
    user_id uuid primary key references users(id) on delete cascade,
    name text not null,
    vehicle vehicle_type not null
);

create table clients (
    user_id uuid primary key references users(id) on delete cascade,
    name text not null,
    phone varchar(8)
);

create table user_address (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references users(id) on delete cascade,
    address text not null,
    latitud decimal(9,6),
    longitud decimal(9,6),
    created_at timestamp default now()
);

create table auth_providers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references users(id) on delete cascade,
    provider auth_provider_type not null,
    provider_user_id text,
    password_hash text,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    unique(user_id, provider)
);

create table branches (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    address text not null,
    phone varchar(8),
    open_hour time,
    close_hour time
);

create table categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    visible boolean not null default true,
    display_order integer not null default 0
);

create table products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    img_reference text,
    price numeric(10, 2) not null,
    available boolean not null default true,
    ingredients json,
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    visible boolean not null default true,
    display_order integer not null default 0
);

create table product_categories (
    product_id uuid not null references products(id) on delete cascade,
    category_id uuid not null references categories(id) on delete cascade,
    primary key (product_id, category_id)
);

create table orders (
    id uuid primary key default gen_random_uuid(),
    client_id uuid not null references clients(user_id) on delete set null,
    user_address_id uuid not null references user_address(id) on delete set null,
    delivery_id uuid references dealers(user_id),
    status order_status not null default 'pending',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now(),
    total numeric(10,2) not null
);

create table order_details (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references orders(id) on delete cascade,
    product_id uuid not null references products(id),
    quantity int not null,
    subtotal numeric(10,2) not null
);



-- ADMIN
with new_user as (
    insert into users (email)
    values ('admin@gmail.com')
    returning id
),
new_admin as (
    insert into admins (user_id)
    select id from new_user
),
new_auth as (
    insert into auth_providers (user_id, provider, password_hash)
    select id, 'local', '$2b$10$6OaPiCQw1l9VhwMyQB2HSuw0UuOGF7JCbkLRprwKO7x.pF4Xv27Im' -- Contra_1234
    from new_user
)
select * from new_user;

