type Post = {
    uid: string;
    owner: string;
    timeAdded: {seconds: number, nanoseconds: number};
    content: string;
    likes: number;
    replies: string[];

}

export default Post;