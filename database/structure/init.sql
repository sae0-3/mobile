create type user_role as enum ('client', 'dealer', 'admin');
create type auth_provider_type as enum ('local', 'google');

create table users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    name text,
    role user_role not null default 'client',
    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
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
    price numeric(5, 2) not null,
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
