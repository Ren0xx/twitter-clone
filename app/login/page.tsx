"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useTheme from "@/components/theme/theme";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { useUserStore } from "@/utils/useAuth";

import {
    InputAdornment,
    Button,
    Stack,
    Typography,
    TextField,
    Snackbar,
    Alert,
} from "@mui/material";
//icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import TwitterIcon from "@mui/icons-material/Twitter";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
});

export default function Login() {
    const theme = useTheme((state: { theme: any }) => state.theme);
    const inputBgColor = theme === "light" ? "#fff" : "#000000";
    const inputStyle = {
        WebkitBoxShadow: `0 0 0 1000px ${inputBgColor} inset`,
    };
    const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
    const handleClose = () => {
        setIsErrorOpen(false);
    };
    const router = useRouter();
    const auth = getAuth(app);
    const setUser = useUserStore((s) => s.setUser);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleLogin(values.email, values.password);
        },
    });
    const handleLogin = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                setUser({ uid: user.user.uid, email: email });
                router.push("/dashboard");
            })
            .catch(() => {
                formik.values.password = "";
                setIsErrorOpen(true);
            });
    };
    return (
        <>
            <Stack
                autoComplete='off'
                spacing={5}
                component='form'
                onSubmit={formik.handleSubmit}>
                <TwitterIcon fontSize='large' />
                <Typography variant='h4'>Login in on Twitter</Typography>
                <TextField
                    autoComplete='false'
                    fullWidth
                    id='email'
                    name='email'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <MailOutlineIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{ style: inputStyle }}
                />
                <TextField
                    autoComplete='false'
                    color='primary'
                    fullWidth
                    id='password'
                    name='password'
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <KeyIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{ style: inputStyle }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    size='large'
                    sx={{ borderRadius: "15px" }}>
                    Login
                </Button>
                <p>Don&apos;t have an account yet?</p>
                <Link href='/register'>
                    <Typography>Create an account</Typography>
                </Link>
            </Stack>
            <Snackbar open={isErrorOpen} onClose={handleClose}>
                <Alert severity='error' sx={{ width: "100%" }}>
                    Password is invalid. Please try again
                </Alert>
            </Snackbar>
        </>
    );
}
