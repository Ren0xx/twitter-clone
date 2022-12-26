"use client";
import { List, ListItem, Avatar, Box, Typography, Button } from "@mui/material";
import type User from "@/components/types/User";
import UserListProfile from "./UserListProfile";
type ProfileProps = {
    users: User[];
};
export default function UserList({ users }: ProfileProps) {
    return (
        <List>
            {users?.map((user) => (
                <ListItem key={user.uid}>
                    <UserListProfile user={user} />
                </ListItem>
            ))}
            {users.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: "5em",
                    }}>
                    <Typography variant='h6'>No users yet : /.</Typography>
                </Box>
            )}
        </List>
    );
}
