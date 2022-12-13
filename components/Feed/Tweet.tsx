"use client";
import { useState, useMemo } from "react";
import type Post from "../types/Post";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";

import styles from "@/styles/Feed.module.css";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActionArea,
    CardActions,
    Avatar,
    Paper,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";

import getDayFromTime from "@/utils/dates/getDayFromTime";

const Tweet = (props: Post) => {
    const fetcher = (url: string) => fetch(url).then((r) => r.json());
    const { uid, numberOfReplies, likes, owner, content, timeAdded } = props;
    const router = useRouter();

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [localLikes, setLocalLikes] = useState<number>(likes);
    const day = useMemo(() => {
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
    const likeOrDislike = async () => {
        if (isLiked) {
            await axios
                .put(process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${uid}`, {
                    likes: likes - 1,
                })
                .then(() => {
                    setLocalLikes(localLikes - 1);
                    setIsLiked(false);
                })
                .catch((error) => {
                    console.log(error);
                });
            return;
        }
        await axios
            .put(process.env.NEXT_PUBLIC_BASE_URL + `/api/posts/${uid}`, {
                likes: likes + 1,
            })
            .then(() => {
                setLocalLikes(localLikes + 1);
                setIsLiked(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Card className={styles.card}>
            <div className={styles.card__photo}>
                <Avatar src={photoUrl} />
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
                            {day}
                        </Typography>
                    </div>
                </CardContent>
                <CardActionArea disableRipple onClick={redirectToPost}>
                    <Typography variant='body1'>{content}</Typography>
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
};

export default Tweet;
