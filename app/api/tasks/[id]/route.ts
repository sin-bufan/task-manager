import { NextResponse } from 'next/server';
import { deleteTask, getTask, updateTask } from '@/lib/tasks/actions';
import { TaskOperationError } from '@/lib/tasks/types';

// GET /api/tasks/[id] - 获取单个任务
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const task = await getTask(id);
        if (!task) {
            return NextResponse.json(
                { error: 'Task not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        if (error instanceof TaskOperationError) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'Failed to fetch task' },
            { status: 500 }
        );
    }
}

// PUT /api/tasks/[id] - 更新任务
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await request.json();
        const { id } = await params;
        const task = await updateTask(id, body);
        return NextResponse.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        if (error instanceof TaskOperationError) {
            if (error.message === 'Unauthorized') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id] - 删除任务
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteTask(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting task:', error);
        if (error instanceof TaskOperationError) {
            if (error.message === 'Unauthorized') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        );
    }
} 