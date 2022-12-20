
"use client";
import { Avatar, Typography, Grid } from "@mui/material";
import type User from "@/components/types/User"

const Profile = (props: User) => {
    const {at, name, profilePicture, joinedDate, following, followers, tweets } = props;
    return (
        <Grid container alignItems='center'>
            <Grid item>
                <Avatar src={profilePicture}  />
            </Grid>
            <Grid item xs>
                <Typography variant='h5' >
                    {name}
                </Typography>
                <Typography variant='body2'>
                    @{at}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default Profile;