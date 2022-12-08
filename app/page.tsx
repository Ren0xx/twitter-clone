"use client";
import useSWR from "swr";
import { Suspense } from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import style from "../components/styles/Main.module.css";
import Navbar from "@/components/Navbar";
import Feed from "@/components/Feed/Feed";
import { motion } from "framer-motion";
export default function Home() {
    return (
        <>
            {/* <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className={style.main}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}>  */}
            <Grid container justifyContent='center' alignItems='flex-start'>
                <Grid sx={{ position: "sticky", top: "4rem" }} item xs={3}>
                    <Navbar />
                </Grid>
                <Grid item xs={6}>
                    <Feed />
                </Grid>
                <Grid item xs={3}>
                    <aside>Sidebar</aside>
                    <Link href='/login'>Click me</Link>
                </Grid>
            </Grid>
            {/* </motion.div> */}
        </>
    );
}

// async function getPosts() {
//     let res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/users");

//     if (!res.ok) {
//         throw new Error("Failed to fetch data");
//     }

//     return res.json();
// }

function getPosts() {}
