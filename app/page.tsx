"use client";
import Link from "next/link";
import style from "../components/styles/Main.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { app } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
    const auth = getAuth(app);
    const router = useRouter();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    return (
        <>
        </>
    );
}
