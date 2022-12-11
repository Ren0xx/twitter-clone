import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method === 'POST'){

        const {name, at, email} = req.body;
        
        const users = await db
        .collection('users')
        .get();
        const usersData = users.docs.map(user => user.data());
        const userAlreadyExists = usersData.some(user => user.name === name || user.email === email || user.at === at);
        if (userAlreadyExists) {
          res.status(400).end();
        } else {
          const { id } = await db.collection('users').add({
            ...req.body,
          });
          res.status(200).json({ id });
        }
      }
      else {
        const users = await db.collection('users').get();
        const usersData = users.docs.map(user => user.data());
        res.status(200).json(usersData);
      }
        } catch (e) {
          res.status(400).end();
        }
}

