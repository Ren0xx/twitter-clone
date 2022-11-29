"use client";
import { Container, Grid, Paper } from "@mui/material";
import style from "../components/styles/Main.module.css";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import Menu from "../components/Menu";
import Feed from "../components/Feed";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={style.main}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}>
            <Grid container justifyContent='center' alignItems='flex-start'>
                <Grid sx={{ position: "sticky", top: "4rem" }} item xs={3}>
                    <Menu />
                </Grid>
                <Grid item xs={6}>
                    <Feed />
                </Grid>
                <Grid item xs={3}>
                    <aside>Sidebar</aside>
                </Grid>
            </Grid>
        </motion.div>
    );
}
