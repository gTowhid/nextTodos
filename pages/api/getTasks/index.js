import { db } from '@/lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      //getTask
      return await getTasks(req, res);
    case 'POST':
      return res.status(400).send('Method not allowed');
    default:
      return res.status(400).send('Method not allowed');
  }
}

const getTasks = async (req, res) => {
  const query = 'SELECT * FROM todo';

  try {
    const result = await db.query(query);
    await db.end();
    return res.status(200).json(result ? result : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
