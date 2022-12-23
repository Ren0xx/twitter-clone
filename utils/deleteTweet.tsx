import axios from "axios";
import { Timestamp } from "firebase/firestore";
import type Post from "@/components/types/Post";

const deleteTweet = async (tweetId: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${tweetId}`;
    try {
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
};

export default deleteTweet;
