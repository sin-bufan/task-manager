import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Task type definition
export type Task = {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    created_at: string;
    updated_at: string;
};

// Task operations
export const taskOperations = {
    // Get all tasks
    async getAllTasks() {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Task[];
    },

    // Get a single task
    async getTask(id: string) {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data as Task;
    },

    // Create a new task
    async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
        const { data, error } = await supabase
            .from('tasks')
            .insert([task])
            .select()
            .single();
        
        if (error) throw error;
        return data as Task;
    },

    // Update a task
    async updateTask(id: string, updates: Partial<Task>) {
        const { data, error } = await supabase
            .from('tasks')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data as Task;
    },

    // Delete a task
    async deleteTask(id: string) {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }
}; 