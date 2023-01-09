import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
const deleteReply = async (tweetId: string) => {
    const url = baseUrl + `/api/replies/${tweetId}`;
    try {
        await axios.delete(url);
    } catch (error) {
        console.error(error);
    }
};

export default deleteReply;
