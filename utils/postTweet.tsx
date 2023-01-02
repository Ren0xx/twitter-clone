import axios from "axios";
import { Timestamp } from "firebase/firestore";
import type Post from "@/components/types/Post";
import { baseUrl } from "@/utils/baseUrl";

const postTweet = async (content: string, ownerId: string) => {
    const url = baseUrl + "/api/posts";
    const postData: Post = {
        uid: "",
        owner: ownerId || "",
        content: content,
        timeAdded: Timestamp.now(),
        likes: 0,
        replies: [],
    };
    try {
        await axios.post(url, postData);
    } catch (error) {
        console.error(error);
    }
};

export default postTweet;
