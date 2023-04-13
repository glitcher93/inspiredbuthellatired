import { AppBar, IconButton, Link, Popover, Theme, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { MouseEvent, lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../utils/interfaces";
import { selectAnchor, selectAnchorEl, setAnchor } from "./adminContentSlice";
import Logo from '../../assets/logo/logo-1.webp';
import AdminLayout from "../../components/AdminLayout";
import { logout } from "../AdminLogin/adminLoginSlice";

const Dashboard = lazy(() => import('../../components/Dashboard'));
const AdminOrders = lazy(() => import("../../pages/AdminOrders"));
const AdminProducts = lazy(() => import("../../pages/AdminProducts"));

const useStyles = makeStyles((theme: Theme) => ({
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
    }
}), {index: 1});

const AdminContent = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const anchor = useSelector(selectAnchorEl);

    const open = useSelector(selectAnchor);

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setAnchor({anchor: true, anchorEl: e.currentTarget}));
    }

    const handleClose = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.stopPropagation();
        dispatch(setAnchor({anchor: false, anchorEl: null}));
    }

    const handleLogout = () => {
        dispatch(logout());
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
                                to="/admin/products"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                onClick={handleClose}
                                >
                                    <Typography>
                                        Products
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/admin/orders"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                onClick={handleClose}
                                >
                                    <Typography>
                                        Orders
                                    </Typography>
                                </NavLink>
                            </Popover>
                            <NavLink
                            to='/admin'
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
                                to="/admin/products"
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
                                <NavLink
                                to="/admin/orders"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography
                                    sx={(theme) => ({
                                        [theme.breakpoints.up('md')]: {
                                            fontSize: theme.typography.pxToRem(24)
                                        }
                                    })}
                                    >
                                        Orders
                                    </Typography>
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                    <div>
                        <NavLink
                        to='/login'
                        className={classes.link}
                        onClick={handleLogout}
                        >
                            <Typography
                            sx={(theme) => ({
                                fontSize: theme.typography.pxToRem(18),
                                [theme.breakpoints.up('md')]: {
                                    fontSize: theme.typography.pxToRem(24)
                                }
                            })}
                            >
                                Logout
                            </Typography>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
            <AdminLayout>
                <Routes>
                    <Route index element={
                        <Suspense>
                            <Dashboard />
                        </Suspense>
                    } 
                    />
                    <Route path="products" element={
                        <Suspense>
                            <AdminProducts />
                        </Suspense>
                    } 
                    />
                    <Route path="orders" element={
                        <Suspense>
                            <AdminOrders />
                        </Suspense>
                    } 
                    />
                </Routes>
            </AdminLayout>
        </>
    );
}

export default AdminContent;