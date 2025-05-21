"use server";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { revalidatePath } from "next/cache";
// Task type definition
export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
};

// Custom error type for task operations
class TaskOperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TaskOperationError";
  }
}

// Task operations
// 获取所有任务（允许匿名访问）
export async function getAllTasks() {
  const supabase = await createBrowserClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new TaskOperationError(error.message);
  return data as Task[];
}

// 获取单个任务（允许匿名访问）
export async function getTask(id: string) {
  const supabase = await createBrowserClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new TaskOperationError(error.message);
  return data as Task;
}

// 创建新任务（需要认证）
export async function createTask(
  task: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">
) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new TaskOperationError("Unauthorized");

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        ...task,
        user_id: user.id,
      },
    ])
    .select()
    .single();
  console.log(data, error);
  if (error) throw new TaskOperationError(error.message);
  revalidatePath('/')
  return data as Task;
}

// 更新任务（需要认证）
export async function updateTask(id: string, updates: Partial<Task>) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new TaskOperationError("Unauthorized");

  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new TaskOperationError(error.message);
  revalidatePath('/')
  return data as Task;
}

// 删除任务（需要认证）
export async function deleteTask(id: string) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new TaskOperationError("Unauthorized");

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw new TaskOperationError(error.message);
  revalidatePath('/')
}
