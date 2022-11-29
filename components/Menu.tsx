import styles from "./styles/Menu.module.css";
import ThemeSwitchButton from "./ThemeSwitchButton";

import { useTheme } from "@mui/material/styles";
import { Button, Paper, Box } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function Menu() {
    const theme = useTheme();
    const { main, light } = theme.palette.primary;
    return (
        <div className={styles.menu}>
            <Button color='secondary' startIcon={<HomeIcon />}>
                Home
            </Button>
            <Button color='secondary' startIcon={<TagIcon />}>
                Explore
            </Button>
            <Button color='secondary' startIcon={<NotificationsActiveIcon />}>
                Notifications
            </Button>
            <Button color='secondary' startIcon={<EmailIcon />}>
                Messages
            </Button>
            <Button color='secondary' startIcon={<BookmarkIcon />}>
                Bookmarks
            </Button>
            <Button color='secondary' startIcon={<MenuIcon />}>
                Lists
            </Button>
            <Button color='secondary' startIcon={<PermIdentityIcon />}>
                Profile
            </Button>
            <Button color='secondary' startIcon={<MoreHorizIcon />}>
                More
            </Button>
            <Button
                variant='contained'
                className={styles.post__button}
                sx={{
                    borderRadius: "2em",
                    mr: "0.8em",
                }}
                color='primary'>
                Tweet
            </Button>
        </div>
    );
}
