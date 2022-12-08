type Post = {
    uid: string;
    owner: string;
    timeAdded: {seconds: string, nanoseconds: string}
    content: string;
    replayTo?: string;
    likes: number;
    numberOfReplies: number;

}

export default Post;