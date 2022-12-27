"use client";
import { lazy } from "react";
const Tweet = lazy(() => import("@/components/Feed/Tweet"));
const Reply = lazy(() => import("@/components/Profile/Reply"));

import uuid from "react-uuid";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loading";
import type Post from "@/components/types/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Box, Typography } from "@mui/material";
import ReplyForm from "@/components/Feed/ReplyForm";

export default function Post() {
    const pathname = usePathname();
    const router = useRouter();
    const postId = pathname !== null ? pathname.split("/")[3] : "no-post";

    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${postId}`;
    const repliesUrl =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/postReplies/${postId}`;
    const { data: tweetData, error: tweetError } = useSWR(url, fetcher, {
        suspense: true,
    });
    const { data: repliesData, error: repliesError } = useSWR(
        repliesUrl,
        fetcher,
        { suspense: true }
    );
    if (!tweetData || !repliesData) {
        return <Loader />;
    }
    if (tweetError || repliesError) {
        return <p>Error loading data</p>;
    }
    return (
        <>
            <Box sx={{ display: "flex", columnGap: "1em", margin: "0.7em" }}>
                <Button
                    color='secondary'
                    onClick={() => router.back()}
                    startIcon={<ArrowBackIcon />}></Button>
                <Typography variant='h5'>Tweet</Typography>
            </Box>
            <Tweet
                key={uuid()}
                uid={tweetData.uid}
                owner={tweetData.owner}
                content={tweetData.content}
                likes={tweetData.likes}
                replies={tweetData.replies}
                timeAdded={tweetData.timeAdded}
            />
            <ReplyForm postId={postId} />
            {repliesData.map((reply: any) => (
                <Reply
                    key={uuid()}
                    uid={reply.uid}
                    owner={reply.owner}
                    content={reply.content}
                    likes={reply.likes}
                    timeAdded={reply.timeAdded}
                />
            ))}
        </>
    );
}
