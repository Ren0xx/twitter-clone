
type User = {
    uid?: string;
    at: string;
    name: string;
    email : string;
    profilePicture: string;
    joinedDate: {nanoseconds: number, seconds: number};
    following: string[];
    followers: string[];
    tweets: string[];
    replies:string[]
}

export default User;