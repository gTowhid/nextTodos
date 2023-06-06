import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Edit() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const taskId = router.query.taskId;

  useEffect(() => {
    const fetchData = async () => {
      if (taskId) {
        try {
          const response = await axios.get(`/api/getTask/${taskId}`);
          const data = response.data;
          return data;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Task ID not found!!!');
      }
    };

    async function getData() {
      const fetchedData = await fetchData();
      setValue(fetchedData?.title);
    }
    getData();
  }, [taskId]);

  const handleClick = async (e) => {
    e.preventDefault();

    let data = { content: value, type: 'text' };
    await axios.patch(`/api/editTask/${taskId}`, { data });

    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <header className="w-1/2 flex justify-around border rounded-lg pt-3 pb-3 bg-blue-200">
        <h1 className="text-3xl font-bold">Edit Todo</h1>
      </header>

      <div className="flex w-1/2 justify-between m-1 border rounded-lg p-1 pl-2 bg-blue-100">
        <input
          type="text"
          className="w-full m-2 p-2 rounded-lg"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button className="btn-primary" onClick={(e) => handleClick(e)}>
        Update Todo
      </button>
    </div>
  );
}
