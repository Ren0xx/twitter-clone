"use client";
import styles from "../../components/styles/LoginPage.module.css";
import { Container, Stack, Paper, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Link from "next/link";
export default function Login() {
    const theme = useTheme();
    const bgColor = theme?.palette.mode === 'dark' ? "#000000": "#fff";
    return (
        <Container
            sx={{
                backgroundColor: bgColor,
            }}
            className={styles.container}>
            <Button
                sx={{ position: "absolute", top: 0, left: 0 }}
                color='primary'
                startIcon={<KeyboardArrowLeftIcon />}
                component={Link}
                href='/'>
                Go back
            </Button>
            <Paper className={styles.login__card} variant='outlined'>
                <Stack
                    sx={{ minHeight: "28em" }}
                    spacing={5}
                    alignItems='center'
                    justifyContent='center'>
                    <TwitterIcon fontSize='large' />
                    <Typography variant='h4'>Login in on Twitter</Typography>
                    <Button
                        color='secondary'
                        variant='contained'
                        startIcon={<GoogleIcon />}>
                        Login through Google
                    </Button>
                    <Button color='info' variant='contained'>
                        Don&apos;t remember password?
                    </Button>
                </Stack>
                <Typography variant='caption'>
                    Don&apos;t have an account yet?
                    <Button
                        disableElevation={true}
                        component={Link}
                        href='/register'>
                        Create an account now
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}
