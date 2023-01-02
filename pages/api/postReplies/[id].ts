import { db } from '@/lib/firebaseAdmin.js';
import * as admin from "firebase-admin";

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'PUT') {
      const tweetId = req.query.id as string;

      const idForTweet = db.collection("posts").doc().id; //generate id

      const tweetMod = await db.collection('posts').doc(tweetId).update({
        replies: admin.firestore.FieldValue.arrayUnion(idForTweet)//add reply to user replies array
      })
      const reply = await db.collection('replies').doc(idForTweet).set({
        ...req.body
      })
      res.status(200).json({reply})
    }
    else {

      const id = req.query.id as string;
      
      const doc = await db.collection('posts').doc(id).get();
      const replies = doc.data()?.replies;

      if (!replies || replies.length === 0) {
        res.status(200).json([])
        return;
      }

      const querySnapshot = await db.collection('replies').where('__name__', 'in', replies).get();
      const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id
      }));
      
      res.status(200).json(posts);
  }
  res.status(200).end()
  } catch (error: any) {
    res.status(500);
  }
}