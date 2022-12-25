"use client";
import {
    Avatar,
    Typography,
    Grid,
    Button,
    Card,
    CardMedia,
} from "@mui/material";
import type User from "@/components/types/User";
import type Post from "@/components/types/Post";
import Tweet from "@/components/Feed/Tweet";
import {lazy } from 'react';
const FollowButton = lazy(() => import("@/components/Profile/FollowButton"));

import styles from "@/components/styles/Profile.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import getDayFromTime from "@/utils/dates/getDayFromTime";
import useFollow from "@/utils/useFollow";
import { useUserStore } from "@/utils/useAuth";

const UserProfile = (props: User) => {
    const router = useRouter();

    const { uid, at, name, joinedDate, following, followers } = props;
    const date = getDayFromTime(joinedDate.nanoseconds, joinedDate.seconds);

    const { data: userPosts } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/userPosts/${uid}`,
        fetcher,
        {
            suspense: true,
            refreshInterval: 100,
        }
    );
    const { data: photoUrl } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/urls/${uid}`,
        fetcher,
        {
            suspense: true,
        }
    );

    const loggedUserId = useUserStore((store) => store.user?.uid) as string;
    const loggedUserUrl =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/users/${loggedUserId}`;

    const { data: loggedUser, error } = useSWR(loggedUserUrl, fetcher, {
        refreshInterval: 100,
    });
    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }
    if (!loggedUser) {
        return <div>Loading...</div>;
    }
    const isProfileOwner = loggedUserId === uid;

    return (
        <Grid container direction='column' alignItems='stretch' rowSpacing={3}>
            <Grid
                item
                xs={1}
                className={styles.header}
                justifyContent='flex-start'>
                <Button
                    color='secondary'
                    onClick={() => router.back()}
                    startIcon={<ArrowBackIcon />}></Button>
                <div>
                    <Typography variant='h6'>{name}</Typography>
                    <Typography variant='caption'>
                        {userPosts.length} tweets
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={5}>
                <div className={styles.background__top}>
                    <div className={styles.background__image}>
                        <Avatar
                            src={photoUrl}
                            alt='Profile photo'
                            className={styles.avatar}
                        />
                        <FollowButton
                            ownerFollowers={followers}
                            ownerId={uid}
                            loggedUserId={loggedUserId}
                            loggedUserFollowing={loggedUser.following}
                            isLoggedUserOwner={isProfileOwner}
                        />
                    </div>
                </div>
            </Grid>
            <Grid item xs sx={{ m: "0.8em" }}>
                <Typography variant='h6'>{name}</Typography>
                <Typography color='textSecondary' variant='subtitle1'>
                    @{at}
                </Typography>
                <Typography color='textSecondary' variant='body2'>
                    Joined {date}
                </Typography>
                <div className={styles.flinks}>
                    <Typography
                        color='textSecondary'
                        component={Link}
                        variant='body2'
                        href=''>
                        {followers.length} Followers
                    </Typography>
                    <Typography
                        color='textSecondary'
                        component={Link}
                        variant='body2'
                        href=''>
                        {following.length} Following
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={1} className={styles.navbar}>
                <Typography variant='body2'> Tweets</Typography>
            </Grid>
            <Grid item xs>
                <section>
                    {userPosts?.map((post: Post) => (
                        <Tweet
                            key={post.uid}
                            uid={post.uid}
                            owner={post.owner}
                            content={post.content}
                            likes={post.likes}
                            replies={post.replies}
                            timeAdded={post.timeAdded}
                        />
                    ))}
                </section>
            </Grid>
        </Grid>
    );
};

export default UserProfile;