import axios from "axios";
import { Timestamp } from "firebase/firestore";
import type Post from "@/components/types/Post";

const postTweet = async (content: string, ownerId: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/posts";
    const postData: Post = {
        uid: "",
        owner: ownerId || "",
        content: content,
        timeAdded: Timestamp.now(),
        likes: 0,
        numberOfReplies: 0,
    };
    try {
        await axios.post(url, postData);
    } catch (error) {
        console.error(error);
    }
};

export default postTweet;
