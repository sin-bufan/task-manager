"use client";
import React, { use, useState } from "react";
import { deleteTask } from "@/lib/tasks/actions";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";
import { Task } from "@/lib/tasks/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const allTasks = use(tasks);
  const { user } = useAuth();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const handleEditSuccess = () => {
    setEditingTask(null);
  };

  return (
    <div className="space-y-4">
      {allTasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </div>
              {user && (
                <div className="flex space-x-2">
                  <Dialog open={editingTask?.id === task.id} onOpenChange={(open) => !open && setEditingTask(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        onClick={() => setEditingTask(task)}
                      >
                        编辑
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>编辑任务</DialogTitle>
                        <DialogDescription>
                          修改任务信息。点击保存按钮完成编辑。
                        </DialogDescription>
                      </DialogHeader>
                      <TaskForm task={task} onSuccess={handleEditSuccess} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => deleteTask(task.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    删除
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {task.description && (
              <CardDescription>
                {task.description}
              </CardDescription>
            )}
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority === "high" ? "高优先级" : 
                 task.priority === "medium" ? "中优先级" : "低优先级"}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status === "completed" ? "已完成" :
                 task.status === "in_progress" ? "进行中" : "待处理"}
              </span>
              {task.due_date && (
                <span className="px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  截止: {new Date(task.due_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
