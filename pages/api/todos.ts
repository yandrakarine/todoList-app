import { NextApiRequest, NextApiResponse } from 'next';
import { todoControllerServer } from '@server/controllers/todoControllerServer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    todoControllerServer.get(req, res);
    return;
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
