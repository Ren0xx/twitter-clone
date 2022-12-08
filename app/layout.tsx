"use client";
import "./globals.css";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import Navbar from "../components/Navbar-.";
import Menu from "../components/Navbar";
import useTheme from "../components/theme/theme";
import { darkTheme, lightTheme } from "../components/theme/themes";
import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

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
                        <AnimatePresence
                            // mode='wait'
                            initial={false}>
                            <QueryClientProvider
                                client={queryClient}
                                contextSharing={true}>
                                <Navbar />
                                {children}
                            </QueryClientProvider>
                        </AnimatePresence>
                        <CssBaseline />
                    </ThemeProvider>
                </Container>
            </body>
        </html>
    );
}
