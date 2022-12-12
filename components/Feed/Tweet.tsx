import React from "react";
import Image from "next/image";
import type Post from "../types/Post";
import styles from "@/styles/Feed.module.css";
import Link from "next/link";
import { useState } from "react";

// import IconButton from '@material-ui/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import { makeStyles } from '@material-ui/styles';
import KeyIcon from "@mui/icons-material/Key";
import axios from "axios";
import { Suspense } from "react";
import useSWR from "swr";

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
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
const Tweet = (props: Post) => {
    const { uid, numberOfReplies, replayTo, likes, owner, content, timeAdded } =
        props;
    const fetcher = (url: string) => fetch(url).then((r) => r.json());
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [localLikes, setLocalLikes] = useState<number>(likes);
    // const photo =
    // const { data } = useSWR(
    //     process.env.NEXT_PUBLIC_BASE_URL + "/api/posts",
    //     fetcher,
    //     {
    //         suspense: true,
    //     }
    // );
    const handleClick = () => {
        console.log("hi");
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
                .catch( (error) =>{
                    console.log(error);
                });
            return;
        } else {
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
        }
    };
    //TODO useState to make state for: liked
    //TODO get owner id, then use api/urls/{ownerid} to get link to profile picture
    return (
        <Card>
            <CardActionArea
                className={styles.card}
                disableRipple
                onClick={handleClick}>
                <div className={styles.card__photo}>
                    <Avatar src='https://storage.googleapis.com/fake-twitter0.appspot.com/users/jYjdNdGI1ETP0dYqBsI5QOLKBXn2/profilePicture?GoogleAccessId=firebase-adminsdk-zh9fy%40fake-twitter0.iam.gserviceaccount.com&Expires=2373318000&Signature=nN6V32jciYLXzUn8W%2BQKMKLJPIK8BJDu58Rit%2B1eJoqoUrx%2BuXWHxam0DbEJmdnRQTclCW5pbMBpbTVN2gK7yJOGxPzJkf6DTENVgJ2rTsNpdzV01h52LTuwIpdUV3uyvKz5hZf5PGSMeP0UvbKj2O1XMWaogzR4HfNL%2B5tSK9t9TFApV0bnThGNhvULwHIrHJ6SEog3cJ7gufiTv%2Fmi0YVUektdmGb%2BAqbFw2TPli0zVwlemtEnz0Djl6z174cbvsdzQOraLrkEK0iAlXUHXkSmESyc1ePG0nVGbyd0FfAkDmia8876MgkdfG%2BTa3xunE2ENGi5DNNt35g%2FVvZrNQ%3D%3D' />
                </div>
                <CardContent className={styles.card__main}>
                    <div className={styles.card__main__header}>
                        <Typography variant='subtitle1' color='primary'>
                            User Name
                        </Typography>
                        <Typography
                            component={Link}
                            href='/dashboard/users/Id'
                            sx={{ zIndex: 10000 }}
                            variant='body2'
                            color='textSecondary'>
                            @user_handle
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            24 december
                        </Typography>
                    </div>
                    <Typography variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={styles.card__bottom}>
                <RepeatIcon aria-label='share' />
                <ChatBubbleOutlineIcon aria-label='retweet' />
                <Typography>{numberOfReplies}</Typography>
                <FavoriteBorderIcon
                    onClick={likeOrDislike}
                    aria-label='favorite'
                    color={isLiked ? "error" : "secondary"}
                />
                <Typography>{localLikes}</Typography>
            </CardActions>
        </Card>
    );
};

export default Tweet;
