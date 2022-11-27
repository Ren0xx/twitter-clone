import ThemeSwitchButton from "./ThemeSwitchButton";
import { Theme } from "@mui/material/styles";
import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import styles from "./styles/Navbar.module.css";

export default function Navbar() {
    return (
        <Box>
            <AppBar className={styles.navbar} color='transparent'>
                <button>Hi</button>
                <div>Hi</div>
                <ThemeSwitchButton />
            </AppBar>
        </Box>
    );
}
