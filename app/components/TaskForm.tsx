'use client'
import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/supabase';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>(initialTask?.status || 'pending');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialTask?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialTask?.due_date ? new Date(initialTask.due_date).toISOString().split('T')[0] : '');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setStatus(initialTask.status);
      setPriority(initialTask.priority);
      setDueDate(initialTask.due_date ? new Date(initialTask.due_date).toISOString().split('T')[0] : '');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description: description || null,
      status,
      priority,
      due_date: dueDate ? new Date(dueDate).toISOString() : null
    });
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
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">状态</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={status}
          onChange={e => setStatus(e.target.value as 'pending' | 'in_progress' | 'completed')}
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
          onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
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
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">保存</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-1 rounded">取消</button>
      </div>
    </form>
  );
};

export default TaskForm; 