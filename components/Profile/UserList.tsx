"use client";
import { List, ListItem, Avatar, Typography, Button } from "@mui/material";
import type User from "@/components/types/User";

type ProfileProps = {
    users: User[];
};

function UserList({ users }: ProfileProps) {
    return (
            <List>
            {users.map((user) => (
                <ListItem key={user.uid}>
                    {/* <Avatar src={user.profilePictureUrl} /> */}
                    <Typography>{user.name}</Typography>
                    {/* Display additional profile information here, such as the user's name or bio */}
                </ListItem>
            ))}
        </List>
    );
}
export default UserList;
