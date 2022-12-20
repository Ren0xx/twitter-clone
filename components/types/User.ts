
type User = {
    uid?: string;
    at: string;
    name: string;
    profilePicture?: string;
    joinedDate: {nanoseconds: number, seconds: number};
    following: string[];
    followers: string[];
    tweets: string[];
}

export default User;