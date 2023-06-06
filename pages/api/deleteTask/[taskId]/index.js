import { db } from '@/lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      //getTask
      return res.status(400).send('Method not allowed');
    case 'DELETE':
      return await deleteTask(req, res);
    default:
      return res.status(400).send('Method not allowed');
  }
}

const deleteTask = async (req, res) => {
  const query = `DELETE FROM todo WHERE id=${req.query.taskId}`;

  try {
    console.log('req nom', req.query.taskId);
    const result = await db.query(query);
    await db.end();
    return res.status(200).json(result ? result : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
