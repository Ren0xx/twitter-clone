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
import axios from "axios";
import {useState} from "react"
import postTweet from "@/utils/postTweet";
import styles from "../styles/TweetForm.module.css";
import Loader from "@/components/Loading";

import { app } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
type ModalForm = {
    open: boolean;
    handleClose: () => void;
};
import { baseUrl } from "@/utils/baseUrl";

const fetchProfilePic = async (id: string) => {
    try {
        const response = await axios.get(baseUrl + `/api/urls/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};
const TweetForm = (props: ModalForm) => {
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);

    const { open, handleClose } = props;

    //bad - had problems with fetching with useSWR
    const [profUrl, setProfUrl] = useState<string>("https://firebasestorage.googleapis.com/v0/b/fake-twitter0.appspot.com/o/users%2FnoUser%2Fno-user.jpg?alt=media&token=7032fd77-d574-47c1-aceb-eee961dfc1fc")

    if (user !== undefined && user !== null) {
        fetchProfilePic(user.uid).then((profileUrl) => {
            setProfUrl(profileUrl);
        });
    }
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
    if (loading) {
        return <Loader />;
    }
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
                    <Avatar src={profUrl} />
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
