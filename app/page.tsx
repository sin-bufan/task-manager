'use client'
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from '@/lib/supabase';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 获取任务列表
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // 这里可以添加错误提示
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 创建任务
  const handleCreate = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to create task');
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      // 这里可以添加错误提示
    }
  };

  // 编辑任务
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // 保存编辑
  const handleUpdate = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingTask) return;
    try {
      const res = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Failed to update task');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
      // 这里可以添加错误提示
    }
  };

  // 删除任务
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      // 这里可以添加错误提示
    }
  };

  // 切换任务状态
  const handleToggle = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update task status');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      // 这里可以添加错误提示
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">任务管理系统</h1>
      {showForm ? (
        <TaskForm
          initialTask={editingTask || undefined}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      ) : (
        <>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => { setShowForm(true); setEditingTask(null); }}
          >
            新建任务
          </button>
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </>
      )}
    </main>
  );
}
