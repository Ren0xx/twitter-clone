import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  const id  = req.query.id as string;
  try {
    if (req.method === 'PUT') {
      await db.collection('replies').doc(id).update({
        ...req.body
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('replies').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        const data = doc.data();
        res.status(200).json({ ...data, uid:id });
      }
    } else if (req.method === 'DELETE') {
      await db.collection('replies').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}