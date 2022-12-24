import axios from "axios";
import { useState } from "react";

const useFollow = (
    userFollowers: string[],
    userId: string | null | undefined ,
    followerId: string,
    followerFollowingArray: string[]
) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(
        userFollowers.includes(followerId)
    );
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${userId}`;
    const currentUserUrl = process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${followerId}`;
    async function followOrUnfollow() {
        if (!isFollowing) {
            try {
                //add to Followers
                const updatedFollowers = [followerId, ...userFollowers];
                await axios.put(url, { followers: updatedFollowers });
                //add to Following
                addToFollowing(userId as string);
                setIsFollowing(true);
            } catch (error) {
                console.error(error);
            }
            return;
        }

        try {
            //remove from Followers
            const updatedFollowers = userFollowers.filter(id => id !== followerId)
            await axios.put(url, {followers: updatedFollowers});
            //remove from Following
            removeFromFollowing(userId as string);
            setIsFollowing(false);
        } catch (error) {
            console.error(error);
        }
    }
    async function addToFollowing(userId: string){
        const updatedFollowing = [userId, ...followerFollowingArray]
        axios.put(currentUserUrl, {following: updatedFollowing})
    }
    async function removeFromFollowing(userId:string) {
      const updatedFollowing = followerFollowingArray.filter(id => id !== userId);
      await axios.put(currentUserUrl, {following: updatedFollowing})
    }

    return { isFollowing, followOrUnfollow };
};

export default useFollow;
