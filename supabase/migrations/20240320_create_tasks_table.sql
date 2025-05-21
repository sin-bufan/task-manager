-- Create tasks table
create table if not exists tasks (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    status text not null default 'pending',
    priority text not null default 'medium',
    due_date timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create index on status for faster queries
create index if not exists tasks_status_idx on tasks(status);

-- Enable Row Level Security (RLS)
alter table tasks enable row level security;

-- Create policy to allow all operations for authenticated users
create policy "Enable all operations for authenticated users" on tasks
    for all
    to authenticated
    using (true)
    with check (true);

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