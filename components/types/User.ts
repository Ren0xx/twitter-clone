type User = {
    id: string;
    at: string;
    name: string;
    profilePicture?: string;
    joinedDate: Date;
    following: User[];
    followers: User[];
}

export default User;