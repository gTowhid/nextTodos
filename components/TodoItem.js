'use client';

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export default function TodoItem({ todo }) {
  const [completed, setCompleted] = useState(todo.completed);

  const handleChange = async (e) => {
    setCompleted(e.target.checked);

    let data = {
      content: completed ? 0 : 1,
      type: 'checked',
    };
    await axios.patch(`/api/editTask/${todo.id}`, { data });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`/api/deleteTask/${todo.id}`);
  };

  return (
    <div className="flex justify-between m-1 border rounded-lg p-1 pl-2 bg-blue-100">
      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          defaultChecked={todo.completed}
          onChange={(e) => handleChange(e)}
        />
        <p className={completed ? 'line-through' : ''}>{todo.title}</p>
      </div>
      <div>
        <Link href={`/edit/${todo.id}`}>
          <button className="btn-edit mr-3">Edit</button>
        </Link>
        <button className="btn-delete mr-3" onClick={(e) => handleDelete(e)}>
          Delete
        </button>
      </div>
    </div>
  );
}
