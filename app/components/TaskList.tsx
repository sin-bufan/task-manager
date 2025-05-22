"use client";
import React, { use, useState } from "react";
import { deleteTask } from "@/lib/tasks/actions";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";
import { Task } from "@/lib/tasks/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const allTasks = use(tasks);
  const { user } = useAuth();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "pending":
        return "bg-muted text-muted-foreground hover:bg-muted/80";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  const handleEditSuccess = () => {
    setEditingTask(null);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setDeletingTaskId(null);
    } catch (error) {
      console.error('删除任务失败:', error);
    }
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
                  <AlertDialog open={deletingTaskId === task.id} onOpenChange={(open) => !open && setDeletingTaskId(null)}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        onClick={() => setDeletingTaskId(task.id)}
                      >
                        删除
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认删除</AlertDialogTitle>
                        <AlertDialogDescription>
                          您确定要删除这个任务吗？此操作无法撤销。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingTaskId(null)}>
                          取消
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          删除
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
              <Badge
                variant="secondary"
                className={getPriorityColor(task.priority)}
              >
                {task.priority === "high" ? "高优先级" : 
                 task.priority === "medium" ? "中优先级" : "低优先级"}
              </Badge>
              <Badge
                variant="secondary"
                className={getStatusColor(task.status)}
              >
                {task.status === "completed" ? "已完成" :
                 task.status === "in_progress" ? "进行中" : "待处理"}
              </Badge>
              {task.due_date && (
                <Badge
                  variant="secondary"
                  className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                >
                  截止: {new Date(task.due_date).toLocaleDateString('zh-CN')}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
