"use client";
import { Suspense } from "react";
import useSWR from "swr";

import styles from "../styles/Feed.module.css";
import Loader from "../Loading";
import Tweet from "./Tweet";
import type Post from "@/components/types/Post";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Feed = () => {
    const { data } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/posts",
        fetcher,
        {
            suspense: true,
        }
    );

    return (
            <main className={styles.mainFeed}>
                {data.map((post: Post) => (
                    <Tweet
                        key={post.uid}
                        uid={post.uid}
                        owner={post.owner}
                        content={post.content}
                        likes={post.likes}
                        numberOfReplies={post.numberOfReplies}
                        timeAdded={post.timeAdded}
                    />
                ))}
            </main>
    );
};
export default Feed;
