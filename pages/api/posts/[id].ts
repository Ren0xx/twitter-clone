import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id  = req.query.id as string;
  try {
    if (req.method === 'PUT') {
      await db.collection('posts').doc(id).update({
        ...req.body
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('posts').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      await db.collection('posts').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}