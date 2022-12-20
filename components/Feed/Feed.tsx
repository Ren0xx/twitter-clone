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
import React, { lazy, Suspense } from "react";
const Tweet = lazy(() => import("./Tweet"));
import useDebounce from "@/utils/useDebounce";
import fetcher from "@/utils/fetcher";

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
    return (
        <main
            className={styles.mainFeed}
            ref={gridRef}
            style={{ height: filteredTweets.length > 0 ? "100%" : "100vh" }}>
            <TextField
                label='Search tweets'
                onChange={handleSearchChange}
                value={searchTerm}
                fullWidth
                className={styles.searchBar}
            />
            {/* <Suspense fallback={<Loading />}>
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
            </Suspense> */}
            {isValidating && <Loading />}
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
