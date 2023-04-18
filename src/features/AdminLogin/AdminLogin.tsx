import { Button, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo/logo-1.webp';
import { AppDispatch } from '../../utils/interfaces';
import { changeEmail, changePassword, clearFields, login, selectEmail, selectEmailError, selectPassword, selectPasswordError, toggleEmailError, togglePasswordError } from './adminLoginSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    logo: {
        borderRadius: '50%',
        width: `${theme.typography.pxToRem(200)}`,
        margin: `${theme.typography.pxToRem(16)} 0`,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.typography.pxToRem(24),
        textDecoration: "none",
        color: "#000",
        transition: "color 0.3s ease-in-out",
        '&:hover': {
            color: "#0000FF"
        }
    }
}))

const AdminLogin = () => {

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const email = useSelector(selectEmail);
    const emailError = useSelector(selectEmailError);
    const password = useSelector(selectPassword);
    const passwordError = useSelector(selectPasswordError);

    const classes = useStyles();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                dispatch(changeEmail(value));
                break;
            case 'password':
                dispatch(changePassword(value));
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)  => {
        e.preventDefault();

        if (!email) {
            dispatch(toggleEmailError())
            return;
        }

        if (!password) {
            dispatch(togglePasswordError());
            return;
        }

        if (!email || !password) {
            return;    
        }

        dispatch(login({email, password}))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    text: "Redirecting...",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    dispatch(clearFields());
                    navigate('/admin', { replace: true })
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Access Denied',
                    text: "Incorrect email and/or password"
                })
            })
    }

    useEffect(() => {
        return () => {
            dispatch(clearFields());
        }
    }, [dispatch])

    return (
        <main
        className={classes.main}
        >
            <img 
            src={Logo} 
            alt="logo"
            className={classes.logo} 
            />
            <Typography 
            variant="h1"
            sx={(theme) => ({
                fontSize: theme.typography.pxToRem(32),
                margin: `0 0 ${theme.typography.pxToRem(16)}`,
                fontWeight: 600,
                [theme.breakpoints.up('md')]: {
                    fontSize: theme.typography.pxToRem(56),
                }
            })}
            >
                Login
            </Typography>
            <form 
            action="/admin/login"
            method="POST"
            className={classes.form}
            onSubmit={handleSubmit}
            >
                <TextField 
                label="Email"
                name="email"
                onChange={handleOnChange}
                value={email}
                error={emailError}
                sx={(theme) => ({
                    marginBottom: theme.typography.pxToRem(16),
                    width: '90%',
                    maxWidth: `400px`
                })}
                />
                <TextField 
                label="Password"
                name="password"
                type="password"
                onChange={handleOnChange}
                value={password}
                error={passwordError}
                sx={(theme) => ({
                    marginBottom: theme.typography.pxToRem(16),
                    width: '90%',
                    maxWidth: `400px`
                })}
                />
                <Button
                variant='contained'
                type='submit'
                sx={(theme) => ({
                    width: '90%',
                    maxWidth: `400px`
                })}
                >
                    Login
                </Button>
            </form>
            <NavLink
            to='/'
            className={classes.link}
            >
                <ArrowBack />
                <Typography
                sx={(theme) => ({
                    marginLeft: theme.typography.pxToRem(4)
                })}
                >
                    Back to Store
                </Typography>
            </NavLink>
        </main>
    );
}
 
export default AdminLogin;