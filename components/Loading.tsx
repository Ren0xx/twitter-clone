"use client";
import { Backdrop, CircularProgress } from "@mui/material/";

const Loader = () => {
    return (
        <Backdrop
            color='primary'
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
};

export default Loader;
