import axios from "axios";
import create from "zustand";
import { baseUrl } from "@/utils/baseUrl";

const useFollow = (
    ownerId: string | null | undefined,
    ownerFollowers: string[],
    loggedUserID: string,
    loggedUserFollowing: string[]
) => {
    const url = baseUrl + `/api/users/${ownerId}`;
    const currentUserUrl = baseUrl + `/api/users/${loggedUserID}`;
    const store = create((set) => ({
        isFollowing: ownerFollowers.includes(loggedUserID),
        setIsFollowing: (isFollowing: boolean) => set({ isFollowing }),
    }));

    const isFollowing = store((s: any) => s.isFollowing);
    const setIsFollowing = store((s: any) => s.setIsFollowing);

    async function followOrUnfollow() {
        try {
            if (!isFollowing) {
                //add to Followers array
                const updatedFollowers = [loggedUserID, ...ownerFollowers];
                await axios.put(url, { followers: updatedFollowers });
                //add to Following array
                addToFollowing(ownerId as string);
                setIsFollowing(true);
            } else {
                //remove from Followers array
                const updatedFollowers = ownerFollowers.filter(
                    (id) => id !== loggedUserID
                );
                await axios.put(url, { followers: updatedFollowers });
                //remove from Following array
                removeFromFollowing(ownerId as string);
                setIsFollowing(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function addToFollowing(userId: string) {
        const updatedFollowing = [userId, ...loggedUserFollowing];
        axios.put(currentUserUrl, { following: updatedFollowing });
    }
    async function removeFromFollowing(userId: string) {
        const updatedFollowing = loggedUserFollowing.filter(
            (id) => id !== userId
        );
        await axios.put(currentUserUrl, { following: updatedFollowing });
    }

    return { isFollowing, followOrUnfollow };
};

export default useFollow;
