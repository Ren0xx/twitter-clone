"use client";
import { Container, Grid, Paper } from "@mui/material";
import style from "../components/styles/Main.module.css";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import Menu from "../components/Menu";
export default function Home() {
    return (
        <Container className={style.main}>
            <Grid container justifyContent='space-evenly' alignItems='center'>
                <Grid item xs={2}>
                    <Menu />
                </Grid>
                <Grid item xs={2}>
                    <header>Header</header>
                </Grid>
                <Grid item xs={2}>
                    <aside>Sidebar</aside>
                </Grid>
                <Grid item xs={2}>
                    <footer>Footer</footer>
                </Grid>
                <Grid item xs={2}>
                    <main>
                        <ThemeSwitchButton />
                        Main feed
                    </main>
                </Grid>
            </Grid>
        </Container>
    );
}
