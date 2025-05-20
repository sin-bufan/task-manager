'use client'
import React, { useEffect, useState } from 'react';
import TaskList, { Task } from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  // 获取任务列表
  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 创建任务
  const handleCreate = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    setShowForm(false);
    fetchTasks();
  };

  // 编辑任务
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // 保存编辑
  const handleUpdate = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editingTask, ...task }),
    });
    setEditingTask(null);
    setShowForm(false);
    fetchTasks();
  };

  // 删除任务
  const handleDelete = async (id: string) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  };

  // 切换完成状态
  const handleToggle = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    fetchTasks();
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
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
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
