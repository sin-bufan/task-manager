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