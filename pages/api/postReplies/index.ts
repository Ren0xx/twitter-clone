import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    if (req.method === 'POST') {
        
    }
    // const id = req.query.id as string;

    // const doc = await db.collection('posts').doc(id).get();
    // const replies = doc.data()?.replies;

    // if (!replies || replies.length === 0) {
    //   res.status(200).json([  ]);
    //   return;
    // }

    // const querySnapshot = await db.collection('replies').where('__name__', 'in', replies).get();
    // const posts = querySnapshot.docs.map((doc) => doc.data());

    // res.status(200).json(posts);
  } catch (error: any) {
    res.status(500);
  }
}