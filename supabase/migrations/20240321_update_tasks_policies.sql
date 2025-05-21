-- Drop existing policies
drop policy if exists "Allow all users to read tasks" on tasks;
drop policy if exists "Allow authenticated users to insert their own tasks" on tasks;
drop policy if exists "Allow users to update their own tasks" on tasks;
drop policy if exists "Allow users to delete their own tasks" on tasks;
drop policy if exists "Allow authenticated users to read all tasks" on tasks;
drop policy if exists "Allow authenticated users to insert any task" on tasks;
drop policy if exists "Allow authenticated users to update any task" on tasks;
drop policy if exists "Allow authenticated users to delete any task" on tasks;

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