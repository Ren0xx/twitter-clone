import { storage } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const storageBucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL)
  const fileName = "users/id_of_user/photo"
  const remoteImagePath = storageBucket.file( fileName ).getSignedUrl({
      action: "read",
      expires: '03-17-2045' 
  })
  .then((data) => {
    return res.status(200).json(data[0])
    })


}
