
type User = {
    uid?: string | null;
    at: string;
    name: string;
    profilePicture?: string;
    joinedDate: {nanoseconds: number, seconds: number};
    following: string[];
    followers: string[];
}

export default User;