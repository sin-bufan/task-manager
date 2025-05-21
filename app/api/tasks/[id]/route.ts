import { NextResponse } from 'next/server';
import { taskOperations } from '@/lib/supabase';

// GET /api/tasks/[id] - 获取单个任务
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const task = await taskOperations.getTask(params.id);
        if (!task) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        return NextResponse.json(
            { error: 'Failed to fetch task' },
            { status: 500 }
        );
    }
}

// PUT /api/tasks/[id] - 更新任务
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const task = await taskOperations.updateTask(params.id, body);
        if (!task) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id] - 删除任务
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await taskOperations.deleteTask(params.id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        );
    }
} 