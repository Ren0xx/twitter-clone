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
import getDayFromTime from "@/utils/dates/getDayFromTime";
import styles from "@/components/styles/Profile.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
const UserProfile = (props: User) => {
    const router = useRouter();
    const { uid, at, name, joinedDate, following, followers } = props;
    const date = getDayFromTime(joinedDate.nanoseconds, joinedDate.seconds);
    const { data: userPosts } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/userPosts/${uid}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: photoUrl } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/urls/${uid}`,
        fetcher,
        {
            suspense: true,
        }
    );
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
                        {following.length} Followers
                    </Typography>
                    <Typography
                        color='textSecondary'
                        component={Link}
                        variant='body2'
                        href=''>
                        {followers.length} Following
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
                            numberOfReplies={post.numberOfReplies}
                            timeAdded={post.timeAdded}
                        />
                    ))}
                </section>
            </Grid>
        </Grid>
    );
};

export default UserProfile;
