"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUserStore } from "@/utils/useAuth";
import useTheme from "@/components/theme/theme";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { app, storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import {
    InputAdornment,
    Button,
    Stack,
    Typography,
    TextField,
    Alert,
    Snackbar,
} from "@mui/material";
//icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import { baseUrl } from "@/utils/baseUrl";
import type User from "@/components/types/User";
const validationSchema = yup.object({
    at: yup
        .string()
        .min(1, "Can't be empty")
        .max(25, "Can't be more than 25 characters")
        .required("This field is required"),
    name: yup
        .string()
        .min(1, "Can't be empty")
        .max(25, "Can't be more than 25 characters")
        .required("This field is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .max(25, "Can't be more than 25 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
});
export default function Register() {
    const auth = getAuth(app);
    const router = useRouter();
    const setUser = useUserStore((s) => s.setUser);

    const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
    const handleClose = () => {
        setIsErrorOpen(false);
    };
    const formik = useFormik({
        initialValues: {
            at: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            sendUserData(values, resetForm);
        },
    });

    const [profilePicture, setProfilePicture] = useState<any>();
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const theme = useTheme((state: { theme: any }) => state.theme);
    const inputBgColor = theme === "light" ? "#fff" : "#000000";
    const inputStyle = {
        WebkitBoxShadow: `0 0 0 1000px ${inputBgColor} inset`,
    };
    const uploadFileButtonColor =
        profilePicture !== undefined ? "secondary" : "error";

    //file operations
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

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
            setProfilePicture(image);
        } catch (error) {
            console.error(error);
        }
    };
    //sending data
    const sendUserData = async (values: any, reset: () => void) => {
        const url = baseUrl + "/api/users";
        const { at, name } = values;
        const userData: User = {
            at: at,
            name: name,
            joinedDate: Timestamp.now(),
            following: [],
            followers: [],
        };
        createUser(reset, userData, url, values);
    };
    const createUser = async (
        reset: () => void,
        userData: User,
        url: string,
        values: any
    ) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            const uid = userCredential.user.uid;
            await axios.post(url, {
                uid,
                ...userData,
            });
            await uploadBytes(
                ref(storage, `/users/${uid}/profilePicture`),
                profilePicture
            );
            setUser({ uid: uid, email: userCredential.user.email });
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            setIsErrorOpen(true);
            reset();
            setProfilePicture(undefined);
        }
    };

    return (
        <>
            <Stack spacing={3} component='form' onSubmit={formik.handleSubmit}>
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
                    id='name'
                    name='name'
                    label='Username'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    Sign up
                </Button>
                <p>Already have an account yet?</p>
                <Link href='/login'>
                    <Typography>Sign in</Typography>
                </Link>
                <Snackbar open={isErrorOpen} onClose={handleClose}>
                    <Alert severity='error'>Email is already taken.</Alert>
                </Snackbar>
            </Stack>
        </>
    );
}
