type Post = {
    uid?: string;
    owner: string;
    timeAdded: {seconds: number, nanoseconds: number};
    content: string;
    likes: number;
    numberOfReplies: number;

}

export default Post;