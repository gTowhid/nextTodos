import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Add() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    let data = { content: value };
    await axios.post('/api/addTask', data);

    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <header className="w-1/2 flex justify-around border rounded-lg pt-3 pb-3 bg-blue-200">
        <h1 className="text-3xl font-bold">Add New Todo</h1>
      </header>

      <div className="flex w-1/2 justify-between m-1 border rounded-lg p-1 pl-2 bg-blue-100">
        <input
          type="text"
          placeholder="Enter new task to add..."
          className="w-full m-2 p-2 rounded-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={(e) => handleClick(e)}>
        Add New
      </button>
    </div>
  );
}
