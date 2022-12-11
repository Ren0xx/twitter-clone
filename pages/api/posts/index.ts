import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const snapshot = await db
          .collection('posts')
          .get();
        const users:any = [];
    
        snapshot.forEach((user) => {
          users.push({ ...user.data() });
        });
    
        return res.status(200).json( users );
      } catch (error) {
        res.status(400).end();
      }
}

