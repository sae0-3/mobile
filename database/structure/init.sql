create table users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    name text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table auth_providers (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references users(id) on delete cascade,
    provider text not null check(provider in ('local', 'google')),
    provider_user_id text,
    password_hash text,
    created_at timestamp default now(),
    updated_at timestamp default now(),

    unique(user_id, provider)
);
