"use client";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import UserProfile from "@/components/Profile/Profile";
import { usePathname } from "next/navigation";
import Loader from "@/components/Loading";
export default function Profile() {
    const router = useRouter();
    const pathname = usePathname();
    const userID = pathname !== null ? pathname.split('/')[3] : "no-user";
    const {
        data: userData,
        error,
    } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${userID}`,
        fetcher
    );
    if (!userData) {
        return <Loader />;
    }
    if (error) {
        return <p>Error loading data</p>;
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
