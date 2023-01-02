"use client";
import { Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Error = () => {
    const router = useRouter();
    const goBack = () => router.back();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Typography variant='h5' color='textSecondary'>
                Something went wrong.
            </Typography>
            <Button variant='outlined' color='primary' onClick={goBack}>
                Go back
            </Button>
        </Box>
    );
};

export default Error;
