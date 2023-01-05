import axios from "axios";
import { Timestamp } from "firebase/firestore";
import { baseUrl } from "@/utils/baseUrl";

const editTweet = async (content: string, tweetId: string) => {
    const url = baseUrl + `/api/posts/${tweetId}`;
    try {
        await axios.put(url, { timeAdded: Timestamp.now(), content: content });
    } catch (error) {
        console.error(error);
    }
};

export default editTweet;
