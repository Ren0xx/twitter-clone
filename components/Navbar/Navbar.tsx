"use client";
import styles from "@/styles/Navbar.module.css";
import { Button, useMediaQuery } from "@mui/material";
import { NoSsr } from "@mui/base";
import { useState } from "react";
import ThemeSwitchButton from "../ThemeSwitchButton";
//icons
import TwitterIcon from "@mui/icons-material/Twitter";
import TweetForm from "../Feed/TweetForm";
import NavbarIconsNormal from "./NavbarIconsNormal";
import NavbarIconsSmall from "./NavbarIconsSmall";

import { useAuth } from "@/utils/useAuth";
const Navbar = () => {
    const smDown = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { logout } = useAuth();
    return (
        <div className={styles.menu}>
            <div className={styles.icons__top}>
                <TwitterIcon color='secondary' />
                <ThemeSwitchButton />
            </div>
            <NoSsr>
                {smDown ? <NavbarIconsSmall /> : <NavbarIconsNormal />}
            </NoSsr>
            <Button
                variant='contained'
                onClick={handleOpen}
                className={styles.post__button}
                sx={{
                    borderRadius: "2em",
                    mr: "0.8em",
                }}
                color='primary'>
                Tweet
            </Button>
            <Button
                sx={{ position: "absolute", bottom: 25, maxWidth: "8em" }}
                onClick={logout}
                variant='outlined'
                size='small'>
                Sign Out
            </Button>
            <TweetForm open={open} handleClose={handleClose} />
        </div>
    );
};
export default Navbar;
