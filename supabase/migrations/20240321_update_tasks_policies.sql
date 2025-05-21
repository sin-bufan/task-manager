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

-- Create new policies that allow all operations
create policy "Allow all users to read tasks"
    on tasks for select
    to authenticated, anon
    using (true);

create policy "Allow authenticated users to insert any task"
    on tasks for insert
    to authenticated
    with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update any task"
    on tasks for update
    to authenticated
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete any task"
    on tasks for delete
    to authenticated
    using (auth.role() = 'authenticated'); 

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