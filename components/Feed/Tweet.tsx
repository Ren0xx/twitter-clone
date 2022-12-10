import React from "react";
import Image from "next/image";
import type Post from "../types/Post";
import styles from "../styles/Feed.module.css";
import Link from "next/link";

const Tweet = (props: Post) => {
    const { uid, numberOfReplies, replayTo, likes, owner, content, timeAdded } =
        props;
    // const photo =
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
                <Image
                    src='https://storage.googleapis.com/fake-twitter0.appspot.com/users/id_of_user/photo?GoogleAccessId=firebase-adminsdk-zh9fy%40fake-twitter0.iam.gserviceaccount.com&Expires=1742166000&Signature=FhTJI7S1WIBDt8XxOlvB39natw0QbmNqb1cUrV2TipJLCz4w4IDnF9A8CTR4sQhZeCP9L77gvIy%2Bf9RYnarpf07sZVkho9FiR%2Fx%2FILbyEulebYGA6qdbBCS5LbUChty%2Bsow%2FFBBRts8apza5g%2BBfd8%2BG8Jg5pjT%2BeH1jg7pMm2NymjTXy5USAVYePDyX%2BPiev%2FUUleG%2BkrzFySCwnwb7sxsaQog0mM%2BFjUESImrsWAngk8yRkc47JHCecGwAi0WsY%2F81jQXMPQEROs31fNCVnTLslDKy5OfVFhzxiFUFD%2B6eUiEhT168zKhcWfmNimlfZZtP6dDfHYdpanaAXSiI6A%3D%3D'
                    alt='...'
                    width={100}
                    height={100}
                />
                <p>{content}</p>
                <p>{replayTo !== "" ? `Replay to  ${replayTo}` : ""}</p>
            </div>
        </div>
    );
};

export default Tweet;
