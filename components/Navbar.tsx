import ThemeSwitchButton from "./ThemeSwitchButton";
import { Theme } from "@mui/material/styles";
import { AppBar, Box, Stack, Toolbar, Grid, Typography } from "@mui/material";
import styles from "./styles/Navbar.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";

const Navbar = () => {
    return (
            <AppBar className={styles.navbar} position='sticky'>
                <Grid container>
                    <Grid item xs={3} className={styles.icons}>
                        <TwitterIcon color='primary' />
                        <ThemeSwitchButton />
                    </Grid>
                    <Grid className={styles.main} item xs={6}>
                        <Typography>Home</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        Search Bar
                    </Grid>
                </Grid>
            </AppBar>
    );
}
export default Navbar;
