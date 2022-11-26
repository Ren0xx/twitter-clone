"use client";
import "./globals.css";
import { useState, useEffect, createContext } from "react";
import { darkTheme, lightTheme } from "./theme/themes";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
declare module "@mui/material/styles" {
    interface DefaultTheme extends Theme {}
}
type themeProps = {
    activeTheme: Theme | string;
    toggleTheme: () => void;
};
export const ThemeContext = createContext<themeProps>({activeTheme: 'dark', toggleTheme: () => {}});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [activeTheme, setActiveTheme] = useState(darkTheme);
    const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(
        "dark"
    );
    const getActiveTheme = (themeMode: "light" | "dark") => {
        return themeMode === "light" ? lightTheme : darkTheme;
    };
    const toggleTheme = () => {
        const desiredTheme = selectedTheme === "light" ? "dark" : "light";

        setSelectedTheme(desiredTheme);
    };
    useEffect(() => {
        setActiveTheme(getActiveTheme(selectedTheme));
    }, [selectedTheme]);

    return (
        <html lang='en'>
            <head>
                <title>Twitter Clone</title>
                <meta
                    name='description'
                    content='Twitter Clone created with Next 13'
                />
                <link rel='icon' href='/favicon.ico' />
            </head>

            <body>
                <ThemeProvider theme={activeTheme}>
                    <CssBaseline />
                    <div className='myclass'>
                        {/* <Navbar
                            activeTheme={activeTheme}
                            toggleTheme={toggleTheme}
                        /> */}
                        <ThemeContext.Provider
                            value={{
                                activeTheme: activeTheme,
                                toggleTheme: toggleTheme,
                            }}>
                            {children}
                            <ThemeSwitchButton />
                        </ThemeContext.Provider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
