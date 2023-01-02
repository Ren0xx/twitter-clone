import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
const deleteTweet = async (tweetId: string) => {
    const url = baseUrl + `/api/posts/${tweetId}`;
    try {
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
};

export default deleteTweet;
