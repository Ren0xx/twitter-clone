import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      if (req.method === 'POST'){

        const { id } = await db.collection('posts').add({
          ...req.body,
        });
        res.status(200).json({ id });
      }
      else {
        const snapshot = await db.collection('posts').get();
        const posts = snapshot.docs.map(doc => doc.data())
        return res.status(200).json( posts );
      }
      } catch (error) {
        res.status(400).end();
      }
}

