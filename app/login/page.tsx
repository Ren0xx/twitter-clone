"use client";
import styles from "../../components/styles/LoginPage.module.css";
import { Container, Stack, Paper, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { GoogleAuthProvider,  sendPasswordResetEmail } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebaseConfig";

export default function Login() {
    const auth = getAuth(app);
    const [user, loading, error] = useAuthState(auth);

    const router = useRouter();
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    const login = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                console.log(errorCode, errorMessage);
            });
    };
    // const resetPassword = () => {
    //     sendPasswordResetEmail(auth, email)
    //         .then(()=> {

    //         })
    //         .catch(error => {
    //             const errorCode = error.code
    //             const errorMessage = error.message;
    //         })
    // }

    const theme = useTheme();
    const bgColor = theme?.palette.mode === "dark" ? "#000000" : "#fff";
    // if (user && !loading) {
    //     router.push("/");
    // }
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
                        startIcon={<GoogleIcon />}
                        onClick={login}>
                        Login or create an account through Google
                    </Button>
                    <Button color='info' variant='contained'>
                        Don&apos;t remember password?
                    </Button>
                </Stack>
                
            </Paper>
        </Container>
    );
}
