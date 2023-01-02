import { storage } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (id === undefined) {
      return res.status(200).json('https://storage.cloud.google.com/fake-twitter0.appspot.com/users/noUser/no-user.jpg?authuser=0')
    }
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
      // The file does not exist, return a default image link
      return res.status(200).json('https://storage.cloud.google.com/fake-twitter0.appspot.com/users/noUser/no-user.jpg?authuser=0');
    }
  } catch (error) {
    return res.status(200).json('');
  }
}
