"use client";
import { Container, Grid, Paper } from "@mui/material";
import style from "../components/styles/Main.module.css";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
export default function Home() {
    return (
        <Container className={style.main}>
            <Grid container justifyContent='space-evenly' alignItems='center'>
                <Grid xs={2}>
                    <div>Menu</div>
                </Grid>
                <Grid xs={2}>
                    <div>Menu</div>
                </Grid>
                <Grid xs={2}>
                    <header>Header</header>
                </Grid>
                <Grid xs={2}>
                    <main>
                        <ThemeSwitchButton />
                        Main feed
                    </main>
                </Grid>
                <Grid xs={2}>
                    <aside>Sidebar</aside>
                </Grid>
                <Grid xs={2}>
                    <footer>Footer</footer>
                </Grid>
            </Grid>
        </Container>
    );
}
