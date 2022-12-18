import { storage } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const storageBucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL);
    const fileName = `users/${id}/profilePicture`;
    const file = storageBucket.file(fileName);
    const exists = await file.exists();

    if (exists[0]) {
      const remoteImagePath = await file.getSignedUrl({
        action: 'read',
        expires: '03-17-2045',
      });
      return res.status(200).json(remoteImagePath[0]);
    } else {
      // The file does not exist, so you can return a default image link
      return res.status(200).json('https://firebasestorage.googleapis.com/v0/b/fake-twitter0.appspot.com/o/users%2FnoUser%2Fno-user.jpg?alt=media&token=7032fd77-d574-47c1-aceb-eee961dfc1fc');
    }
  } catch (error) {
    return res.status(400).end();
  }
}
