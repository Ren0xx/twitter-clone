"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
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
    Menu,
    Button,
    MenuItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";

import useLike from "@/utils/useLike";
import getDayAndTime from "@/utils/dates/getDayandTime";
import { useUserStore } from "@/utils/useAuth";
import { useRouter, usePathname } from "next/navigation";
import deleteReply from "@/utils/deleteReply";
import editReply from "@/utils/editReply";
import Error from "@/components/Error";

type Reply = {
    uid: string;
    owner: string;
    timeAdded: { seconds: number; nanoseconds: number };
    content: string;
    likes: string[];
};

const areEqual = (prevProps: Reply, nextProps: Reply) => {
    const { uid, likes, owner, content, timeAdded } = prevProps;
    return (
        uid === nextProps.uid &&
        likes === nextProps.likes &&
        owner === nextProps.owner &&
        content === nextProps.content &&
        timeAdded.nanoseconds === nextProps.timeAdded.nanoseconds &&
        timeAdded.seconds === nextProps.timeAdded.seconds
    );
};
const Reply = React.memo((props: Reply) => {
    const user = useUserStore((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();

    const parentTweetId =
        pathname !== null && pathname.split("/")[3]
            ? pathname.split("/")[3]
            : "";

    const { uid, likes, owner, content, timeAdded } = props;

    const dayWhenPosted = useMemo(() => {
        return getDayAndTime(timeAdded.nanoseconds, timeAdded.seconds);
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
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleConfirm = () => {
        deleteReply(uid, parentTweetId);
        handleDialogClose();
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
        editReply(tweetContent, uid); //send request
        router.refresh();
    };
    const { isLiked, likeOrDislike } = useLike(
        uid,
        user?.uid,
        likes,
        "replies"
    );
    if (e1 || e2) {
        return <Error />;
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
                        <Typography variant='subtitle1' color='textSecondary'>
                            {dayWhenPosted}
                        </Typography>
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
                        {/* Confirmation dialog */}
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
                    <CardActionArea disableRipple>
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
                    <ChatBubbleOutlineIcon aria-label='retweet' />
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
Reply.displayName = "Reply";
export default Reply;
