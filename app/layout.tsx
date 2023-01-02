"use client";
import "./globals.css";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import useTheme from "@/components/theme/theme";
import { darkTheme, lightTheme } from "@/components/theme/themes";
import { useMemo } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme((state: { theme: any }) => state.theme);
    const selectedTheme = useMemo(() => {
        return theme === "light" ? lightTheme : darkTheme;
    }, [theme]);
    return (
        <html>
            <body>
                <ThemeProvider theme={selectedTheme}>
                    <Container>{children}</Container>
                    <CssBaseline />
                </ThemeProvider>
            </body>
        </html>
    );
}
