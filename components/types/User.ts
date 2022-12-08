type User = {
    id?: string;
    at: string;
    name: string;
    profilePicture?: string;
    joinedDate: Date;
    following: string[];
    followers: string[];
    tweets: string[];
    replies:string[]
}

export default User;