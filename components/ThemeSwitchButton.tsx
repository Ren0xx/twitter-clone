import { IconButton, Box, ThemeProvider, CssBaseline } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface DefaultTheme extends Theme {}
}

type themeProps = {
    activeTheme: Theme | string;
    toggleTheme: () => void;
};

export default function ThemeSwitchButton(props: themeProps) {
    const { activeTheme, toggleTheme } = props;
    return (
        <IconButton onClick={toggleTheme} color='inherit'>
            {activeTheme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}
