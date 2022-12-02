"use client";
import styles from "../styles/Feed.module.css";
import Loader from "../Loading";
import Post from "./Post";
import { useEffect } from "react";
import { usePosts } from "../store";
const Feed = () => {
    const getPosts = usePosts((state) => state.setPosts);
    const posts = usePosts((state) => state.posts);
    const isLoading = usePosts((state) => state.isLoading);

    useEffect(() => {
        getPosts();
        return () => {
            getPosts();
        };
    }, [getPosts]);

    return isLoading ? (
        <Loader />
    ) : (
        <main className={styles.mainFeed}>
            {posts.map((post) => {
                return (
                    <Post
                        key={post.id}
                        id={post.id}
                        body={post.body}
                        owner={post.owner}
                        timeAdded={post.timeAdded}
                        replayTo={post.replayTo}
                    />
                );
            })}
        </main>
    );
};
export default Feed;
