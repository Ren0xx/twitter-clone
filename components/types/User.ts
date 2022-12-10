type User = {
    uid: string;
    at: string;
    name: string;
    profilePicture: string;
    joinedDate:  {seconds: string, nanoseconds: string} | string;
    following: string[];
    followers: string[];
    tweets: string[];
    replies:string[]
}

export default User;