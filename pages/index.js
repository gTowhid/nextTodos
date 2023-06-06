import Link from 'next/link';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-800">
      <header className="w-1/2 flex justify-around border rounded-lg pt-3 pb-3 bg-blue-200">
        <h1 className="text-3xl font-bold">Things To Do</h1>
        <Link href="/add">
          <button className="btn-primary">Add New</button>
        </Link>
      </header>
      <TodoList />
    </div>
  );
}
