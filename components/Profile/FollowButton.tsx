import { Button } from "@mui/material";
import useFollow from "@/utils/useFollow";
import styles from "@/components/styles/Profile.module.css";

type ProfileProps = {
    ownerId: string | null | undefined;
    ownerFollowers: string[];
    loggedUserId: string;
    loggedUserFollowing: string[];
    isLoggedUserOwner: boolean;
};
const FollowButton = (props: ProfileProps) => {
    const {
        ownerId,
        ownerFollowers,
        loggedUserId,
        loggedUserFollowing,
        isLoggedUserOwner,
    } = props;
    const { isFollowing, followOrUnfollow } = useFollow(
        ownerId,
        ownerFollowers,
        loggedUserId,
        loggedUserFollowing
    );
    return !isLoggedUserOwner ? (
        <Button
            onClick={followOrUnfollow}
            className={styles.followButton}
            variant='contained'
            color='secondary'>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    ) : (
        <></>
    );
};
export default FollowButton;
