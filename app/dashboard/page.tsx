"use client";
import Grid from "@/components/Grid";
import Feed from "@/components/Feed/Feed";
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
        // if (!user) {
        //     router.push("/login");
        // }
        // if (user) {
        //     console.log(user);
        //     router.push("/dashboard");
        // }
    }, [user, router]);
    return (
        <>
            <Grid>
                <Feed />
            </Grid>
        </>
    );
}
