import ThemeSwitchButton from "./ThemeSwitchButton";
import { Theme } from "@mui/material/styles";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import styles from "./styles/Navbar.module.css";
declare module "@mui/material/styles" {
    interface DefaultTheme extends Theme {}
}
type themeProps = {
    activeTheme: Theme | string;
    toggleTheme: () => void;
};

export default function Navbar(props: themeProps) {
    return (
        <Box>
            <AppBar className={styles.navbar} color='transparent'>
                <button>Hi</button>
                <div>Hi</div>
                <ThemeSwitchButton
                    activeTheme={props.activeTheme}
                    toggleTheme={props.toggleTheme}
                />
            </AppBar>
        </Box>
    );
}
