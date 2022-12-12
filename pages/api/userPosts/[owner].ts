import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postsRef = db.collection('posts');
  const ownerID = req.query.owner as string;

  const querySnapshot = await postsRef.where('owner', '==', ownerID).get();
  const posts = querySnapshot.docs.map((doc) => doc.data());

  res.json({ posts });
}