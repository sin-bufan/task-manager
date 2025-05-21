"use client";
import React, { use, useState } from "react";
import { deleteTask } from "@/lib/tasks/actions";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";
import { Task } from "@/lib/tasks/types";

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const allTasks = use(tasks);
  const { user } = useAuth();
  const [editTask, setEditTask] = useState<Task|null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {allTasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {task.title}
              </h3>
              <p className="mt-1 text-gray-600">{task.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
                {task.due_date && (
                  <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    截止: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {user && (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setEditTask(task)}
                  className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  编辑
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  删除
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {editTask && <TaskForm task={editTask} />}
    </div>
  );
};

export default TaskList;
