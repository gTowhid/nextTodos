import { db } from '@/lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      //getTask
      return res.status(400).send('Method not allowed');
    case 'POST':
      return await setTask(req, res);
    default:
      return res.status(400).send('Method not allowed');
  }
}

const setTask = async (req, res) => {
  const query = 'INSERT INTO todo(title) VALUES(?)';
  const values = [req.body.content];

  try {
    console.log('req nom', req.body);
    const result = await db.query(query, values);
    await db.end();
    return res.status(200).json(result ? result : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
