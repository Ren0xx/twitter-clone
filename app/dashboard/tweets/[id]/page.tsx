"use client";
import { lazy } from "react";
const Tweet = lazy(() => import("@/components/Feed/Tweet"));
const Reply = lazy(() => import("@/components/Profile/Reply"));

import Error from "@/components/Error";
import Loader from "@/components/Loading";
import uuid from "react-uuid";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { usePathname, useRouter } from "next/navigation";
import type Post from "@/components/types/Post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Box, Typography } from "@mui/material";
import ReplyForm from "@/components/Feed/ReplyForm";

export default function Post() {
    const pathname = usePathname();
    const router = useRouter();
    const postId =
        pathname !== null && pathname.split("/")[3]
            ? pathname.split("/")[3]
            : "no-post";
    const { data: tweetData, error: e1 } = useSWR(
        `/api/posts/${postId}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: repliesData, error: e2 } = useSWR(
        `/api/postReplies/${postId}`,
        fetcher,
        { suspense: true }
    );
    if (e1 || e2) {
        return <Error />;
    }
    if (!tweetData || !repliesData) {
        return <Loader />;
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
            {repliesData?.map((reply: any) => (
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
