'use client'
import React, { useState, useEffect } from 'react';
import { Task } from './TaskList';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [completed, setCompleted] = useState(initialTask?.completed || false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setCompleted(initialTask.completed);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, completed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-bold">标题</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">描述</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={e => setCompleted(e.target.checked)}
          id="completed"
        />
        <label htmlFor="completed">已完成</label>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">保存</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-1 rounded">取消</button>
      </div>
    </form>
  );
};

export default TaskForm; 