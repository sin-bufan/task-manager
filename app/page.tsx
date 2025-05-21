'use client'
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from '@/lib/tasks';
import { useAuth } from './contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, signOut } = useAuth();
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
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 创建任务
  const handleCreate = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;
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
    }
  };

  // 编辑任务
  const handleEdit = (task: Task) => {
    if (!user) return;
    setEditingTask(task);
    setShowForm(true);
  };

  // 保存编辑
  const handleUpdate = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user || !editingTask) return;
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
    }
  };

  // 删除任务
  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // 切换任务状态
  const handleToggle = async (id: string) => {
    if (!user) return;
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
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">任务管理系统</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600">{user.email}</span>
                <button
                  onClick={signOut}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  退出登录
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>

        {showForm ? (
          <TaskForm
            initialTask={editingTask || undefined}
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditingTask(null); }}
          />
        ) : (
          <>
            {user && (
              <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => { setShowForm(true); setEditingTask(null); }}
              >
                新建任务
              </button>
            )}
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
              isAuthenticated={!!user}
            />
          </>
        )}
      </div>
    </main>
  );
}
