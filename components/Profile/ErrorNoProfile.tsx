"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ErrorNoProfile = () => {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 2500);
        return () => clearTimeout(timer);
    }, [router]);
    return <div>Could not find user</div>;
};

export default ErrorNoProfile;
