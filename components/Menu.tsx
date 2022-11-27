import styles from "./styles/Menu.module.css";
import { Button, Paper } from "@mui/material";
import ThemeSwitchButton from "./ThemeSwitchButton";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
export default function Menu() {
    const theme = useTheme();
    const { main, light } = theme.palette.primary;
    return (
        <div className={styles.menu}>
            <Button
                color='secondary'
                startIcon={<HomeIcon />}>
                Home
            </Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button>item</Button>
            <Button color='primary'>Tweet</Button>
        </div>
    );
}
