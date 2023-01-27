"use client";
import React, { useMemo, useState } from "react";
import type Post from "../types/Post";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import styles from "@/styles/Feed.module.css";
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardActions,
    Avatar,
    Menu,
    Button,
    MenuItem,
    IconButton,
    TextField,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";

import useLike from "@/utils/useLike";
import getDayFromTime from "@/utils/dates/getDayFromTime";
import { useUserStore } from "@/utils/useAuth";
import deleteTweet from "@/utils/deleteTweet";
import editTweet from "@/utils/editTweet";

import { usePathname } from "next/navigation";
const areEqual = (prevProps: Post, nextProps: Post) => {
    const { uid, replies, likes, owner, content, timeAdded } = prevProps;
    return (
        uid === nextProps.uid &&
        replies === nextProps.replies &&
        likes === nextProps.likes &&
        owner === nextProps.owner &&
        content === nextProps.content &&
        timeAdded.nanoseconds === nextProps.timeAdded.nanoseconds &&
        timeAdded.seconds === nextProps.timeAdded.seconds
    );
};
const Tweet = React.memo((props: Post) => {
    const user = useUserStore((state) => state.user);
    const { uid, replies, likes, owner, content, timeAdded } = props;
    const router = useRouter();
    const pathname = usePathname();

    const dayWhenPosted = useMemo(() => {
        return getDayFromTime(timeAdded.nanoseconds, timeAdded.seconds);
    }, [timeAdded.nanoseconds, timeAdded.seconds]);
    const { data: ownerData, error: e1 } = useSWR(
        `/api/users/${owner}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const { data: photoUrl, error: e2 } = useSWR(
        `/api/urls/${owner}`,
        fetcher,
        {
            suspense: true,
        }
    );
    const redirectToPost = () => {
        router.push(`/dashboard/tweets/${uid}`);
    };
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    //menu
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleMenuClose = () => {
        setDialogOpen(true);
        setMenuAnchor(null);
    };
    //dialog
    const isOnTweetsUrl = () => {
        if (pathname !== null) {
            return pathname.split("/")[2] === "tweets";
        }
        return false;
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    //deletion
    const handleConfirm = () => {
        deleteTweet(uid);
        handleDialogClose();

        //check if user is deleting his tweet - being on */tweets directory
        if (isOnTweetsUrl()) {
            router.push("/dashboard");
        }
    };

    //edititon
    const [editModeOn, setEditModeOn] = useState<boolean>(false);
    const [tweetContent, setTweetContent] = useState<string>(content);

    const onEditClicked = () => {
        setEditModeOn(true);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTweetContent(event.target.value);
    };
    const onSave = () => {
        setEditModeOn(false); // close edition
        if (tweetContent === content) return; //if content is the same, dont make request
        editTweet(tweetContent, uid); //send request
        router.refresh();
    };
    const notSmallSc = useMediaQuery((theme:any) => theme.breakpoints.up('sm'));
    const { isLiked, likeOrDislike } = useLike(uid, user?.uid, likes, 'posts');
    if (e1 || e2) {
        return <div></div>;
    }
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
                            color='secondary'>
                            {ownerData.name}
                        </Typography>
                        <Typography
                            component={Link}
                            href={`/dashboard/users/${owner}`}
                            variant='body2'
                            color='textSecondary'>
                            @{ownerData.at}
                        </Typography>
                        {notSmallSc && (
                            <Typography variant='subtitle1' color='textSecondary'>
                            {dayWhenPosted}
                        </Typography>
                            )}
                        <Button
                            id='saveButton'
                            variant='outlined'
                            color='success'
                            size='small'
                            onClick={onSave}
                            sx={{
                                ml: "auto",
                                display: editModeOn ? "block" : "none",
                            }}>
                            Save
                        </Button>
                        {user?.uid === owner && (
                            <IconButton
                                sx={{ ml: "auto" }}
                                onClick={handleMenuClick}>
                                <MoreHorizIcon />
                            </IconButton>
                        )}
                        {/* Want-to-delete Button clicked */}
                        <Menu
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={() => setMenuAnchor(null)}>
                            <MenuItem disableRipple onClick={handleMenuClose}>
                                <ListItemIcon>
                                    <ClearIcon />
                                </ListItemIcon>
                                <ListItemText>Delete</ListItemText>
                            </MenuItem>
                            <MenuItem disableRipple onClick={onEditClicked}>
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                                <ListItemText>Edit</ListItemText>
                            </MenuItem>
                        </Menu>
                        {/* Deletion confirmation dialog */}
                        <Dialog open={dialogOpen} onClose={handleDialogClose}>
                            <DialogTitle>Confirmation</DialogTitle>
                            <DialogContent>
                                Are you sure you want to delete this tweet?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleConfirm} color='primary'>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </CardContent>
                {!editModeOn ? (
                    <CardActionArea disableRipple onClick={redirectToPost}>
                        <Typography
                            component='p'
                            variant='body2'
                            sx={{
                                wordWrap: "break-word",
                                wordBreak: "break-all",
                            }}>
                            {content.length < 150
                                ? content
                                : content.substring(0, 150) + "..."}
                        </Typography>
                    </CardActionArea>
                ) : (
                    <TextField
                        id='tweetEdition'
                        name='tweetEdition'
                        multiline
                        rows={4}
                        value={tweetContent}
                        onChange={handleChange}
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            inputProps: {
                                maxLength: 280,
                            },
                        }}
                    />
                )}
            </div>
            <CardActions className={styles.card__bottom}>
                <div>
                    <ChatBubbleOutlineIcon
                        onClick={redirectToPost}
                        aria-label='retweet'
                    />
                    <Typography>{replies.length}</Typography>
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
                        {likes.length}
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
}, areEqual);
Tweet.displayName = "Tweet";
export default Tweet;
