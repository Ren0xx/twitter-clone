"use client";
import { useContext } from "react";
import { IconButton} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../app/layout";

export default function ThemeSwitchButton() {
    const theme = useContext(ThemeContext);
    return (
        <ThemeContext.Consumer>
            {({ activeTheme, toggleTheme }) => (
                <IconButton onClick={toggleTheme} color='inherit'>
                    {activeTheme === "dark" ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
            )}
        </ThemeContext.Consumer>
    );
}
