import { db } from '@/lib/firebaseAdmin.js';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const { id } = await db.collection('posts').add({
                ...req.body,
            });
            res.status(200).json({ id });
        } 
        if (req.method === 'GET') {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            if (!isNaN(page) && !isNaN(limit)) {
                const snapshot = await db
                    .collection('posts')
                    .orderBy('timeAdded.seconds', 'desc')
                    .limit(limit)
                    .offset((page - 1) * limit)
                    .get();
                if (snapshot.empty) {
                    return res.status(200).json([]);
                } else {
                const posts = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    uid: doc.id,
                }));
                return res.status(200).json(posts);
                }
            } else {
                res.status(400).end();
}

        }
    } catch (error) {
        res.status(400).end();
    }
}
