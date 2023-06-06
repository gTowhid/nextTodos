import { db } from '@/lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      //getTask
      return res.status(400).send('Method not allowed');
    case 'PATCH':
      if (req.body.data.type === 'text') {
        return await editTaskText(req, res);
      } else {
        return await editTaskChecked(req, res);
      }
    default:
      return res.status(400).send('Method not allowed');
  }
}

const editTaskText = async (req, res) => {
  const query = `UPDATE todo SET title = '${req.body.data.content}' WHERE id = ${req.query.taskId}`;

  try {
    console.log('req nom', req.body.data);
    const result = await db.query(query);
    await db.end();
    return res.status(200).json(result ? result : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editTaskChecked = async (req, res) => {
  const query = `UPDATE todo SET completed = ${req.body.data.content} WHERE id = ${req.query.taskId}`;

  try {
    console.log('req nom', req.body.data);
    const result = await db.query(query);
    await db.end();
    return res.status(200).json(result ? result : []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
