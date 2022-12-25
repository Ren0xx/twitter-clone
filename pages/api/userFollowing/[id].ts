import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;

    const doc = await db.collection('users').doc(id).get();
    const following = doc.data()?.following;

    if (!following || following.length === 0) {
      res.status(200).json([  ]);
      return;
    }

    const querySnapshot = await db.collection('users').where('__name__', 'in', following).get();
    const users = querySnapshot.docs.map((doc) => doc.data());

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}