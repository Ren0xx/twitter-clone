import useSWRInfinite from "swr/infinite";

// import lunr from 'lunr';
import styles from "../styles/Feed.module.css";
import Tweet from "./Tweet";
import type Post from "@/components/types/Post";
import { CircularProgress, Paper, TextField } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
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


    
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filterTweetsByText = (tweets: Post[], term: string) => {
        return tweets.filter((tweet) => tweet.content.includes(term));
    };
    const filteredTweets = filterTweetsByText(
        data?.flat() as any[],
        searchTerm
    );

    useEffect(() => {
        const grid = document.getElementById("grid");
        if (grid) {
            grid.style.height = `${grid.scrollHeight}px`;
        }
    }, [filteredTweets]);

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
        <main className={styles.mainFeed} id='grid'>
            <TextField
                label='Search tweets'
                onChange={handleSearchChange}
                value={searchTerm}
                fullWidth
                className={styles.searchBar}
            />

            {filteredTweets.map((post: Post) => (
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
            {isValidating && (
                <Paper
                    variant='outlined'
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress color='primary' />
                </Paper>
            )}
        </main>
    );
};

export default Feed;
