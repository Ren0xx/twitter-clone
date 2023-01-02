"use client";
import { Paper, Box, Typography } from "@mui/material";
const Sidebar = () => {
    return (
        <Paper
            sx={{
                mt: "0.7em",
                ml: "1.3em",
                borderRadius: "2em",
                padding: "0.5em",
            }}>
            <Typography sx={{ mb: "1em" }} variant='h4'>
                Welcome!
            </Typography>
            <Typography sx={{ mb: "4em" }} variant='subtitle1'>
                This project was created for educational purposes, feel free to
                play around with it!
            </Typography>
            <Box>
                Want to contact me? <br />
                Visit my{" "}
                <Typography
                    color='primary'
                    component='a'
                    href='https://github.com/Ren0xx'>
                    Github
                </Typography>
                .
            </Box>
        </Paper>
    );
};

export default Sidebar;
