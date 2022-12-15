import styles from "@/styles/Navbar.module.css";
import { useTheme } from "@mui/material/styles";
import { Button, Paper, Box } from "@mui/material";
import ThemeSwitchButton from "./ThemeSwitchButton";
//icons
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TwitterIcon from "@mui/icons-material/Twitter";

import Link from "next/link";

const Navbar = () => {
    const theme = useTheme();
    return (
        <div className={styles.menu}>
            <div className={styles.icons__top}>
                <TwitterIcon color='secondary' />
                <ThemeSwitchButton />
            </div>
            <Button
                color='secondary'
                startIcon={<HomeIcon />}
                component={Link}
                href='/dashboard'>
                Home
            </Button>
            <Button
                color='secondary'
                startIcon={<TagIcon />}
                component={Link}
                href='/explore'>
                Explore
            </Button>
            <Button
                color='secondary'
                startIcon={<NotificationsActiveIcon />}
                component={Link}
                href='/notifications'>
                Notifications
            </Button>
            <Button
                color='secondary'
                startIcon={<EmailIcon />}
                component={Link}
                href='/messages'>
                Messages
            </Button>
            <Button
                color='secondary'
                startIcon={<BookmarkIcon />}
                component={Link}
                href='/bookmarks'>
                Bookmarks
            </Button>
            <Button
                color='secondary'
                startIcon={<MenuIcon />}
                component={Link}
                href='/lists'>
                Lists
            </Button>
            <Button
                color='secondary'
                startIcon={<PermIdentityIcon />}
                component={Link}
                href='/dashboard/profile'>
                Profile
            </Button>
            <Button
                color='secondary'
                startIcon={<MoreHorizIcon />}
                component={Link}
                href='/more'>
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
};
export default Navbar;
