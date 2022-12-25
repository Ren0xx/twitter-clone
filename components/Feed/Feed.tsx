import useSWRInfinite from "swr/infinite";

import styles from "../styles/Feed.module.css";
import type Post from "@/components/types/Post";
import { CircularProgress, Paper, TextField } from "@mui/material";
import {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    ChangeEvent,
} from "react";
import uuid from "react-uuid";
import React, { lazy } from "react";
const Tweet = lazy(() => import("./Tweet"));
import useDebounce from "@/utils/useDebounce";
import fetcher from "@/utils/fetcher";

const Feed = () => {
    const { data, error, size, setSize, isValidating } = useSWRInfinite(
        (index, previousPageData) =>
            process.env.NEXT_PUBLIC_BASE_URL +
            `/api/posts?page=${index}&limit=${
                previousPageData ? previousPageData.length : 10
            }`,
        fetcher,
        {
            suspense: true,
            refreshInterval: 1000,
        }
    );

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500); //500ms delay
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const filterTweetsByText = (tweets: Post[], term: string) => {
        return tweets.filter((tweet) => tweet.content.includes(term));
    };
    const filteredTweets = useMemo(() => {
        return filterTweetsByText(data?.flat() as any[], debouncedSearchTerm);
    }, [data, debouncedSearchTerm]);

    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.style.height = `${gridRef.current.scrollHeight}px`;
        }
    }, [filteredTweets]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setSize(size + 1);
        }
    }, [size, setSize]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    if (error) {
        return <div>Something went wrong.</div>;
    }
    return (
        <main
            className={styles.mainFeed}
            ref={gridRef}
            style={{ minHeight: "100vh" }}>
            <TextField
                label='Search tweets'
                onChange={handleSearchChange}
                value={searchTerm}
                fullWidth
                className={styles.searchBar}
            />
            {/* {filteredTweets.map((post: Post) => (
                <Tweet
                    key={uuid()}
                    uid={post.uid}
                    owner={post.owner}
                    content={post.content}
                    likes={post.likes}
                    replies={post.replies}
                    timeAdded={post.timeAdded}
                />
            ))}
            {isValidating && <Loading />} */}
        </main>
    );
};

export default Feed;

const Loading = () => {
    return (
        <Paper
            variant='outlined'
            sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color='primary' />
        </Paper>
    );
};
