"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
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

const CreateTask: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleTaskCreated = () => {
    setOpen(false);
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size={"lg"}>
          创建任务
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新任务</DialogTitle>
          <DialogDescription>
            填写以下信息来创建一个新的任务。点击保存按钮完成创建。
          </DialogDescription>
        </DialogHeader>
        <TaskForm onSuccess={handleTaskCreated} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
