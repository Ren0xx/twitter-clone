"use client";
import "./globals.css";
import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import useTheme from "@/components/theme/theme";
import { darkTheme, lightTheme } from "@/components/theme/themes";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

//firebase

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useTheme((state: { theme: any }) => state.theme);

    return (
        <html>
            <body>
                <ThemeProvider
                    theme={theme === "light" ? lightTheme : darkTheme}>
                    <Container>
                        <AnimatePresence
                            // mode='wait'
                            initial={false}>
                            <motion.div
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 300, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}>
                                {children}
                                <CssBaseline />
                            </motion.div>
                        </AnimatePresence>
                    </Container>
                </ThemeProvider>
            </body>
        </html>
    );
}
