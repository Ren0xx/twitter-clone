"use client";
import { Container, Grid, Paper } from "@mui/material";
import style from "../components/styles/Main.module.css";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import Menu from "../components/Menu";
import Feed from "../components/Feed";
export default function Home() {
    return (
        <div className={style.main}>
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
        </div>
    );
}
