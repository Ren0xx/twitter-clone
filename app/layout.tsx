"use client";
import "./globals.css";
import { useState, useEffect, createContext } from "react";
import { darkTheme, lightTheme } from "./theme/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useTheme from "./theme/theme";
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
                <ThemeProvider
                    theme={theme !== "light" ? lightTheme : darkTheme}>
                    {children}
                    <CssBaseline />
                </ThemeProvider>
            </body>
        </html>
    );
}
