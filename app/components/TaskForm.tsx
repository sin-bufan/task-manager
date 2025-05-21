"use client";
import { createTask, Task, updateTask } from "@/lib/tasks/actions";
import React, { useState } from "react";

interface TaskFormProps {
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<"pending" | "in_progress" | "completed">(
    task?.status || "pending"
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task?.priority || "medium"
  );
  const [dueDate, setDueDate] = useState(task?.due_date || "");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task.id, {
          title,
          description: description || null,
          status,
          priority,
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
        });
      } else {
        await createTask({
          title,
          description: description || null,
          status,
          priority,
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
        });
      }

      // 重置表单
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");
      setDueDate("");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-bold">标题</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">描述</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">状态</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "pending" | "in_progress" | "completed")
          }
        >
          <option value="pending">待处理</option>
          <option value="in_progress">进行中</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-bold">优先级</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-bold">截止日期</label>
        <input
          type="date"
          className="w-full border px-2 py-1 rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          保存
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
