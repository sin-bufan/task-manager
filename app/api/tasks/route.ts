import { NextResponse } from 'next/server';
import { createTask, getAllTasks } from '@/lib/tasks/actions';
import { TaskOperationError } from '@/lib/tasks/types';

// GET /api/tasks - 获取所有任务
export async function GET() {
  try {
    const tasks = await getAllTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    if (error instanceof TaskOperationError) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - 创建新任务
export async function POST(request: Request) {
  try {
    const { title, description, status, priority, due_date } = await request.json();
    const task = await createTask({
      title,
      description,
      status,
      priority,
      due_date,
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error instanceof TaskOperationError) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 