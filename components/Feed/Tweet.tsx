"use client";
import React, { useState, useMemo } from "react";
import type Post from "../types/Post";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import styles from "@/styles/Feed.module.css";
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardActions,
    Avatar,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import useLikeDislike from "@/utils/useLikeDislike";
import getDayFromTime from "@/utils/dates/getDayFromTime";

const areEqual = (prevProps: Post, nextProps: Post) => {
    const { uid, numberOfReplies, likes, owner, content, timeAdded } =
        prevProps;
    return (
        uid === nextProps.uid &&
        numberOfReplies === nextProps.numberOfReplies &&
        likes === nextProps.likes &&
        owner === nextProps.owner &&
        content === nextProps.content &&
        timeAdded.nanoseconds === nextProps.timeAdded.nanoseconds &&
        timeAdded.seconds === nextProps.timeAdded.seconds
    );
};
const Tweet = React.memo((props: Post) => {
    const { uid, numberOfReplies, likes, owner, content, timeAdded } = props;
    const router = useRouter();

    const dayWhenPosted = useMemo(() => {
        return getDayFromTime(timeAdded.nanoseconds, timeAdded.seconds);
    }, [timeAdded.nanoseconds, timeAdded.seconds]);
    const { data: ownerData } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${owner}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: photoUrl } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/urls/${owner}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const redirectToPost = () => {
        router.push(`/dashboard/posts/${uid}`);
    };
    const { isLiked, localLikes, likeOrDislike } = useLikeDislike(likes, uid);
    return (
        <Card className={styles.card} variant='outlined'>
            <div className={styles.card__photo}>
                <Avatar src={photoUrl} alt='...' />
            </div>
            <div className={styles.card__main}>
                <CardContent sx={{ paddingLeft: "0px" }}>
                    <div className={styles.card__main__header}>
                        <Typography
                            component={Link}
                            href={`/dashboard/users/${owner}`}
                            variant='subtitle1'
                            color='primary'>
                            {ownerData.name}
                        </Typography>
                        <Typography
                            component={Link}
                            href={`/dashboard/users/${owner}`}
                            variant='body2'
                            color='textSecondary'>
                            @{ownerData.at}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {dayWhenPosted}
                        </Typography>
                    </div>
                </CardContent>
                <CardActionArea disableRipple onClick={redirectToPost}>
                    <Typography
                        className={styles.card__post_content}
                        // component='p'
                        variant='body1'
                        sx={{
                            // maxLength: "100px",
                            // overflow: "hidden",
                            // textOverflow: "ellipsis",
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                        }}>
                        {content.length < 150
                            ? content
                            : content.substr(0, 150) + "..."}
                    </Typography>
                </CardActionArea>
            </div>
            <CardActions className={styles.card__bottom}>
                <div>
                    <ChatBubbleOutlineIcon
                        onClick={redirectToPost}
                        aria-label='retweet'
                    />
                    <Typography>{numberOfReplies}</Typography>
                </div>
                <div>
                    <RepeatIcon aria-label='share' />
                </div>
                <div>
                    <FavoriteBorderIcon
                        onClick={likeOrDislike}
                        aria-label='favorite'
                        color={isLiked ? "error" : "secondary"}
                    />
                    <Typography color={isLiked ? "error" : "secondary"}>
                        {localLikes}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
}, areEqual);
Tweet.displayName = "Tweet";
export default Tweet;
