import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
const deleteReply = async (replyId: string, parentId: string) => {
    const url = baseUrl + `/api/replies/${replyId}`;
    try {
        await axios.delete(url, {
            params: {
                parentId: parentId,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export default deleteReply;
