"use client";
import styles from "@/styles/LoginPage.module.css";
import { Container, Paper } from "@mui/material";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                my: "3em",
            }}>
            <Paper className={styles.login__card} variant='outlined'>
                {children}
            </Paper>
        </Container>
    );
};

export default layout;
