import UserAuthButtons from "./components/UserAuthButtons";
import { getAllTasks } from "@/lib/tasks/actions";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";

export default async function Home() {
  const tasks = getAllTasks();
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">任务管理系统</h1>
          <UserAuthButtons />
        </div>
          <div className="mb-8">
            <CreateTask />
          </div>

        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
