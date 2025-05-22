"use client";
import React, { use } from "react";
import { useAuth } from "../contexts/AuthContext";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { Task } from "@/lib/tasks/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TaskListProps {
  tasks: Promise<Task[]>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const allTasks = use(tasks);
  const { user } = useAuth();

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
                  <EditTask task={task} />
                  <DeleteTask taskId={task.id} />
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
