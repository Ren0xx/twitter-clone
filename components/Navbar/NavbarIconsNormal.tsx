"use client";
import { Button } from "@mui/material";
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

import { useUserStore } from "@/utils/useAuth";


const NavbarIconsNormal = () => {
    const user = useUserStore((state) => state.user);
    const id =  user !== null ? user.uid : 'no-user';
    return (
        <>
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
                href={`/dashboard/users/${id}`}>
                Profile
            </Button>
            <Button
                color='secondary'
                startIcon={<MoreHorizIcon />}
                component={Link}
                href='/more'>
                More
            </Button>
        </>
    );
};
export default NavbarIconsNormal;
