import React from 'react';
import { Task } from '@/lib/supabase';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggle }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-4 flex justify-between items-center">
            <div>
              <h3 className={`font-bold text-lg ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <div className="flex gap-2 text-xs text-gray-400">
                <span>优先级: {task.priority}</span>
                <span>状态: {task.status}</span>
                {task.due_date && <span>截止日期: {new Date(task.due_date).toLocaleDateString()}</span>}
                <span>创建时间: {new Date(task.created_at).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onToggle(task.id)} 
                className="px-2 py-1 text-xs bg-blue-100 rounded"
              >
                {task.status === 'completed' ? '标记未完成' : '标记完成'}
              </button>
              <button 
                onClick={() => onEdit(task)} 
                className="px-2 py-1 text-xs bg-yellow-100 rounded"
              >
                编辑
              </button>
              <button 
                onClick={() => onDelete(task.id)} 
                className="px-2 py-1 text-xs bg-red-100 rounded"
              >
                删除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList; 