"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";

const CreateTask: React.FC = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex items-center space-x-4">
      {user && (
        <Button
          onClick={() => setShowForm(true)}
          variant="default"
        >
          创建任务
        </Button>
      )}
      {showForm && <TaskForm />}
    </div>
  );
};

export default CreateTask;
