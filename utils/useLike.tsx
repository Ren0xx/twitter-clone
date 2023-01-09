import axios from "axios";
import create from "zustand";
import { baseUrl } from "@/utils/baseUrl";

const useLike = (
    tweetId: string,
    loggedUserId: string | undefined,
    likes: string[],
    urlToApi: string,
) => {
    const store = create((set) => ({
        isLiked: likes.includes(loggedUserId || ""),
        setIsLiked: (isLiked: boolean) => set({ isLiked }),
    }));
    const url = baseUrl + `/api/${urlToApi}/${tweetId}`;

    const isLiked = store((s: any) => s.isLiked);
    const setIsLiked = (s: any) => s.setIsLiked;

    async function likeOrDislike() {
        try {
            //add like
            if (!isLiked) {
                const newLikes = [loggedUserId, ...likes];
                await axios.put(url, { likes: newLikes });
                setIsLiked(true);
            }
            //remove like
            else {
                const newLikes = likes.filter((id) => id !== loggedUserId);
                await axios.put(url, { likes: newLikes });
                setIsLiked(false);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return { isLiked, likeOrDislike };
};
export default useLike;
