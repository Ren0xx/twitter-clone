"use client";
import { Suspense } from "react";
import useSWR from "swr";

import styles from "../styles/Feed.module.css";
import Loader from "../Loading";
import Tweet from "./Tweet";
import type Post from "@/components/types/Post";

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const Feed = () => {
    const { data } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/posts",
        fetcher,
        {
            suspense: true,
        }
    );

    return (
        <Suspense fallback={<Loader />}>
            <main className={styles.mainFeed}>
                {data.map((post: Post) => (
                    <Tweet
                        key={post.uid}
                        uid={post.uid}
                        replayTo={post.replayTo}
                        likes={post.likes}
                        numberOfReplies={post.numberOfReplies}
                        owner={post.owner}
                        content={post.content}
                        timeAdded={post.timeAdded}
                    />
                ))}
            </main>
        </Suspense>
    );
};
export default Feed;
