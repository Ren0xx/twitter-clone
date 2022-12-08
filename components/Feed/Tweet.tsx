import React from "react";
import Image from "next/image";
import type Post from "../types/Post";
import styles from "../styles/Feed.module.css";
import Link from "next/link";

const Tweet = (props: Post) => {
    const { uid, numberOfReplies, replayTo, likes, owner, content, timeAdded } = props;
    return (
        <div className={styles.post}>
            <div>
                <Link
                    // as={`/users/janek`}
                    href={{
                        pathname: `/users/${uid}`,
                        // query: {
                        //     id: id,
                        // },
                    }}>
                    {uid}
                </Link>
                <p>{content}</p>
                <p>{replayTo !== "" ? `Replay to  ${replayTo}` : ""}</p> 
             </div>
        </div>
    );
};

export default Tweet;
