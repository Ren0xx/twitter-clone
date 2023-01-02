"use client";
import { Backdrop, CircularProgress } from "@mui/material/";

const Loader = () => {
    return (
        <Backdrop
            color='primary'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color='primary' />
        </Backdrop>
    );
};

export default Loader;
