import { Menu, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, Popover, Theme, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import Layout from "../../components/Layout";
import { AppDispatch } from "../../utils/interfaces";
import { selectAnchor, selectDrawerOpen, setAnchor, toggleDrawerState } from "./appContentSlice";

const drawerWidth = 250;
const drawerWidthMed = 350;

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
    },
    menuFlex: {
        display: "flex",
        alignItems: "center",
    },
    popover: {
        display: "flex",
        flexDirection: 'column',
        width: `${theme.typography.pxToRem(150)}`,
        height: `${theme.typography.pxToRem(75)}`
    }
}), {index: 1});

const AppContent = () => {

    const classes = useStyles();

    const dispatch = useDispatch<AppDispatch>();

    const drawerState = useSelector(selectDrawerOpen);

    const anchor = useSelector(selectAnchor);

    const open = Boolean(anchor);

    const toggleDrawer = () => {
        dispatch(toggleDrawerState());
    }

    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setAnchor(e.currentTarget));
    }

    const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
        dispatch(setAnchor(null));
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
                                >
                                    About Me
                                </NavLink>
                                <NavLink
                                to="/products"
                                >
                                    Products
                                </NavLink>
                                <NavLink
                                to="/articles"
                                >
                                    
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
                        </div>
                        
                    </div>
                    <IconButton
                    role="button"
                    aria-label="cart"
                    
                    onClick={toggleDrawer}
                    >
                        <ShoppingCartOutlined 
                        sx={(theme) => ({
                            color: "#000",
                            fontSize: "3rem"
                        })}
                        />
                    </IconButton>
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
            onClose={toggleDrawer}
            classes={{
                paper: classes.drawerPaper
            }}
            >
                
            </Drawer>
        </>
    );
}

export default AppContent;