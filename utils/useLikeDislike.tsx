import { useState } from "react";
import axios from "axios";
import { baseUrl } from "@/utils/baseUrl";
const useLikeDislike = (initialLikes: number, uid: string) => {
    const [isLiked, setIsLiked] = useState(false);
    const [localLikes, setLocalLikes] = useState(initialLikes);

    const likeOrDislike = async () => {
        if (isLiked) {
            try {
                await axios.put(baseUrl + `/api/posts/${uid}`, {
                    likes: localLikes - 1,
                });
                setIsLiked(false);
                setLocalLikes(localLikes - 1);
            } catch (error) {
                console.error(error);
            }
            return;
        }
        try {
            await axios.put(baseUrl + `/api/posts/${uid}`, {
                likes: localLikes + 1,
            });
            setIsLiked(true);
            setLocalLikes(localLikes + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return { isLiked, localLikes, likeOrDislike };
};

export default useLikeDislike;
