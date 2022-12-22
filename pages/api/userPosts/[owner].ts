import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ownerID = req.query.owner as string;

  const querySnapshot = await db.collection('posts')
  .where('owner', '==', ownerID)
  .orderBy('timeAdded.seconds', 'desc')
  .get();
  const posts = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id
  }));

  res.json( posts );
}