import { Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, Popover, Theme, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import { AppDispatch } from "../../utils/interfaces";
import { selectAnchor, selectAnchorEl, selectDrawerOpen, setAnchor, toggleDrawerOpen } from "./appContentSlice";

const drawerWidth = "75%";
const drawerWidthMed = "50%";

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: drawerWidthMed
        }
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: drawerWidthMed
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
            marginLeft: "1.5rem"
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
    }
}), {index: 1});

const AppContent = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const drawerState = useSelector(selectDrawerOpen);

    const anchor = useSelector(selectAnchorEl);

    const open = useSelector(selectAnchor);

    const openDrawer = () => {
        dispatch(toggleDrawerOpen(true));
    }

    const closeDrawer = () => {
        dispatch(toggleDrawerOpen(false));
    }

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setAnchor({anchor: true, anchorEl: e.currentTarget}));
    }

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
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
                                >
                                    <Typography>
                                        About Me
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/products"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography>
                                        Products
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/articles"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography>
                                        Articles
                                    </Typography>
                                </NavLink>
                            </Popover>
                            <Typography 
                            variant="h3"
                            component="a"
                            href="/"
                            aria-label="Inspiredbuthellatired"
                            sx={theme => ({
                                color: "#000",
                                textDecoration: "none"
                            })}
                            >
                                IBHT
                            </Typography>
                            <nav
                            className={classes.nav}
                            >
                                <NavLink
                                to="/about-me"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography>
                                        About Me
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/products"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography>
                                        Products
                                    </Typography>
                                </NavLink>
                                <NavLink
                                to="/articles"
                                className={({ isActive }) => isActive ? clsx(classes.activeLink, classes.link) : classes.link}
                                >
                                    <Typography>
                                        Articles
                                    </Typography>
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                    <div>
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
                    <Route path='/*' element/>
                    <Route path='about-me' element/>
                    <Route path='prints' element/>
                    <Route path='paintings' element/>
                    <Route path='articles' element/>
                    <Route path='cart' element/>
                    <Route path='order-summary' element/>
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
                
            </Drawer>
        </>
    );
}

export default AppContent;