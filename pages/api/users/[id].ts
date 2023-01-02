import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    const id = req.query.id as string;
    if (req.method === 'PUT') {
      await db.collection('users').doc(id).update({
        ...req.body
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('users').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        const data = doc.data();
        const uid = doc.id;
        res.status(200).json({ uid, ...data });
        
      }
    } else if (req.method === 'DELETE') {
      await db.collection('users').doc(id).delete();
      res.status(200);
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
}
} 
