import React from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

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
              <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <span className="text-xs text-gray-400">创建时间: {task.createdAt}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onToggle(task.id)} className="px-2 py-1 text-xs bg-blue-100 rounded">
                {task.completed ? '未完成' : '完成'}
              </button>
              <button onClick={() => onEdit(task)} className="px-2 py-1 text-xs bg-yellow-100 rounded">编辑</button>
              <button onClick={() => onDelete(task.id)} className="px-2 py-1 text-xs bg-red-100 rounded">删除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList; 