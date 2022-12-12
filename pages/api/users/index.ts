import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method === 'POST'){

        const uid = req.body.uid as string;
        const user = await db.collection('users').doc(uid).set({
          ...req.body,
        });
        res.status(200).json({ user });
      }
      else {
        // const users = await db.collection('users').get();
        // const usersData = users.docs.map(user => user.data());
        // res.status(200).json(usersData);
        res.status(400).end()
      }
        } catch (e) {
          res.status(400).end();
        }
}

