'use client';

import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('api/getTasks');
      const data = response.data;
      return data;
    };

    async function getData() {
      const fetchedData = await fetchData();
      setTodos(fetchedData);
    }
    getData();
  }, []);

  return (
    <div className="min-w-1/2">
      {todos?.length !== 0
        ? todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        : 'NO TODOS TO SHOW'}
    </div>
  );
}
