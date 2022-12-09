"use client";
import Grid from "@/components/Grid";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { app } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
export default function Dashboard() {
    const auth = getAuth(app);
    const router = useRouter();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);
    return (
        <>
            <Grid>5</Grid>
        </>
    );
}
