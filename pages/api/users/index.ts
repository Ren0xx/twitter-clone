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
        res.status(400).end()
      }
        } catch (e) {
          res.status(400).end();
        }
}

