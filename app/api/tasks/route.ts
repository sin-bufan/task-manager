import { NextRequest, NextResponse } from 'next/server';

let tasks: any[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const { title, description, completed } = await req.json();
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    completed: !!completed,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, title, description, completed } = await req.json();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  tasks[idx] = { ...tasks[idx], title, description, completed };
  return NextResponse.json(tasks[idx]);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const deleted = tasks.splice(idx, 1)[0];
  return NextResponse.json(deleted);
} 