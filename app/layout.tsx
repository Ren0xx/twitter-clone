"use client";
import "./globals.css";
import { useState, useEffect, createContext } from "react";
import { darkTheme, lightTheme } from "./theme/themes";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import { Theme } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import useTheme from "./theme/theme";
import { AnimatePresence } from "framer-motion";
declare module "@mui/material/styles" {
    interface DefaultTheme extends Theme {}
}
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme((state) => state.theme);
    return (
        <html lang='en'>
            <body>
                <Container>
                    <ThemeProvider
                        theme={theme !== "light" ? lightTheme : darkTheme}>
                        <AnimatePresence mode='wait' initial={false}>
                            <Navbar />
                            {children}
                        </AnimatePresence>
                        <CssBaseline />
                    </ThemeProvider>
                </Container>
            </body>
        </html>
    );
}
