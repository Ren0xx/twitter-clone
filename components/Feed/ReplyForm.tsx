import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useUserStore } from "@/utils/useAuth";

import styles from "@/components/styles/ReplyForm.module.css";
import { Avatar, Box, TextField, Typography, Button } from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import postReply from "@/utils/postReply";

type PostProps = {
    postId: string;
};
const ReplyForm = ({ postId }: PostProps) => {
    const user = useUserStore((state) => state.user);
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/api/urls/${user?.uid}`;
    const { data: photoUrl } = useSWR(url, fetcher, {
        suspense: true,
    });
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
    return (
        <Box
            className={styles.form}
            component='form'
            onSubmit={formik.handleSubmit}
            sx={{ mt: "3em" }}>
            <Box className={styles.form__left}>
                <Avatar src={photoUrl} />
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
