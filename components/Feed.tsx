"use client";
import styles from "./styles/Feed.module.css";
import Loading from "./Loading";

import { useEffect } from "react";
import { usePosts } from "../components/store";
const Feed = () => {
    const getPosts = usePosts((state) => state.setPosts);
    const posts = usePosts((state) => state.posts);
    const isLoading = usePosts((state) => state.isLoading);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return isLoading ? (
        <Loading />
    ) : (
        <main className={styles.mainFeed}>
            {posts.map((post, idx) => {
                return (
                    <div key={post.id}>
                        {/* <h2>{post.id}</h2> */}
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <p>{post.owner}</p>
                        {/* <p>{data.timeAdded}</p> */}
                    </div>
                );
            })}
        </main>
    );
};
export default Feed;
