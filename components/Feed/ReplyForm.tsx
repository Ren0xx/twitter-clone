import styles from "@/components/styles/ReplyForm.module.css";
import { Avatar, Box, TextField, Typography, Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import postReply from "@/utils/postReply";

type PostProps = {
    postId: string;
};
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import Loader from "@/components/Loading";
import { app } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const fetchProfilePic = async (id: string) => {
    try {
        const response = await axios.get(baseUrl + `/api/urls/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};
const ReplyForm = ({ postId }: PostProps) => {
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);

    //bad- had problems with fetching with useSWR
    const [profUrl, setProfUrl] = useState<string>(
        "https://firebasestorage.googleapis.com/v0/b/fake-twitter0.appspot.com/o/users%2FnoUser%2Fno-user.jpg?alt=media&token=7032fd77-d574-47c1-aceb-eee961dfc1fc"
    );
    if (user !== undefined && user !== null) {
        fetchProfilePic(user.uid).then((profileUrl) => {
            setProfUrl(profileUrl);
        });
    }
    const formik = useFormik({
        initialValues: {
            reply: "",
        },
        validationSchema: Yup.object({
            reply: Yup.string().required().min(1).max(280),
        }),
        onSubmit: (values, { resetForm }) => {
            if (user) {
                postReply(values.reply, postId, user.uid);
                resetForm();
            }
        },
    });
    if (loading) {
        return <Loader />;
    }
    return (
        <Box
            className={styles.form}
            component='form'
            onSubmit={formik.handleSubmit}
            sx={{ mt: "3em" }}>
            <Box className={styles.form__left}>
                <Avatar src={profUrl} />
                <Typography variant='body2'>
                    {formik.values.reply.length}/280
                </Typography>
            </Box>
            <TextField
                id='reply'
                name='reply'
                multiline
                placeholder='Tweet your reply'
                variant='standard'
                value={formik.values.reply}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                    inputProps: {
                        maxLength: 280,
                    },
                }}
            />
            <Button
                className={styles.submitButton}
                variant='contained'
                disabled={Boolean(formik.errors.reply) || !user}
                type='submit'>
                Reply
            </Button>
        </Box>
    );
};

export default ReplyForm;
