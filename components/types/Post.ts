import type User from './User'
type Post = {
    id?: string;
    body: string;
    replayTo?: string;
    owner: string;
    timeAdded: Date;
}

export default Post;