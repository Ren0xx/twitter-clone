"use client";
import Error from "@/components/Error"
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import UserProfile from "@/components/Profile/Profile";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loading";

export default function Profile() {
    const pathname = usePathname();
    const userID = pathname !== null && pathname.split("/")[3] !== null ? pathname.split("/")[3] : "no-user";
    const { data: userData, error } = useSWR(`/api/users/${userID}`, fetcher);
    if (error) {
        return <Error />
    }
    if (!userData) {
        return <Loader />;
    }

    return (
        <>
            <UserProfile
                uid={userData.uid}
                at={userData.at}
                name={userData.name}
                joinedDate={userData.joinedDate}
                following={userData.following}
                followers={userData.followers}
            />
        </>
    );
}
