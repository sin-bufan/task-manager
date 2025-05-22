"use client";
import { useState } from "react";
import { Task } from "@/lib/tasks/types";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditTaskProps {
  task: Task;
}

export default function EditTask({ task }: EditTaskProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEditSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
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
  );
} 