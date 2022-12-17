import { useState } from 'react';
import axios from 'axios';

const useLikeDislike = (initialLikes: number, uid: string) => {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(initialLikes);

  const likeOrDislike = async () => {
    if (isLiked) {
      try {
        await axios.put(`/api/posts/${uid}`, {
          likes: localLikes - 1,
        });
        setLocalLikes(localLikes - 1);
        setIsLiked(false);
      } catch (error) {
        console.error(error);
      }
      return;
    }
    try {
      await axios.put(`/api/posts/${uid}`, {
        likes: localLikes + 1,
      });
      setLocalLikes(localLikes + 1);
      setIsLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { isLiked, localLikes, likeOrDislike };
};

export default useLikeDislike;
