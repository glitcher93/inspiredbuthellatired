import { Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Drawer, IconButton, Popover, Theme, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { MouseEvent, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import { AppDispatch } from "../../utils/interfaces";
import { selectAnchor, selectAnchorEl, selectDrawerOpen, setAnchor, toggleDrawerOpen } from "./appContentSlice";
import Logo from "../../assets/logo/logo-1.webp";
import Cart from "../Cart";
import { selectCart } from "../Cart/cartSlice";

const drawerWidth = "100%";
const drawerWidthMed = "66%";
const drawerWidthLg = "50%";

const Landing = lazy(() => import("../../pages/Landing"));
const AboutMe = lazy(() => import("../../pages/AboutMe"));
const Products = lazy(() => import("../../pages/Products"));
const All = lazy(() => import("../../components/All"));
const Paintings = lazy(() => import("../../components/Paintings"));
const Prints = lazy(() => import("../../components/Prints"));
const Success = lazy(() => import("../../pages/Success"));

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: drawerWidthMed
        }
    },
    drawerPaper: {
        width: drawerWidth,
        overflowY: "scroll",
        '&::-webkit-scrollbar': {
            width: theme.typography.pxToRem(10),
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: theme.typography.pxToRem(4),
            margin: `${theme.typography.pxToRem(8)} 0`,
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: "#BBB",
            borderRadius: theme.typography.pxToRem(4),
        },
        [theme.breakpoints.up('md')]: {
            width: drawerWidthMed
        },
        [theme.breakpoints.up('lg')]: {
            width: drawerWidthLg
        }
    },
    responsiveGutter: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        width: "100%",
        [theme.breakpoints.up('md')]: {
            padding: "1rem 2.25rem"
        },
        [theme.breakpoints.up('lg')]: {
            padding: "1rem 0",
            margin: "0 auto",
            maxWidth: "85%",
        }
    },
    menuFlex: {
        display: "flex",
        alignItems: "center",
    },
    popover: {
        display: "flex",
        flexDirection: 'column',
        padding: "1rem 3rem 0.5rem 0.5rem",
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
    },
    link: {
        textDecoration: "none",
        color: "#000",
        transition: "color 0.3s ease-in-out",
        '&:hover': {
            color: "#0000FF"
        },
        [theme.breakpoints.up('md')]: {
            '&:first-of-type': {
                marginLeft: 0
            },
            marginLeft: "1.5rem",
        }
    },
    activeLink: {
        color: "#0000FF"
    },
    nav: {
        display: "flex",
        marginLeft: "1.5rem",
        [theme.breakpoints.down('md')]: {
            display: "none"
        }
    },
    logo: {
        width: `${theme.typography.pxToRem(50)}`,
        borderRadius: "50%",
    },
    cartFlex: {
        display: "flex",
        alignItems: "center",
    },
    loading: {
        fontFamily: 'Abel',
        fontWeight: 600
    }
}), {index: 1});

const AppContent = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const drawerState = useSelector(selectDrawerOpen);

    const anchor = useSelector(selectAnchorEl);

    const open = useSelector(selectAnchor);

    const cart = useSelector(selectCart);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity!, 0);

    const openDrawer = () => {
        dispatch(toggleDrawerOpen(true));
    }

    const closeDrawer = () => {
        dispatch(toggleDrawerOpen(false));
    }

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setAnchor({anchor: true, anchorEl: e.currentTarget}));
    }

    const handleClose = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.stopPropagation();
        dispatch(setAnchor({anchor: false, anchorEl: null}));
    }

    return ( 
        <>
            <AppBar
            elevation={0}
            color="transparent"
            position="static"
            sx={(theme) => ({
            })}
            >
                <Toolbar
                disableGutters
                className={classes.responsiveGutter}
                >
                    <div>
                        <div
                        className={classes.menuFlex}
                        >
                            <IconButton
                            sx={(theme) => ({
                                [theme.breakpoints.up('md')]: {
                                    display: "none"
                                }
                            })}
                            role="button"
                            onClick={handleOpen}
                            >
                                <Menu 
                                sx={(theme) => ({
                                    color: "#000",
                                    fontSize: "3rem"
                                })}
                                />
                            </IconButton>
                            <Popover
                            open={open}
                            anchorEl={anchor}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 16,
                            }}
                            classes={{
                                paper: classes.popover
                            }}
                            >
                                <NavLink
                                to="/about-me"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                onClick={handleClose}
                                >
                                    <Typography>
                                        About Me
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/products"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                onClick={handleClose}
                                >
                                    <Typography>
                                        Products
                                    </Typography>
                                </NavLink>
                            </Popover>
                            <NavLink
                            to='/'
                            >
                                <img 
                                src={Logo} 
                                alt="Inspiredbuthellatired"
                                className={classes.logo} 
                                />
                            </NavLink>
                            <nav
                            className={classes.nav}
                            >
                                <NavLink
                                to="/about-me"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography
                                    sx={(theme) => ({
                                        [theme.breakpoints.up('md')]: {
                                            fontSize: theme.typography.pxToRem(24)
                                        }
                                    })}
                                    >
                                        About Me
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/products"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography
                                    sx={(theme) => ({
                                        [theme.breakpoints.up('md')]: {
                                            fontSize: theme.typography.pxToRem(24)
                                        }
                                    })}
                                    >
                                        Products
                                    </Typography>
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                    <div
                    className={classes.cartFlex}
                    >
                        {cart.length > 0 && (
                            <Avatar
                            sx={(theme) => ({
                                backgroundColor: "#0000FF"
                            })}
                            >
                                {cartCount}
                            </Avatar>
                        )}
                        <IconButton
                        role="button"
                        aria-label="cart"
                        onClick={openDrawer}
                        >
                            <ShoppingCartOutlined 
                            sx={(theme) => ({
                                color: "#000",
                                fontSize: "3rem"
                            })}
                            />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Layout>
                <Routes>
                    <Route 
                    path='/*' 
                    element={
                        <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                            <Landing />
                        </Suspense>
                    } 
                    />
                    <Route 
                    path='about-me' 
                    element={
                    <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                        <AboutMe />
                    </Suspense>
                    } 
                    />
                    <Route 
                    path='products' 
                    element={
                        <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                            <Products />
                        </Suspense>
                    } 
                    >
                        <Route index element={
                            <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                                <All />
                            </Suspense>
                        } 
                        
                        />
                        <Route 
                        path='all' 
                        element={
                            <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                                <All />
                            </Suspense>
                        } 
                        
                        />
                        <Route 
                        path='paintings' 
                        element={
                            <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                                <Paintings />
                            </Suspense>
                        } 
                        />
                        <Route 
                        path='prints' 
                        element={
                            <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                                <Prints />
                            </Suspense>
                        } 
                        />
                    </Route>
                    <Route path='success' element={
                        <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
                            <Success />
                        </Suspense>
                    }
                    />
                </Routes>
            </Layout>
            <Drawer
            variant="temporary"
            anchor="right"
            open={drawerState}
            onClose={closeDrawer}
            classes={{
                paper: classes.drawerPaper
            }}
            >
                <Cart />
            </Drawer>
        </>
    );
}

export default AppContent;