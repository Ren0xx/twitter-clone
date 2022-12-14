"use client";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

import styles from "../styles/Feed.module.css";
import Loader from "../Loading";
import Tweet from "./Tweet";
import type Post from "@/components/types/Post";
import { CircularProgress, Paper } from "@mui/material";
import { useEffect } from "react";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Feed = () => {
    const { data, size, setSize, isValidating } = useSWRInfinite(
        (index, previousPageData) =>
            process.env.NEXT_PUBLIC_BASE_URL +
            `/api/posts?page=${index}&limit=${
                previousPageData ? previousPageData.length : 10
            }`,
        fetcher,
        {
            suspense: true,
        }
    );
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight
            ) {
                setSize(size + 1);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [size, setSize]);
    return (
        <main className={styles.mainFeed}>
            {data?.map((page) =>
                page.map((post: Post) => (
                    <Tweet
                        key={post.uid}
                        uid={post.uid}
                        owner={post.owner}
                        content={post.content}
                        likes={post.likes}
                        numberOfReplies={post.numberOfReplies}
                        timeAdded={post.timeAdded}
                    />
                ))
            )}
            {isValidating && (
                <Paper sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color='primary' />
                </Paper>
            )}
        </main>
    );
};

export default Feed;
