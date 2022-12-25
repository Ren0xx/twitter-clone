import axios from "axios";
import create from "zustand";


const useFollow = (
    ownerId: string | null | undefined,
    ownerFollowers: string[],
    loggedUserID: string,
    loggedUserFollowing: string[]
) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${ownerId}`;
    const currentUserUrl =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${loggedUserID}`;
    const store = create((set) => ({
        isFollowing: ownerFollowers.includes(loggedUserID),
        setIsFollowing: (isFollowing: boolean) => set({ isFollowing }),
    }));

    const isFollowing= store((s:any) => (s.isFollowing));
    const setIsFollowing = store((s:any) => (s.setIsFollowing));

    async function followOrUnfollow() {
        try {
            if (!isFollowing) {
                //add to Followers
                const updatedFollowers = [loggedUserID, ...ownerFollowers];
                await axios.put(url, { followers: updatedFollowers });
                //add to Following
                addToFollowing(ownerId as string);
                setIsFollowing(true);
            } else {
                //remove from Followers
                const updatedFollowers = ownerFollowers.filter(
                    (id) => id !== loggedUserID
                );
                await axios.put(url, { followers: updatedFollowers });
                //remove from Following
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
