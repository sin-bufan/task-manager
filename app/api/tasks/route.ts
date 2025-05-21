import { NextResponse } from 'next/server';
import { taskOperations } from '@/lib/supabase';

// GET /api/tasks - 获取所有任务
export async function GET() {
  try {
    const tasks = await taskOperations.getAllTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - 创建新任务
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const task = await taskOperations.createTask(body);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
} 