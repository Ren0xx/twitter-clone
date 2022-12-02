"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
type UserProps = {
    id: string;
    name: string;
};
import { useRouter } from "next/navigation";
import { useUser } from "../../../components/store";
import Loader from "../../../components/Loading";
import ErrorNoProfile from "../../../components/Profile/ErrorNoProfile";
export default function UserProfile() {
    const router = useRouter();
    const getUser = useUser((state) => state.getUser);
    const user = useUser((state) => state.user);
    const isLoading = useUser((state) => state.isLoading);
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    useEffect(() => {
        getUser(id);
        return () => {
            getUser(id);
        };
    }, [getUser, id]);

    if (isLoading) {
        return <Loader />;
    }
    if (user === null) {
        return <ErrorNoProfile />;
    }

    return (
        <div>
            <p>{user?.at}</p>
            <p>{user?.name}</p>
        </div>
    );
}
