"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import TaskForm from "./TaskForm";

const CreateTask: React.FC = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex items-center space-x-4">
      {user && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
        >
          创建任务
        </button>
      )}
      {showForm && <TaskForm />}
    </div>
  );
};

export default CreateTask;
