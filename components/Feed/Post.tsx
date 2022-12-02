import React from "react";
import Image from "next/image";
import type Post from "../types/Post";
import styles from "../styles/Feed.module.css";
import profilePicture from "../mock/profile.png";
import Link from "next/link";

const Post = (props: Post) => {
    const { body, owner, timeAdded, replayTo, id } = props;
    return (
        <div className={styles.post}>
            <Image
                src={profilePicture}
                alt='Profile picture'
                width={55}
                height={55}
            />
            <div>
                <Link
                    // as={`/users/janek`}
                    href={{
                        pathname: `/users/${id}`,
                        query: {
                            id: id,
                        },
                    }}>
                    {id}
                </Link>
                <p>{body}</p>
                <p>{replayTo !== "" ? `Replay to  ${replayTo}` : ""}</p>
            </div>
        </div>
    );
};

export default Post;
