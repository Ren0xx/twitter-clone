import type User from './User'
type Post = {
    id: string;
    title: string;
    body: string;
    owner: User;
    timeAdded: Date;
}

export default Post;