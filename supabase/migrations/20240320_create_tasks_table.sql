-- Create tasks table
create table if not exists tasks (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    status text not null default 'pending',
    priority text not null default 'medium',
    due_date timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    user_id uuid references auth.users(id) on delete cascade
);

-- Create index on status for faster queries
create index if not exists tasks_status_idx on tasks(status);

-- Create index on user_id for faster queries
create index if not exists tasks_user_id_idx on tasks(user_id);

-- Enable Row Level Security (RLS)
alter table tasks enable row level security;

-- Create policy to allow all users to read tasks
create policy "Allow all users to read tasks"
    on tasks for select
    to authenticated, anon
    using (true);

-- Create policy to allow authenticated users to insert their own tasks
create policy "Allow authenticated users to insert their own tasks"
    on tasks for insert
    to authenticated
    with check (auth.uid() = user_id);

-- Create policy to allow users to update their own tasks
create policy "Allow users to update their own tasks"
    on tasks for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Create policy to allow users to delete their own tasks
create policy "Allow users to delete their own tasks"
    on tasks for delete
    to authenticated
    using (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_tasks_updated_at
    before update on tasks
    for each row
    execute function update_updated_at_column(); 