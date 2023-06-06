import { db } from '@/lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      //getTask
      return await getTask(req, res);
    case 'POST':
      return res.status(400).send('Method not allowed');
    default:
      return res.status(400).send('Method not allowed');
  }
}

const getTask = async (req, res) => {
  const id = req.query.taskId;
  const query = `SELECT * FROM todo WHERE id = ${id}`;

  try {
    console.log('req nom', req.query.taskId);
    const result = await db.query(query);
    await db.end();
    return res.status(200).json(result ? result[0] : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
