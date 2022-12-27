import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Button,
    Avatar,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import postTweet from "@/utils/postTweet";
import { app } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import styles from "../styles/TweetForm.module.css";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

import { useUserStore } from "@/utils/useAuth";
type ModalForm = {
    open: boolean;
    handleClose: () => void;
};

const TweetForm = (props: ModalForm) => {
    const { open, handleClose } = props;
    const user = useUserStore((state) => state.user);
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/urls/${user?.uid}`;
    const { data: photoUrl } = useSWR(url, fetcher, {
        suspense: true,
    });
    const formik = useFormik({
        initialValues: {
            tweet: "",
        },
        validationSchema: Yup.object({
            tweet: Yup.string().required().min(1).max(280),
        }),
        onSubmit: (values, { resetForm }) => {
            if (user) {
                postTweet(values.tweet, user.uid);
                handleClose();
                resetForm();
            }
        },
    });
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                className={styles.modal}
                disableAutoFocus={true}>
                <Paper
                    component='form'
                    onSubmit={formik.handleSubmit}
                    style={{ width: "100%" }}
                    className={styles.form}>
                    <Avatar src={photoUrl} alt='...' />
                    <TextField
                        id='tweet'
                        name='tweet'
                        multiline
                        rows={4}
                        placeholder='Write something...'
                        value={formik.values.tweet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            inputProps: {
                                maxLength: 280,
                            },
                        }}
                    />
                    <div className={styles.form__bottom}>
                        <Typography variant='body2'>
                            {formik.values.tweet.length}/280
                        </Typography>
                        <Button
                            variant='contained'
                            disabled={Boolean(formik.errors.tweet) || !user}
                            color='primary'
                            type='submit'>
                            Tweet
                        </Button>
                    </div>
                </Paper>
            </Modal>
        </>
    );
};

export default TweetForm;