type User = {
    id: string;
    username: string;
    name: string;
    photo?: string;
    joinedDate: Date;
    following: User[];
    followers: User[];
}

export default User;