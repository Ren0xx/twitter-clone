"use client";
import { Container, Paper } from "@mui/material";
import styles from "../../components/styles/LoginPage.module.css";
export default function Login() {
    return (
        <div className={styles.container}>
            <Container>
                <form className={styles.form}>
                    <label>Login</label>
                    <input /> 
                    <label>Hi</label>
                    <input /> 
                </form>
                </Container>
        </div>
    );
}
