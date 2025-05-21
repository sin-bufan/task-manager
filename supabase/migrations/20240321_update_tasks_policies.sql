-- Drop existing policies
drop policy if exists "Allow all users to read tasks" on tasks;
drop policy if exists "Allow authenticated users to insert their own tasks" on tasks;
drop policy if exists "Allow users to update their own tasks" on tasks;
drop policy if exists "Allow users to delete their own tasks" on tasks;

-- Create new policies that allow all authenticated users to perform all operations
create policy "Allow authenticated users to read all tasks"
    on tasks for select
    to authenticated
    using (true);

create policy "Allow authenticated users to insert any task"
    on tasks for insert
    to authenticated
    with check (true);

create policy "Allow authenticated users to update any task"
    on tasks for update
    to authenticated
    using (true)
    with check (true);

create policy "Allow authenticated users to delete any task"
    on tasks for delete
    to authenticated
    using (true); 