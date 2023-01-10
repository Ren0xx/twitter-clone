import { db } from '@/lib/firebaseAdmin.js';
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const id  = req.query.id as string;
    if (req.method === 'PUT') {
      await db.collection('replies').doc(id).update({
        ...req.body
      });
      res.status(200);
    } else if (req.method === 'GET') {
      const doc = await db.collection('replies').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        const data = doc.data();
        res.status(200).json({ ...data, uid:id });
      }
    } else if (req.method === 'DELETE') {
      const parentId  = req.query.parentId as string;
      //remove reply from posts.reply array
      const tweetMod = await db.collection('posts').doc(parentId).update({
        replies: admin.firestore.FieldValue.arrayRemove(id)
      })
      await db.collection('replies').doc(id).delete();
      res.status(200);
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}