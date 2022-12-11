import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await db.collection('users').doc('leerob').get();

  if (!user.exists) {
    return res.status(404).json({});
  }

  return res.status(200).json({ id: user.id, ...user.data() });
}