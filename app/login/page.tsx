"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { app } from "../../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useTheme from "@/components/theme/theme";

import { useFormik } from "formik";
import * as yup from "yup";

import {
    InputAdornment,
    Button,
    Stack,
    Typography,
    TextField,
    Container,
    Paper,
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
    const auth = getAuth(app);
    const router = useRouter();

    const theme = useTheme((state: { theme: any }) => state.theme);
    const inputBgColor = theme === "light" ? "#fff" : "#16181c";
    const inputStyle = {
        WebkitBoxShadow: `0 0 0 1000px ${inputBgColor} inset`,
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleLogin = (login: string, password: string) => {
        signInWithEmailAndPassword(auth, login, password)
            .then(() => {
                router.push("/dashboard");
            })
            .catch(() => {
                formik.values.password = "";
            });
    };
    return (
        <Stack
            autoComplete='off'
            spacing={5}
            sx={{ width: "25rem" }}
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
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
    );
}
