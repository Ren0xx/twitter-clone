import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import type User from "@/components/types/User";
import { Avatar, Box, Typography } from "@mui/material";
import styles from "@/components/styles/Profile.module.css";
import Link from "next/link";
import Error from "@/components/Error"
type Props = {
    user: User;
};

const UserListProfile = ({ user }: Props) => {
    const { data: photoUrl, error: error } = useSWR(
        `/api/urls/${user.uid}`,
        fetcher,
        {
            suspense: true,
        }
    );
    if (error) {
        return <Error />;
    }

    return (
        <Link href={`/dashboard/users/${user.uid}`} style={{ width: "100%" }}>
            <Box
                className={styles.userList__profile}
                sx={{
                    "&:hover": {
                        backgroundColor: "primary.dark",
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}>
                <Avatar src={photoUrl} sx={{ width: 45, height: 45 }} />
                <Box
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: "column",
                    }}>
                    <Typography variant='h6'>{user.name}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                        @{user.at}
                    </Typography>
                </Box>
            </Box>
        </Link>
    );
};

export default UserListProfile;
