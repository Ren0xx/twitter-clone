import { Timestamp } from "firebase/firestore";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";

const postReply = async (content: string, tweetId: string, ownerId: string) => {
    const url =
        baseUrl + `/api/postReplies/${tweetId}`;
    const replyData = {
        uid: "",
        owner: ownerId || "",
        content: content,
        timeAdded: Timestamp.now(),
        likes: 0,
    };
    try {
      await axios.put(url, replyData)
    } catch(error) {
      console.error(error);
    }
};

export default postReply;
