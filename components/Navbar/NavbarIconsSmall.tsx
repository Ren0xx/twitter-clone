"use client";
import { IconButton } from "@mui/material";
//icons
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Link from "next/link";

const NavbarIconsSmall = () => {
    return (
        <>
            <IconButton
                color='secondary'
                component={Link}
                href='/dashboard'
                title='Home'>
                <HomeIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/explore'
                title='Explore'>
                <TagIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/notifications'
                title='Notifications'>
                <NotificationsActiveIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/messages'
                title='messages'>
                <EmailIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/bookmarks'
                title='bookmarks'>
                <BookmarkIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/lists'
                title='lists'>
                <MenuIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/dashboard/profile'
                title='profile'>
                <PermIdentityIcon />
            </IconButton>
            <IconButton
                color='secondary'
                component={Link}
                href='/more'
                title='more'>
                <MoreHorizIcon />
            </IconButton>
        </>
    );
};
export default NavbarIconsSmall;
