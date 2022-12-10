"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import useTheme from "@/components/theme/theme";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { app, storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Resizer from "react-image-file-resizer";
import {
    InputAdornment,
    Button,
    Stack,
    Typography,
    TextField,
    Input,
} from "@mui/material";
//icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const validationSchema = yup.object({
    at: yup
        .string()
        .min(1, "Can't be empty")
        .required("This field is required"),
    username: yup
        .string()
        .min(1, "Can't be empty")
        .required("This field is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
});

export default function Register() {
    const auth = getAuth(app);
    const storageRef = ref(storage, "/users/id_of_user/photo");

    const router = useRouter();

    const [profilePicture, setProfilePicture] = useState<any>();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const theme = useTheme((state: { theme: any }) => state.theme);
    const inputBgColor = theme === "light" ? "#fff" : "#16181c";
    const inputStyle = {
        WebkitBoxShadow: `0 0 0 1000px ${inputBgColor} inset`,
    };
    const resizeFile = (file: File) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const formik = useFormik({
        initialValues: {
            at: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            alert(profilePicture);
        },
    });
    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
            setProfilePicture(image);
            // uploadBytes(storageRef, profilePicture).then((snapshot) => {
            // });
            console.log("Uploaded a blob or file!");
            console.log(image);
        } catch (error) {
            console.error(error);
        }
    };
    const createUser = () => {};
    const uploadFileButtonColor =
        profilePicture !== undefined ? "secondary" : "error";
    return (
        <Stack
            spacing={3}
            sx={{ width: "25rem" }}
            component='form'
            onSubmit={formik.handleSubmit}>
            <TwitterIcon fontSize='large' />
            <Typography variant='h4'>Create an account</Typography>
            <Button
                onClick={handleClick}
                variant='outlined'
                color={uploadFileButtonColor}
                component='label'>
                Upload profile picture
                <input
                    type='file'
                    ref={hiddenFileInput}
                    onChange={onChange}
                    hidden
                    accept='image/*'
                />
            </Button>
            <TextField
                id='at'
                name='at'
                label='At'
                value={formik.values.at}
                onChange={formik.handleChange}
                error={formik.touched.at && Boolean(formik.errors.at)}
                helperText={formik.touched.at && formik.errors.at}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AlternateEmailIcon />
                        </InputAdornment>
                    ),
                }}
                inputProps={{ style: inputStyle }}
            />
            <TextField
                id='username'
                name='username'
                label='Username'
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                    formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <AccountBoxIcon />
                        </InputAdornment>
                    ),
                }}
                inputProps={{ style: inputStyle }}
            />
            <TextField
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
            <TextField
                color='primary'
                fullWidth
                id='confirmPassword'
                name='confirmPassword'
                label='Repeat password'
                type='password'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                }
                helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
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
                sx={{ borderRadius: "15px" }}
                disabled={profilePicture === undefined}>
                Login
            </Button>
            <p>Already have an account yet?</p>
            <Link href='/register'>
                <Typography>Sign in</Typography>
            </Link>
        </Stack>
    );
}
